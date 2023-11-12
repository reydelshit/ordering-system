import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  created_at: string;
};

type ProductAll = {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  product_image: string;
};

export default function SalesHistory() {
  const navigate = useNavigate();
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);

  const [product, setProduct] = useState<ProductAll[]>([]);

  const [status, setStatus] = useState('');

  const handleStatus = (event: string) => {
    const selectedValue = event;

    console.log(selectedValue);
    setStatus(selectedValue);
  };

  const getPaidOrders = () => {
    axios.get('http://localhost/ordering/orders-admin.php').then((res) => {
      console.log(res.data, 'paid');
      setPaidOrders(res.data);
    });
  };

  const getProduct = () => {
    axios.get('http://localhost/ordering/product.php/').then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };

  useEffect(() => {
    getProduct();
    getPaidOrders();
  }, []);

  return (
    <div className="p-4">
      {' '}
      <div className="flex justify-between w-full mb-[4rem]">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <h1 className="font-bold text-2xl self-end">Sales History</h1>
      </div>
      <div className="flex justify-between py-2">
        <Select onValueChange={(e) => handleStatus(e)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            {product.map((prod, index) => {
              return (
                <SelectItem key={index} value={prod.product_name}>
                  {prod.product_name}
                </SelectItem>
              );
            })}
            {/* <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="On Delivery">On Delivery</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem> */}
          </SelectContent>
        </Select>

        <span className="font-semibold">Only shows delivered orders</span>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Order ID</TableHead>
            {/* <TableHead className="text-center">User ID</TableHead> */}
            <TableHead className="text-center">Product</TableHead>
            <TableHead className="text-center">Total Amount</TableHead>
            <TableHead className="text-center">Payment type</TableHead>
            <TableHead className="text-center">Date</TableHead>
            {/* <TableHead className="text-center">Status</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paidOrders
            .filter(
              (prod) =>
                (prod.status === 'Delivered' &&
                  prod.product_names.includes(status)) ||
                status === 'All',
            )
            .map((prod, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{prod.order_id}</TableCell>
                  {/* <TableCell>{prod.user_id}</TableCell> */}
                  <TableCell className="font-bold cursor-pointer">
                    <Link to={`/admin/sales-history/${prod.order_id}`}>
                      {' '}
                      {prod.product_names}
                    </Link>
                  </TableCell>
                  <TableCell>{prod.total_amount}</TableCell>
                  <TableCell>{prod.payment_type}</TableCell>
                  <TableCell>{moment(prod.created_at).format('LL')}</TableCell>

                  {/* <TableCell>
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
                  </TableCell> */}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
