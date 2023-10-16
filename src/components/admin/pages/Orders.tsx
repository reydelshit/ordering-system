import axios from 'axios';
import { useEffect, useState } from 'react';
import OrdersTable from '../components/OrdersTable';

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
    <div className="mt-[5rem] p-4">
      <h1>Orders</h1>
      <OrdersTable />
    </div>
  );
}
