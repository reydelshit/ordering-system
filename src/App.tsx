import Header from './components/Header';
import Home from './components/Home';

import { Routes, Route } from 'react-router-dom';
import Shop from './components/Shop';

function App() {
  return (
    <>
      <Header />

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
