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
};

export default function OrdersTable({ status }: { status: string }) {
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);

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

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Order ID</TableHead>
          <TableHead className="text-center">User ID</TableHead>
          <TableHead className="text-center">Ordered Products</TableHead>
          <TableHead className="text-center">Total Amount</TableHead>
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
                <TableCell>{prod.total_amount}</TableCell>
                <TableCell>
                  <div
                    className={`p-2 ${
                      prod.status === 'Delivered'
                        ? 'bg-purple-500 text-white'
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
  );
}
