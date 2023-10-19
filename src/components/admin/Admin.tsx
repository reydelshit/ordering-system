import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import ManageProduct from './pages/ManageProduct';
import Main from './pages/Main';
import Orders from './pages/Orders';
import ViewOrders from './pages/ViewOrders';
import Feedback from './pages/Feedbacks';
import UpdateProducts from './pages/UpdateProducts';
import { Toaster } from '@/components/ui/toaster';

export default function AdminRoutes() {
  return (
    <div className="flex">
      <div className="border-r-2 pt-[5rem] w-[15rem] h-screen text-start p-4 flex flex-col items-start">
        <Link to="/admin">Main</Link>
        <Link to="/admin/manage-product">Manage Product</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/feedbacks">Feedbacks</Link>
      </div>
      <div className="w-full justify-center">
        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="/manage-product" element={<ManageProduct />} />
          <Route
            path="/manage-product/update/:id"
            element={<UpdateProducts />}
          />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:ordersid" element={<ViewOrders />} />
          <Route path="/feedbacks" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
}
