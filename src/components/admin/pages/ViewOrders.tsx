import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export default function ViewOrders() {
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);
  const order_id = useParams();

  const getOrders = async () => {
    await axios
      .get('http://localhost/ordering/view-orders-admin.php', {
        params: { order_id: order_id.ordersid },
      })
      .then((res) => {
        console.log(res.data);
        setPaidOrders(res.data);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="mt-[5rem]">
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

            <TableHead className="text-center w-[5rem]"></TableHead>
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
                <TableCell>
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
                </TableCell>

                {/* <TableCell>{totalPrice}</TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
