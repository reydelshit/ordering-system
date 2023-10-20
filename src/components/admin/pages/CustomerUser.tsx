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
  const getCustomersDetails = () => {
    axios.get('http://localhost/ordering/customers.php').then((response) => {
      console.log(response.data);
      setCustomers(response.data);
    });
  };

  useEffect(() => {
    getCustomersDetails();
  }, []);

  return (
    <div>
      <h1>Customer Users</h1>

      <div className="w-full mt-[4rem]">
        <Table className="w-[80%] mx-auto border-2">
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
