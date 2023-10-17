import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { parse } from 'path';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Product = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  quantity: number;
  product_image: string;
  status: string;
  product_id: number;
  order_id: number;
  status_id: number;
};

type User = {
  user_id: number;
  name: string;
  address: string;
  email: string;
  password: string;
  gender: string;
  type: string;
  profile_picture: string;
  created_at: string;
  profile_description: string;
};

type OrderDetails = {
  delivery_address: string;
  email: string;
  name: string;
  phone: string;
  payment_type: string;
};

export default function ViewOrders() {
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const [orderID, setOrderId] = useState<number>(0);
  const [orderStatusID, setOrderStatusID] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const order_id = useParams();
  const navigate = useNavigate();

  const getOrders = async () => {
    await axios
      .get('http://localhost/ordering/view-orders-admin.php', {
        params: { order_id: order_id.ordersid },
      })
      .then((res) => {
        console.log(res.data, 'ndjkabjkda');

        getUserDetails(res.data[0].user_id);
        getOrderDetails(res.data[0].order_id);
        setOrderId(res.data[0].order_id);
        setOrderStatusID(res.data[0].status_id);
        setStatus(res.data[0].status);
        setPaidOrders(res.data);
      });
  };

  const getUserDetails = async (user_id: number) => {
    await axios
      .get('http://localhost/ordering/user.php', {
        params: { user_id: user_id },
      })
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
      });
  };

  const getOrderDetails = async (order_id: number) => {
    await axios
      .get('http://localhost/ordering/order-details.php', {
        params: { order_id: order_id },
      })
      .then((res) => {
        console.log(res.data);
        setOrderDetails(res.data);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleStatus = (event: string, status_id: number) => {
    const selectedValue = event;

    console.log(selectedValue);
    console.log(status_id);

    axios
      .put('http://localhost/ordering/status.php', {
        status: selectedValue,
        status_id: status_id,
      })
      .then((res) => {
        console.log(res.data, 'status');
        getOrders();
      });
  };

  return (
    <div className="flex flex-col p-4 justify-center ">
      <div className="flex justify-between">
        <Button className="self-start" onClick={() => navigate(-1)}>
          Go Back
        </Button>

        <h1 className="font-bold text-2xl">Order Details</h1>
      </div>

      <div className="h-[5rem] border-2 mt-[2rem] rounded-md flex justify-between items-center">
        <div>
          <h1>Time Ordered</h1>
          <p> Order ID: {orderID}</p>
        </div>

        <div className="flex gap-2 items-center">
          <h1>{status}</h1>
          <Select onValueChange={(e) => handleStatus(e, orderStatusID)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Set status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <div className="flex w-full justify-between mt-[2rem] items-start h-[8rem]">
          {orderDetails.map((order, index) => {
            return (
              <div
                className="flex flex-col items-start border-2 w-[20rem] h-full justify-center p-2 rounded-md"
                key={index}
              >
                <h1 className="font-bold">Customer</h1>
                <p className="font-bold">
                  Name:{' '}
                  <span className="font-semibold text-gray-400">
                    {order.name}
                  </span>
                </p>
                <p className="font-bold">
                  Email:{' '}
                  <span className="font-semibold text-gray-400">
                    {order.email}
                  </span>
                </p>
                <p className="font-bold">
                  Phone:{' '}
                  <span className="font-semibold text-gray-400">
                    {order.phone}
                  </span>
                </p>
              </div>
            );
          })}
          {orderDetails.map((order, index) => {
            return (
              <div
                className="flex flex-col items-start border-2 w-[20rem] h-full justify-center p-2 rounded-md"
                key={index}
              >
                <h1 className="font-bold">Order Info</h1>
                <p className="font-bold">
                  Order type:{' '}
                  <span className="font-semibold text-gray-400">
                    {order.payment_type}
                  </span>
                </p>
              </div>
            );
          })}

          {orderDetails.map((order, index) => {
            return (
              <div
                className="flex flex-col items-start border-2 w-[20rem] h-full justify-center p-2 rounded-md"
                key={index}
              >
                <h1 className="font-bold">Customer</h1>
                <p className="font-bold">
                  Address:{' '}
                  <span className="font-semibold text-gray-400">
                    {order.delivery_address}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-[2rem] flex flex-col">
          <Textarea className="h-[8rem]" placeholder="Notes:"></Textarea>
          <Button className="mt-[1rem] self-end bg-green-700">Save</Button>
        </div>
      </div>

      <Table className="w-full mt-[5rem]">
        <TableHeader>
          <TableRow className="border-b-2 border-black">
            <TableHead></TableHead>

            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="border-y-2 border-black">
          {paidOrders.map((prod, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-4">
                  <img
                    className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                    src={prod.product_image}
                    alt={prod.product_name}
                  />
                  {prod.product_name}
                </TableCell>

                <TableCell>${prod.product_price}</TableCell>
                <TableCell>{prod.quantity}</TableCell>
                <TableCell>${prod.product_price * prod.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="self-end mr-[2rem] mt-[2rem] flex gap-2">
        <h1>Total: </h1>
        <p className="font-bold">
          {paidOrders.reduce(
            (total, prod) => total + prod.product_price * prod.quantity,
            0,
          )}
        </p>
      </div>
    </div>
  );
}
