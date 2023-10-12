import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import ManageProduct from './pages/ManageProduct';
import Main from './pages/Main';

export default function AdminRoutes() {
  return (
    <div className="flex">
      <div className="border-r-2 pt-[5rem] w-[15rem] h-screen text-start p-4 flex flex-col items-start">
        <Link to="/admin">Main</Link>
        <Link to="/admin/manage-product">Manage Product</Link>
      </div>
      <div className="border-2 w-full justify-center">
        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="/manage-product" element={<ManageProduct />} />
        </Routes>
      </div>
    </div>
  );
}
