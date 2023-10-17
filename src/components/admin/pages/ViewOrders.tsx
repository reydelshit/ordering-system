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

export default function ViewOrders() {
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const order_id = useParams();
  const navigate = useNavigate();

  const getOrders = async () => {
    await axios
      .get('http://localhost/ordering/view-orders-admin.php', {
        params: { order_id: order_id.ordersid },
      })
      .then((res) => {
        console.log(res.data);
        getUserDetails(res.data[0].user_id);
        setPaidOrders(res.data);
      });
  };

  const getUserDetails = async (user_id: number) => {
    axios
      .get('http://localhost/ordering/user.php', {
        params: { user_id: user_id },
      })
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="flex flex-col p-4">
      <Button className="self-start" onClick={() => navigate(-1)}>
        Go Back
      </Button>

      <div className="flex flex-col items-start mt-[2rem]">
        <h1 className="font-bold mb-[2rem]">Customer Details:</h1>

        <div className="w-full">
          {userDetails.map((user, index) => {
            return (
              <div className="flex w-full gap-4" key={index}>
                <img
                  className="w-[20rem] rounded-lg h-[20rem] object-cover"
                  src={user.profile_picture}
                  alt={user.name}
                />
                <div className="w-[80%] border-2 flex flex-col justify-between items-start relative rounded-lg">
                  <div className="text-start p-4">
                    <span className="flex items-center gap-4">
                      <h1 className="font-bold text-3xl">
                        {user.name.slice(0, 1).toLocaleUpperCase() +
                          user.name.slice(1)}
                      </h1>
                      <p>{user.created_at}</p>
                    </span>

                    <p>
                      {user.gender.slice(0, 1).toLocaleUpperCase() +
                        user.gender.slice(1)}
                    </p>
                    <Label className="mt-[1rem] block">Email</Label>
                    <p className="font-bold">{user.email}</p>
                    <Label className="mt-[1rem] block">Bio</Label>
                    <p>{user.profile_description}</p>

                    <div className="mt-4">
                      <Label>Address</Label>
                      <span className="block">{user.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h1 className="font-bold self-start mt-[2rem]">Products Ordered:</h1>
      <Table className="w-full">
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow className="border-b-2 border-black">
            <TableHead></TableHead>
            <TableHead className="text-center">Product</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Order ID</TableHead>

            {/* <TableHead className="text-center w-[5rem]"></TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody className="border-y-2 border-black">
          {paidOrders.map((prod, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <img
                    className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                    src={prod.product_image}
                    alt={prod.product_name}
                  />
                </TableCell>
                <TableCell>{prod.product_name}</TableCell>
                <TableCell>${prod.product_price}</TableCell>
                <TableCell>{prod.quantity}</TableCell>
                <TableCell>${prod.product_price * prod.quantity}</TableCell>

                <TableCell>{prod.status}</TableCell>
                <TableCell>
                  {prod.order_id === prod.order_id ? prod.order_id : 'ngek'}
                </TableCell>
                {/* <TableCell>
                  <Link
                    to={`/shop/${prod.product_id}?orderid=${prod.order_id}`}
                  >
                    {' '}
                    <Button
                      disabled={prod.status == 'Delivered' ? false : true}
                      className="bg-green-700 cursor-pointer text-xs"
                    >
                      Send feedback
                    </Button>
                  </Link>
                </TableCell> */}

                {/* <TableCell>{totalPrice}</TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
