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
    <div className=" p-4 bg-slate-50">
      <div className="flex justify-between w-full mb-[4rem]">
        <Button className="bg-[#5d383a]" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <h1 className="font-bold text-2xl self-end">Manage Product</h1>
      </div>
      <Select onValueChange={(e) => handleStatus(e)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="On Delivery">On Delivery</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>
      <div className='bg-white p-2 rounded-md mt-[2rem]'>
        <OrdersTable status={status} />
      </div>
    </div>
  );
}
