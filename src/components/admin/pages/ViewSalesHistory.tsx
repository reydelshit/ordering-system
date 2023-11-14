import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';

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
      .get(
        `${import.meta.env.VITE_ORDERING_LOCAL_HOST}/view-orders-admin.php`,
        {
          params: { order_id: id },
        },
      )
      .then((res) => {
        console.log(res.data, 'order items');
        setOrderItems(res.data);
      });
  };

  const getOrderDetails = async () => {
    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/order-details.php`, {
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
      <div className="flex justify-start items-start gap-4">
        <div className="w-full flex flex-col items-start p-2">
          <h1 className="font-bold text-2xl py-4">Ordered Items</h1>
          {orderItems.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <img
                className="w-[5rem] h-[4rem] object-cover rounded-md mb-2"
                src={item.product_image}
                alt="product"
              />
              <div className="text-start">
                <h1 className="font-bold">{item.product_name}</h1>
                <p>
                  {item.product_price} - {item.quantity} qty
                </p>
              </div>
            </div>
          ))}

          <h1 className="font-bold text-xl py-4">
            Total:{' '}
            {orderItems.reduce(
              (total, prod) => total + prod.product_price * prod.quantity,
              0,
            )}
          </h1>
        </div>
        <div className="flex flex-col items-start w-full">
          <h1 className="font-bold text-2xl py-4">Order Details</h1>
          {orderDetails
            .map((item, index) => {
              return (
                <div className="text-start text-lg" key={index}>
                  <div className="mb-2 ">
                    <Label className="text-start block">Name</Label>
                    <h1 className="font-bold">{item.name}</h1>
                  </div>

                  <div className="mb-2">
                    <Label className="text-start block">Phone</Label>
                    <h1 className="font-bold">{item.phone}</h1>
                  </div>

                  <div className="mb-2">
                    <Label className="text-start block">Email</Label>
                    <h1 className="font-bold">{item.email}</h1>
                  </div>

                  <div className="mb-2">
                    <Label className="text-start block">Payment Method</Label>
                    <h1 className="font-bold">{item.payment_type}</h1>
                  </div>

                  <div className="mb-2">
                    <Label className="text-start block">Delivery Address</Label>
                    <h1 className="font-bold">{item.delivery_address}</h1>
                  </div>
                </div>
              );
            })
            .slice(0, 1)}
        </div>
      </div>
    </div>
  );
}
