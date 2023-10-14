import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DefaultProfile from '@/assets/default.jpg';

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
  const type = localStorage.getItem('type');

  const handleLogout = () => {
    localStorage.removeItem('ordering-token');
    localStorage.removeItem('type');
    window.location.reload();
  };

  const [cart, setCart] = useState<Cart[]>([]);

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
        {type === 'admin' && <Link to="/admin">Admin</Link>}

        <Popover>
          <PopoverTrigger onClick={handleFetchCart}>
            <AiOutlineShoppingCart className="w-8 h-[1.5rem] mr-2" />
          </PopoverTrigger>
          <PopoverContent className="w-[20rem] min-h-[20rem] mt-[1.5rem] mr-[15rem] p-4 self-end flex flex-col justify-center items-center">
            <Cart cart={cart} />
          </PopoverContent>
        </Popover>
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
              <Link className="cursor-pointer" to="/profile">
                Profile
              </Link>
              <Link className="cursor-pointer" to="/orders">
                Orders
              </Link>

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
