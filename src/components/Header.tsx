import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Jordans from '@/assets/jordans.png';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import axios from 'axios';
import { useState } from 'react';
import { Button } from './ui/button';
import Cart from './components/Cart';
import Notification from './Notification';
import { IoMdNotificationsOutline } from 'react-icons/io';
import ProfileIcon from './components/header/ProfileIcon';
import { FiMessageSquare } from 'react-icons/fi';
import Cake from '@/assets/cake.png';
import Message from './Message';
type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};
export default function Header() {
  const [cart, setCart] = useState<Cart[]>([]);

  const session = localStorage.getItem('ordering-token');
  const type = localStorage.getItem('type');

  const handleFetchCart = () => {
    const token = localStorage.getItem('ordering-token');

    console.log(token);
    if (token === null) {
      return;
    }

    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php`, {
        params: { user_id: token },
      })
      .then((res) => {
        setCart(res.data as Cart[]);

        // console.log(res.data)
        console.log(res.data, 'cart');
      });
  };

  return (
    <header className="flex h-[5rem] justify-between items-center border-b-2">
      <div className="flex gap-8 items-center">
        <Link to="/">
          <img className="w-[4rem]" src={Cake} />
        </Link>

        <div className="flex gap-10">
          <Link to="/shop">Shop 🔥</Link>
          {/* <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link> */}
        </div>
      </div>

      <div className="flex items-center z-40 gap-1">
        {type === 'admin' && (
          <Link to="/admin">
            <Button className="bg-[#5D383A]">Admin</Button>
          </Link>
        )}

        {type === 'rider' && (
          <Link to="/rider">
            <Button className="bg-[#5D383A]">Rider</Button>
          </Link>
        )}

        <Popover>
          <PopoverTrigger onClick={handleFetchCart}>
            <AiOutlineShoppingCart className="w-8 h-[1.5rem] mr-2" />
          </PopoverTrigger>
          <PopoverContent className="w-[20rem] min-h-[20rem] mt-[1.5rem] mr-[15rem] p-4 self-end flex flex-col justify-center items-center">
            <Cart cart={cart} />
          </PopoverContent>
        </Popover>
        {session && (
          <Popover>
            <PopoverTrigger className="relative">
              <div className="absolute bottom-auto left-auto right-2 top-1.5 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-1 text-xs"></div>
              <IoMdNotificationsOutline className="w-8 h-[1.5rem]" />
            </PopoverTrigger>
            <PopoverContent className="w-[20rem] min-h-[20rem] mt-[1.5rem] mr-[15rem] p-4 self-end flex flex-col scroll-m-1">
              <Notification />
            </PopoverContent>
          </Popover>
        )}

        {session && (
          <Popover>
            <PopoverTrigger className="relative">
              <div className="absolute bottom-auto left-auto right-2 top-1.5 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-1 text-xs"></div>
              <FiMessageSquare className="w-7 h-[1.4rem]" />
            </PopoverTrigger>
            <PopoverContent className="w-[30rem] min-h-[20rem] mt-[1.5rem] mr-[15rem] p-4 self-end flex flex-col scroll-m-1">
              <Message />
            </PopoverContent>
          </Popover>
        )}

        {session ? <ProfileIcon /> : <Link to="/login">Login</Link>}
      </div>
    </header>
  );
}
