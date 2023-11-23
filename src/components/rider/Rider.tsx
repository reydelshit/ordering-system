import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Cake from '@/assets/cake.png';
import axios from 'axios';

type AssignedOrders = {
  order_id: number;
  rider_id: number;
  date: string;
  assigned_id: number;
  delivery_address: string;
  customer_name: string;
  phone: string;
  payment_type: string;
  products: string;
  status: string;
};
export default function Rider() {
  const [showImageForm, setShowImageForm] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const [assignedOrders, setAssignedOrders] = useState<AssignedOrders[]>([]);
  const [storeOrderID, setStoreOrderID] = useState<number>(0);

  const riderId = localStorage.getItem('ordering-token');

  const getAssignedOrders = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/assigned-order.php`, {
        params: {
          rider_id: riderId,
        },
      })
      .then((res) => {
        console.log(res.data, 'assigned orders');
        setAssignedOrders(res.data);
      });
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader();
    data.readAsDataURL(e.target.files![0]);

    data.onloadend = () => {
      const base64 = data.result;
      if (base64) {
        setImage(base64.toString());

        // console.log(base64.toString());
      }
    };
  };

  const handleOpenForm = (order_id: number) => {
    setShowImageForm(true);
    setStoreOrderID(order_id);
  };

  const handleProofSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/proof.php`, {
        proof_image: image,
        order_id: storeOrderID,
        rider_id: riderId,
      })
      .then((res) => {
        console.log(res.data, 'status');
        setShowImageForm(false);
      });

    axios
      .put(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/rider.php`, {
        order_id: storeOrderID,
        status: 'Delivered',
      })
      .then((res) => {
        console.log(res.data);
      });

    getAssignedOrders();
  };

  useEffect(() => {
    getAssignedOrders();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl">Assigned Orders</h1>
      <div className="w-[80%] border-2 my-[2rem]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Order ID</TableHead>
              <TableHead className="text-center">Recepient</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead className="text-center">Delivery Address</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Payment type</TableHead>

              <TableHead className="text-center">
                Upload Proof of Delivery
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignedOrders.map((order, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.products}</TableCell>
                  <TableCell>{order.delivery_address}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.payment_type}</TableCell>

                  <TableCell>
                    <Button
                      disabled={order.status === 'Delivered'}
                      onClick={() => handleOpenForm(order.order_id)}
                      className="mr-2 bg-[#5d383a]"
                    >
                      Upload
                    </Button>
                    {/* <Button onClick={() => handleSetDelivered(order.order_id)}>
                      Set Delivered
                    </Button> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {showImageForm && (
        <div className="absolute w-full h-full top-0 z-50 bg-[#f2f2f0] bg-opacity-80 flex justify-center items-center">
          <div className="bg-white w-[35rem] h-fit p-4 rounded-md border-[#5d383a] border-2">
            <img
              className="w-[40rem]  h-[25rem] object-cover rounded-lg mb-4"
              src={image! ? image! : Cake}
            />
            <Label>Proof of Delivery</Label>
            <Input
              required
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              name="product_image"
            />

            <div className="flex justify-center mt-4">
              <Button
                onClick={() => setShowImageForm(false)}
                className="mr-2 bg-red-500 text-white"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button className="bg-[#5d383a]" onClick={handleProofSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
