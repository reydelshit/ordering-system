import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import ManageProduct from './pages/ManageProduct';
import Main from './pages/Main';
import Orders from './pages/Orders';
import ViewOrders from './pages/ViewOrders';
import Feedback from './pages/Feedbacks';
import UpdateProducts from './pages/UpdateProducts';
import { Toaster } from '@/components/ui/toaster';
import { BsCartCheck } from 'react-icons/bs';
import { AiOutlineDropbox } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import { RiAdminLine } from 'react-icons/ri';
export default function AdminRoutes() {
  return (
    <div className="flex">
      <div className="border-r-2 pt-[5rem] w-[15rem] h-screen text-start p-4 flex flex-col items-start">
        <span className="flex gap-2 p-1 w-full mb-2">
          <Link className="flex" to="/admin">
            <RiAdminLine className="w-[2rem] h-[1.5rem]" />
            Main
          </Link>
        </span>
        <span className="flex gap-2 p-1 w-full mb-2">
          <Link className="flex" to="/admin/orders">
            <AiOutlineDropbox className="w-[2rem] h-[1.5rem]" />
            Manage Product
          </Link>
        </span>

        <span className="flex gap-2 p-1 w-full mb-2">
          <Link className="flex" to="/admin/orders">
            <BsCartCheck className="w-[2rem] h-[1.5rem]" /> Orders
          </Link>
        </span>

        <span className="flex gap-2 p-1 w-full">
          <Link className="flex" to="/admin/feedbacks">
            <VscFeedback className="w-[2rem] h-[1.5rem]" /> Feedbacks
          </Link>
        </span>
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
