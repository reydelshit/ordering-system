import Header from './components/Header';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import Shop from './components/Shop';
import View from './components/View';

function App() {
  return (
    <>
      <Header />

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/bastaID" element={<View />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
