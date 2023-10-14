import axios from 'axios';
import DefaultProfile from '@/assets/default.jpg';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import Cart from './components/Cart';

type User = {
  user_id: number;
  name: string;
  address: string;
  email: string;
  password: string;
  gender: string;
  type: string;
  profile_picture: string;
  created_at: string;
};

type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};
export default function Profile() {
  const [user, setUser] = useState<User[]>([]);

  const getAllUser = () => {
    axios
      .get('http://localhost/ordering/user.php', {
        params: { user_id: localStorage.getItem('ordering-token') },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
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

  useEffect(() => {
    getAllUser();
    handleFetchCart();
  }, []);

  return (
    <div className="w-full border-2 p-4">
      {user.map((user, index) => (
        <div className="flex w-full gap-4" key={index}>
          <img
            className="border-2 w-[20rem] rounded-lg"
            src={user.profile_picture ? user.profile_picture : DefaultProfile}
            alt={user.name}
          />
          <div className="w-[80%] border-2 flex flex-col justify-between items-start relative">
            <div className="text-start p-4">
              <div className="absolute right-2 top-2">
                <Link to={`/profile/edit/${user.user_id}`}>
                  <Button>Edit profile</Button>
                </Link>
              </div>
              <span className="flex items-center gap-4">
                <h1 className="font-bold text-3xl">
                  {user.name.slice(0, 1).toLocaleUpperCase() +
                    user.name.slice(1)}
                </h1>
                <p>{user.created_at}</p>
              </span>

              <p>
                {user.gender.slice(0, 1).toLocaleUpperCase() +
                  user.gender.slice(1)}
              </p>

              <p className="my-4 font-bold">{user.email}</p>

              <div className="mt-4">
                <Label>Address</Label>
                <span className="block">{user.address}</span>
              </div>
            </div>

            <div className="border-2 w-full flex h-[8rem] justify-around items-center">
              <div>
                <h1 className="font-bold">Total orders</h1>
                <span className="font-bold text-3xl">99</span>
              </div>
              <div>
                <h1 className="font-bold">Total Spends</h1>
                <span className="font-bold text-3xl">99</span>
              </div>
              <div>
                <h1 className="font-bold">Feedback Submission</h1>
                <span className="font-bold text-3xl">99</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex mt-[4rem]">
        <div className="border-2 w-[25rem] rounded-lg p-2">
          <h1 className="text-start font-bold text-2xl">Cart</h1>
          <Cart cart={cart} />
        </div>
        <div className="w-[75rem]">orders</div>
      </div>
    </div>
  );
}
