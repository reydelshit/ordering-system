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
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const handleStatus = (event: string) => {
    const selectedValue = event;

    console.log(selectedValue);
    setStatus(selectedValue);
  };

  return (
    <div className=" p-4">
      <div className="flex justify-between w-full mb-[4rem]">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
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
