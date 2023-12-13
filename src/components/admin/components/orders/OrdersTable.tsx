import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Cake from '@/assets/cake.png';

import { Link } from 'react-router-dom';

type Product = {
  cart_id: number;
  product_names: string;
  product_price: number;
  total_quantity: number;
  payment_type: string;
  product_image: string;
  status: string;
  product_id: number;
  order_id: number;
  total_amount: number;
  user_id: number;
  status_id: number;
  proof_image: string;
};

export default function OrdersTable({ status }: { status: string }) {
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);
  const [showImageForm, setShowImageForm] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const getPaidOrders = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/orders-admin.php`)
      .then((res) => {
        console.log(res.data, 'paid');
        setPaidOrders(res.data);
      });
  };

  useEffect(() => {
    getPaidOrders();
  }, []);

  const showProofDelivery = (image: string) => {
    setShowImageForm(true);
    setImage(image);
  };

  return (
    <div className="w-full relative h-screen">
      <Table >
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Order ID</TableHead>
              <TableHead className="text-center">User ID</TableHead>
              <TableHead className="text-center">Ordered Products</TableHead>
              <TableHead className="text-center">Total Amount</TableHead>
              <TableHead className="text-center">Proof Delivery</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paidOrders
              .filter((prod) => prod.status.includes(status) || status === 'All')
              .map((prod, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{prod.order_id}</TableCell>
                    <TableCell>{prod.user_id}</TableCell>
                    <TableCell className="font-bold cursor-pointer">
                      <Link to={`/admin/orders/${prod.order_id}`}>
                        {' '}
                        {prod.product_names}
                      </Link>
                    </TableCell>
                    <TableCell>₱{prod.total_amount}</TableCell>
                    <TableCell>
                      {!prod.proof_image ? (
                        <div>n/a</div>
                      ) : (
                        <a
                          onClick={() => showProofDelivery(prod.proof_image)}
                          className="underline text-blue-500 cursor-pointer"
                        >
                          {' '}
                          view proof
                        </a>
                      )}
                    </TableCell>

                    <TableCell>
                      <div
                        className={`p-2 ${
                          prod.status === 'Delivered'
                            ? 'bg-[#5d383a] text-white'
                            : prod.status === 'On Delivery'
                            ? 'bg-green-700 text-white'
                            : prod.status === 'Cancelled'
                            ? 'bg-red-500 text-white'
                            : 'bg-yellow-500 text-black'
                        }  font-bold rounded-md`}
                      >
                        {prod.status}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>

        
        </Table>

        {showImageForm && (
            <div
              onClick={() => setShowImageForm(false)}
              className="absolute w-full h-full top-0 z-50 bg-white bg-opacity-80 flex justify-center "
            >
              <div className="bg-white w-[80%] h-[80%] rounded-md border-2">
                <img  
                  className="w-full h-full object-cover rounded-lg mb-4 border-2"
                  src={image! ? image! : ''}
                />
                {image! ? (
                  ''
                ) : (
                  <h1 className="font-bold text-7xl">NO PROOF OF DELIVERY</h1>
                )}

                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setShowImageForm(false)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  
  );
}
