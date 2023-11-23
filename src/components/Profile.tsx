import axios from 'axios';
import DefaultProfile from '@/assets/default.jpg';

import { Label } from '@/components/ui/label';

import { useContext, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import Cart from './components/Cart';
import ProfileOrdersTable from './components/ProfileOrderTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Cards from './components/profile/Cards';
import { MdAttachMoney } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import { BsCartPlus } from 'react-icons/bs';
import SendMessage from './SendMessage';

import { MainContext } from './hooks/useShowMessage';

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
  profile_description: string;
};

type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  quantity: number;
  product_image: string;
  status: string;
  product_id: number;
  order_id: number;
  created_at: string;
};

type FeedbackProduct = {
  product_id: number;
  product_name: string;
  total_feedback: number;
  feedback_id: number;
};

export default function Profile() {
  const [user, setUser] = useState<User[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [paidOrders, setPaidOrders] = useState<Cart[]>([]);
  const [status, setStatus] = useState('');
  const [feedbackProduct, setFeedbackProduct] = useState<FeedbackProduct[]>([]);

  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/user.php`, {
        params: { user_id: localStorage.getItem('ordering-token') },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  };

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
        setCart(res.data);
        console.log(res.data, 'cart');
      });
  };

  const getPaidOrders = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/orders.php`, {
        params: { user_id: localStorage.getItem('ordering-token') },
      })
      .then((res) => {
        console.log(res.data, 'paid');
        setPaidOrders(res.data);
      });
  };

  const getFeedback = async () => {
    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/feedback.php`, {
        params: { user_id: localStorage.getItem('ordering-token') },
      })
      .then((res) => {
        console.log(res.data, 'feedback');
        setFeedbackProduct(res.data);
      });
  };

  useEffect(() => {
    getUserData();
    handleFetchCart();
    getPaidOrders();
    getFeedback();
  }, []);

  const handleStatus = (event: string) => {
    const selectedValue = event;

    console.log(selectedValue);
    setStatus(selectedValue);
  };

  return (
    <div className="w-full p-4 relative h-screen">
      {user.map((user, index) => (
        <div className="flex w-full gap-4" key={index}>
          <img
            className="w-[25rem] rounded-lg h-[25rem] object-cover"
            src={user.profile_picture ? user.profile_picture : DefaultProfile}
            alt={user.name}
          />
          <div className="w-[80%] border-2 flex flex-col justify-between items-start relative rounded-lg">
            <div className="text-start p-4">
              <div className="absolute right-2 top-2">
                <Link to={`/profile/edit/${user.user_id}`}>
                  <Button className="bg-[#5d383a]">Edit profile</Button>
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
              <Label className="mt-[1rem] block">Email</Label>
              <p className="font-bold">{user.email}</p>
              <Label className="mt-[1rem] block">Bio</Label>
              <p>{user.profile_description}</p>

              <div className="mt-4">
                <Label>Address</Label>
                <span className="block">{user.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 my-4 gap-4 w-full px-4">
              <Cards
                title="Total Spends"
                value={`₱${paidOrders
                  .filter((prod) => prod.status.includes('Delivered'))
                  .reduce((acc, product) => {
                    return acc + product.product_price * product.quantity;
                  }, 0)}`}
                description="Only delivered are counted."
                Icon={<MdAttachMoney className="text-4xl text-[#5d383a]" />}
              />

              <Cards
                title="Total orders"
                value={`${paidOrders.length}`}
                description="Orders including the cancelled ones."
                Icon={<BsCartPlus className="text-4xl text-[#5d383a]" />}
              />

              <Cards
                title="Feedbacks Submissions"
                value={`${feedbackProduct.length}`}
                description="Total Feedbacks Submissions"
                Icon={<VscFeedback className="text-4xl text-[#5d383a]" />}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex mt-[4rem] gap-4">
        <div className="border-2 w-[25rem] rounded-lg p-2">
          <h1 className="text-start font-bold text-2xl">Cart</h1>
          <Cart cart={cart} />
          {/* <Messages /> */}
        </div>
        <div className="w-[75rem] border-2 rounded-md">
          <div className="w-full justify-end flex p-2">
            <Select onValueChange={(e) => handleStatus(e)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="On Delivery">On Delivery</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProfileOrdersTable status={status} paidOrders={paidOrders} />
        </div>
      </div>
    </div>
  );
}
