import axios from 'axios';
import { useEffect, useState } from 'react';
import OrdersTable from '../components/orders/OrdersTable';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Order = {
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

export default function Orders() {
  const [status, setStatus] = useState('');

  const handleStatus = (event: string) => {
    const selectedValue = event;

    console.log(selectedValue);
    setStatus(selectedValue);
    // console.log(order_id.ordersid, 'orderid');

    // axios
    //   .put('http://localhost/ordering/status.php', {
    //     status: selectedValue,
    //     order_id: order_id.ordersid,
    //   })
    //   .then((res) => {
    //     console.log(res.data, 'status');
    //     getOrders();
    //   });
  };

  return (
    <div className=" p-4">
      <div className="flex justify-between w-full mb-[4rem]">
        <Button>Orders</Button>
        <h1 className="font-bold text-2xl self-end">Manage Product</h1>
      </div>
      <Select onValueChange={(e) => handleStatus(e)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>
      <OrdersTable status={status} />
    </div>
  );
}
