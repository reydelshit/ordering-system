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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
type Customer = {
  user_id: number;
  name: string;
  email: string;
  address: string;
  orders_count: number;
  feedback_count: number;
};

export default function CustomerUsers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();
  const getCustomersDetails = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/customers.php`)
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      });
  };

  useEffect(() => {
    getCustomersDetails();
  }, []);

  return (
    <div className="p-4 bg-slate-50 h-screen">
      <div className="flex justify-between w-full mb-[4rem]">
        <Button className="bg-[#5d383a]" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <h1 className="font-bold text-2xl self-end">Customers</h1>
      </div>

      <div className="w-full mt-[4rem]">
        <Table className="w-[80%] mx-auto border-2 bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">UserID</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Address</TableHead>
              <TableHead className="text-center">No. Orders</TableHead>
              <TableHead className="text-center">No. Feedbacks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.user_id}>
                <TableCell className="text-center">
                  {customer.user_id}
                </TableCell>
                <TableCell className="text-center">{customer.name}</TableCell>
                <TableCell className="text-center">{customer.email}</TableCell>
                <TableCell className="text-center">
                  {customer.address}
                </TableCell>
                <TableCell className="text-center">
                  {customer.orders_count}
                </TableCell>
                <TableCell className="text-center">
                  {customer.feedback_count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
