import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';

type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};

export default function Checkout() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState('' as string);

  const handleFetchCart = () => {
    const token = localStorage.getItem('ordering-token');

    console.log(token);
    if (token === null) {
      return;
    }

    axios
      .get('http://localhost/ordering/cart.php', { params: { user_id: token } })
      .then((res) => {
        setCart(res.data);
        console.log(res.data, 'cart');
      });
  };

  useEffect(() => {
    handleFetchCart();
  }, []);

  const handleDeleteCartProduct = (cart_id: number) => {
    console.log(cart_id);
    axios
      .delete(`http://localhost/ordering/cart.php/${cart_id}`)
      .then((res) => {
        console.log(res);
      });
  };

  const handlePaymentType = (event: string) => {
    const selectedValue = event;
    setSelectedPaymentType(selectedValue);
    // console.log(selectedValue);
  };
  return (
    <div className="w-full border-2 flex justify-between">
      <div className="w-[50%] flex-col p-4">
        <div className="flex gap-4 justify-center mt-[4rem] items-center">
          <div className="w-[15rem]">
            <Select onValueChange={handlePaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cod">Cash On Delivery (COD)</SelectItem>
                <SelectItem value="card">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedPaymentType === 'cod' ? (
          <div className="mt-[5rem] border-2 w-full p-4 rounded-lg">
            <h1 className="mb-2 font-bold text-2xl">CASH ON DELIVERY</h1>
            <div className="p-4">
              <Label className="text-start block mb-2">
                Contact Information
              </Label>
              <Input className="mb-2" placeholder="Name"></Input>

              <Input className="mb-2" placeholder="Email"></Input>

              <Input className="mb-2" placeholder="Phone number"></Input>
            </div>

            <div className="p-4 mt-[2rem]">
              <Label className="text-start block mb-2">Delivery Address</Label>
              <Input className="mb-2" placeholder="Address"></Input>
            </div>
            <Link to="/shop/checkout/order-confirmation">
              <Button>Pay $3214123</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-[5rem] border-2 w-full">
            <h1>card</h1>
          </div>
        )}
      </div>

      <div className="w-[30rem]">
        {cart.map((cart, index) => (
          <div
            className="flex h-[6rem] items-center justify-between w-full border-b-2 p-2 mb-2"
            key={index}
          >
            <div className="flex gap-2">
              <img
                className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                src={cart.product_image}
                alt={cart.product_name}
              />
              <div>
                <h1 className="font-bold">{cart.product_name}</h1>
                <p>Qty: {cart.qty}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between h-full items-center">
              <span
                onClick={() => handleDeleteCartProduct(cart.cart_id)}
                className="cursor-pointer"
              >
                delete
              </span>
              <span className="block font-bold">
                ${cart.product_price * cart.qty}
              </span>
            </div>
          </div>
        ))}
        <div className="w-full flex justify-between p-4 font-bold">
          <h1>Total</h1>
          <span>
            $
            {cart.reduce(
              (total, prod) => total + prod.product_price * prod.qty,
              0,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
