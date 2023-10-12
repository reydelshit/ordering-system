import Header from './components/Header';
import Home from './components/Home';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Shop from './components/Shop';
import View from './components/View';
import Admin from './components/admin/Admin';
import AdminRoutes from './components/admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/bastaID" element={<View />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
