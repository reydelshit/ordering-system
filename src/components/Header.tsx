import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DefaultProfile from '@/assets/cake.png';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Cart from './components/Cart';

type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};
export default function Header() {
  const session = localStorage.getItem('ordering-token');
  const [cart, setCart] = useState<Cart[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('ordering-token');
    window.location.reload();
  };

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
    <header className="flex h-[5rem] justify-between items-center border-b-2">
      <div className="flex gap-8 items-center">
        <Link to="/">
          <h1 className="font-bold text-4xl">DRIP</h1>
        </Link>

        <div className="flex gap-10">
          <Link to="/shop">Shop 🔥</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="flex items-center z-40">
        <Cart
          cart={cart}
          handleFetchCart={handleFetchCart}
          handleDeleteCartProduct={handleDeleteCartProduct}
        />
        {session ? (
          <Popover>
            <PopoverTrigger>
              {' '}
              <img
                className="w-[3rem] h-[3rem] rounded-full cursor-pointer"
                src={DefaultProfile}
                alt="default profile"
              />
            </PopoverTrigger>
            <PopoverContent className="w-[6rem] border-2 self-end flex flex-col justify-center items-center">
              <span className="cursor-pointer">Profile</span>
              <span className="cursor-pointer">Orders</span>
              <span onClick={handleLogout} className="cursor-pointer">
                Logout
              </span>
            </PopoverContent>
          </Popover>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
