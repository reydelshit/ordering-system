import Header from '@/components/Header';
import Home from '@/components/Home';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Shop from '@/components/Shop';
import View from '@/components/View';
import AdminRoutes from '@/components/admin/Admin';
import Login from './Login';
import { useEffect, useState } from 'react';

export default function Main() {
  const [isLogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('ordering-token') !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<View />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </>
  );
}
