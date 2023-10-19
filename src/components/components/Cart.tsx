import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};

export default function Cart({ cart }: { cart: Cart[] }) {
  // useEffect(() => {
  //   handleFetchCart();
  // }, []);

  const handleDeleteCartProduct = (cart_id: number) => {
    console.log(cart_id);
    axios
      .delete(`http://localhost/ordering/cart.php/${cart_id}`)
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="w-full">
      {cart.length > 0 ? (
        cart.map((cart, index) => (
          <div
            className="flex h-[6rem] items-center justify-between border-b-2 mb-2"
            key={index}
          >
            <div className="flex gap-2 w-full">
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
        ))
      ) : (
        <div className="flex justify-center items-center h-[9rem]">
          <h1 className="font-bold text-1xl">Cart is empty</h1>
        </div>
      )}

      <div>
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

        <div>
          <Link to="/shop/checkout">
            <Button className="w-full h-[3rem] text-white font-bold">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
