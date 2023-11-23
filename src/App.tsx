import { useEffect, useState } from 'react';
import Main from './components/Main';

import { Toaster } from '@/components/ui/toaster';
import Message from './components/Message';
import { MainContext } from './components/hooks/useShowMessage';

function App() {
  const [isLogged, setIsLoggedIn] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [recepientIDNumber, setRecepientIDNumber] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('ordering-token') !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <MainContext.Provider
        value={{
          recepientIDNumber,
          setRecepientIDNumber,
          showMessage,
          setShowMessage,
        }}
      >
        <Main />
        <Toaster />
      </MainContext.Provider>
    </>
  );
}

export default App;
