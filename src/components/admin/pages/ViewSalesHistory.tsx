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
  const [orderItems, setOrderItems] = useState<any[]>([]);

  const { id } = useParams();

  const getOrders = async () => {
    await axios
      .get('http://localhost/ordering/view-orders-admin.php', {
        params: { order_id: id },
      })
      .then((res) => {
        console.log(res.data, 'ndjkabjkda');
        setOrderItems(res.data);
      });
  };

  const getOrderDetails = async () => {
    await axios
      .get('http://localhost/ordering/order-details.php', {
        params: { order_id: id },
      })
      .then((res) => {
        console.log(res.data, 'order details');
        setOrderDetails(res.data);
      });
  };

  useEffect(() => {
    getOrders();
    getOrderDetails();
  }, []);

  return (
    <div className="p-4">
      {' '}
      <div className="flex justify-between w-full mb-[4rem]">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <h1 className="font-bold text-2xl self-end">View Sales</h1>
      </div>
      <div className="flex justify-start items-start flex-col">
        Ordered Items
        {orderItems.map((item, index) => (
          <div key={index}>
            <h1>{item.product_name}</h1>
          </div>
        ))}
        {orderDetails
          .map((item, index) => {
            return <div key={index}>{item.name}</div>;
          })
          .slice(0, 1)}
      </div>
    </div>
  );
}
