import Header from '@/components/Header';
import Home from '@/components/Home';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Shop from '@/components/Shop';
import View from '@/components/View';
import AdminRoutes from '@/components/admin/Admin';
import Login from './Login';
import { useContext, useState } from 'react';
import ProtectedRoute from './admin/Protected';
import axios from 'axios';

import Profile from './Profile';

import Register from './Register';
import Checkout from './Checkout';
import OrderConfirmation from './Confirmation';
import EditProfile from './EditProfile';
import ProtectedRouteRider from './rider/ProtectedRider';
import Rider from './rider/Rider';
import RiderRoutes from './rider/RiderRoute';
import SendMessage from './SendMessage';
import { MainContext } from './hooks/useShowMessage';

export default function Main() {
  const navigation = useNavigate();
  const [loginDetails, setLoginDetails] = useState([]);

  const { showMessage } = useContext(MainContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setLoginDetails((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/login.php`, {
        params: loginDetails,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('success');
          console.log(res.data);
          localStorage.setItem('ordering-token', res.data[0].user_id);
          localStorage.setItem('type', res.data[0].user_type);

          const isAdmin = res.data[0].user_type === 'admin' ? true : false;
          const isRider = res.data[0].user_type === 'rider' ? true : false;
          // console.log(res.data[0].user_type);

          if (isAdmin) {
            navigation('/admin');
            window.location.reload();
          } else if (isRider) {
            navigation('/rider');
            window.location.reload();
          } else {
            navigation('/shop');
            window.location.reload();
          }

          console.log(localStorage.getItem('type'), 'type');
        }
      });
  };

  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login handleChange={handleChange} handleLogin={handleLogin} />
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />

          <Route path="/shop/checkout" element={<Checkout />} />
          <Route
            path="/shop/checkout/order-confirmation"
            element={<OrderConfirmation />}
          />

          <Route path={'/shop/:id' && '/shop/:id/*'} element={<View />} />
          {/* <Route path="/shop/:id/*" element={<View />} /> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rider/*"
            element={
              <ProtectedRouteRider>
                <RiderRoutes />
              </ProtectedRouteRider>
            }
          />
        </Routes>
        {showMessage && <SendMessage />}
      </div>
    </>
  );
}
