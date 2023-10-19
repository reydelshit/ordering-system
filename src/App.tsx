import { useEffect, useState } from 'react';
import Main from './components/Main';

import { Toaster } from '@/components/ui/toaster';

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
      <Main />
      <Toaster />
    </>
  );
}

export default App;
