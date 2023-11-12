import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';

type OrderDetails = {
  delivery_address: string;
  email: string;
  name: string;
  phone: string;
  payment_type: string;
};

export default function ViewSalesHistory() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);

  const { id } = useParams();

  const getOrders = async () => {
    await axios
      .get('http://localhost/ordering/view-orders-admin.php', {
        params: { order_id: id },
      })
      .then((res) => {
        // console.log(res.data, 'ndjkabjkda');

        // console.log(res.data[0].user_id, 'user id');

        getOrderDetails(res.data[0].order_id);

        // setDataFetched(true);
      });
  };

  const getOrderDetails = async (order_id: number) => {
    await axios
      .get('http://localhost/ordering/order-details.php', {
        params: { order_id: order_id },
      })
      .then((res) => {
        console.log(res.data, 'order details');
        setOrderDetails([res.data[0]]);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-4">
      {' '}
      <div className="flex justify-between w-full mb-[4rem]">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <h1 className="font-bold text-2xl self-end">View Sales</h1>
      </div>
      hello
    </div>
  );
}
