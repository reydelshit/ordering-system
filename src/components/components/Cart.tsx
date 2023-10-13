import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from 'react-router-dom';

type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};

export default function Cart({
  cart,
  handleFetchCart,
  handleDeleteCartProduct,
}: {
  cart: Cart[];
  handleFetchCart: () => void;
  handleDeleteCartProduct: (cart_id: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger onClick={handleFetchCart}>
        <AiOutlineShoppingCart className="w-8 h-[1.5rem] mr-2" />
      </PopoverTrigger>
      <PopoverContent className="w-[20rem] min-h-[20rem] mt-[1.5rem] mr-[15rem] p-4 self-end flex flex-col justify-center items-center">
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

        <div>
          <Link to="/checkout">
            <Button className="w-full h-[3rem] bg-[#3d633c] text-white font-bold">
              Checkout
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
