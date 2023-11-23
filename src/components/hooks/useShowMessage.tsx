// show message component context

import { createContext } from 'react';

type MainContextType = {
  showMessage: boolean;
  setShowMessage: (value: boolean) => void;

  recepientIDNumber: number;
  setRecepientIDNumber: (value: number) => void;
};

export const MainContext = createContext<MainContextType>({
  showMessage: false,
  setShowMessage: () => {},
  recepientIDNumber: 0,
  setRecepientIDNumber: () => {},
});
