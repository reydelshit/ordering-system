import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
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
import CardCompo from '../components/sales-history/Card';
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

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function SalesHistory() {
  const navigate = useNavigate();
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);

  const [product, setProduct] = useState<ProductAll[]>([]);

  const [productName, setProductName] = useState('All');
  const [todaySales, setTodaySales] = useState('');

  const handleProductChange = (event: string) => {
    const selectedValue = event;

    console.log(selectedValue);
    setProductName(selectedValue);

    const todaySalesFilter = paidOrders.filter(
      (prod) =>
        prod.status === 'Delivered' &&
        prod.product_names.includes(selectedValue),
    );

    setTodaySales(todaySalesFilter.length.toString());

    // console.log(todaySalesFilter, selectedValue, todaySalesFilter.length);
  };

  const getPaidOrders = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/orders-admin.php`)
      .then((res) => {
        console.log(res.data, 'paid');
        setPaidOrders(res.data);
      });
  };

  const getProduct = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/product.php`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
  };

  const currentWeek = moment().format('YYYY-WW');
  const currentDay = moment().format('YYYY-MM-DD');

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
        <Select onValueChange={(e) => handleProductChange(e)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
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
      <div>
        <h1 className="font-bold text-2xl my-2">{productName}</h1>
        <div className="flex gap-2 mb-2">
          <CardCompo
            title="Today Sales"
            description="The total number of sales for today."
            // icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
            icon="N/A"
            // value={totalVisits.length.toString()}
            value={`${
              paidOrders.length > 0
                ? paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        moment(paid.created_at).format('YYYY-MM-DD') ===
                          currentDay,
                    )
                    .length.toString()
                : paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        paid.product_names.includes(productName) &&
                        moment(paid.created_at).format('YYYY-MM-DD') ===
                          currentDay,
                    )
                    .length.toString()
            } - ${
              paidOrders.length > 0
                ? paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        moment(paid.created_at).format('YYYY-MM-DD') ===
                          moment().format('YYYY-MM-DD'),
                    )
                    .reduce((a, b) => a + b.total_amount, 0)
                    .toFixed(2)
                : paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        paid.product_names.includes(productName) &&
                        moment(paid.created_at).format('YYYY-MM-DD') ===
                          moment().format('YYYY-MM-DD'),
                    )
                    .reduce((a, b) => a + b.total_amount, 0)
                    .toFixed(2)
            }`}
          />

          <CardCompo
            title="Total Weekly Sales"
            description="The total number of sales this week."
            // icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
            icon="N/A"
            // value={totalVisits.length.toString()}
            value={`${
              productName === 'All'
                ? paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        moment(paid.created_at).format('YYYY-WW') ===
                          currentWeek,
                    )
                    .length.toString()
                : paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        paid.product_names.includes(productName) &&
                        moment(paid.created_at).format('YYYY-WW') ===
                          currentWeek,
                    )
                    .length.toString()
            } - ${
              productName === 'All'
                ? paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        moment(paid.created_at).format('YYYY-WW') ===
                          currentWeek,
                    )
                    .reduce((a, b) => a + b.total_amount, 0)
                    .toFixed(2)
                : paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        moment(paid.created_at).format('YYYY-WW') ===
                          currentWeek &&
                        paid.product_names.includes(productName),
                    )
                    .reduce((a, b) => a + b.total_amount, 0)
                    .toFixed(2)
            }`}
          />

          <CardCompo
            title="Paid Orders"
            description="The total number of paid orders ."
            // icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
            icon="N/A"
            // value={totalVisits.length.toString()}
            value={`${
              productName === 'All'
                ? paidOrders
                    .filter((paid) => paid.status === 'Delivered')
                    .length.toString()
                : paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        paid.product_names.includes(productName),
                    )
                    .length.toString()
            }  - ${
              productName === 'All'
                ? paidOrders
                    .filter((paid) => paid.status === 'Delivered')
                    .reduce((a, b) => a + b.total_amount, 0)
                    .toFixed(2)
                : paidOrders
                    .filter(
                      (paid) =>
                        paid.status === 'Delivered' &&
                        paid.product_names.includes(productName),
                    )
                    .reduce((a, b) => a + b.total_amount, 0)
                    .toFixed(2)
            }`}
          />
        </div>
        <div className="w-full flex gap-4 justify-between">
          <div className="md:w-[100%] md:p-5 bg-white rounded-lg border-2">
            <h1 className="mb-5 font-bold uppercase">Monthly Sales</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: string) => `${value}`}
                />
                <Bar dataKey="total" fill="#FACC15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
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
                  prod.product_names.includes(productName)) ||
                (prod.status === 'Delivered' && productName === 'All'),
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
