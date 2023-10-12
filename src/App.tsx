import { useEffect, useState } from 'react';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';

function App() {
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
      {/* {isLogged ? (
        <Main />
      ) : (
        <div> */}
      {/* <Header /> */}

      {/* <Routes> */}
      {/* <Route index element={<Home />} /> */}
      {/* <Route index element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )} */}
      <Main />
    </>
  );
}

export default App;
