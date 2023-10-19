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
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

export default function OrdersTable() {
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);

  const getPaidOrders = () => {
    axios.get('http://localhost/ordering/orders-admin.php').then((res) => {
      console.log(res.data, 'paid');
      setPaidOrders(res.data);
    });
  };

  useEffect(() => {
    getPaidOrders();
  }, []);

  return (
    <Table className="w-full">
      <TableCaption>A list of your orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Order ID</TableHead>
          <TableHead className="text-center">User ID</TableHead>
          <TableHead className="text-center">Ordered Products</TableHead>
          {/* <TableHead className="text-center">Payment Type</TableHead> */}
          <TableHead className="text-center">Total Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {paidOrders.map((prod, index) => {
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
              {/* <TableCell>{prod.payment_type}</TableCell> */}
              <TableCell>{prod.total_amount}</TableCell>
              <TableCell>
                <div
                  className={`p-2 ${
                    prod.status === 'Delivered' ? 'bg-green-100' : 'bg-blue-100'
                  } text-green-700 font-bold rounded-md`}
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
