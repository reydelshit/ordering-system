import { Routes, Route, Link } from 'react-router-dom';
import Rider from './Rider';

export default function RiderRoutes() {
  return (
    <div className="flex">
      <div className="w-full justify-center">
        <Routes>
          <Route path="/" index element={<Rider />} />

          {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
      </div>
    </div>
  );
}
