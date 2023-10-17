import axios from 'axios';
import { useEffect, useState } from 'react';
import OrdersTable from '../components/OrdersTable';
import { Button } from '@/components/ui/button';

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
  return (
    <div className=" p-4">
      <div className="flex justify-between w-full mb-[4rem]">
        <Button>Orders</Button>
        <h1 className="font-bold text-2xl self-end">Manage Product</h1>
      </div>
      <OrdersTable />
    </div>
  );
}
