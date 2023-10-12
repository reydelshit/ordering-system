import Logo from '@/assets/cake.png';
import { Button } from './ui/button';
import { useState } from 'react';

export default function Shop() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="w-full h-screen p-4 grid grid-cols-5 ">
      <div className="border-2 w-[15rem] h-fit p-4 rounded-xl overflow-hidden bg-[#3b0d0ace] text-white">
        <img src={Logo} alt="cake" />
        <div>
          <h1 className="font-bold text-3xl cursor-pointer text-white">
            Cake cake
          </h1>
          <p className="text-white">$99</p>
        </div>

        <div
          className="w-[100%] h-[2.5rem] f-full rounded-md font-bold bg-gray-100 
           flex justify-between items-center px-4 mt-[1rem]"
        >
          <span
            onClick={() => setQuantity(quantity - 1)}
            className="font-bold text-2xl cursor-pointer"
          >
            -
          </span>
          <span>{quantity < 0 ? 0 : quantity}</span>
          <span
            onClick={() => setQuantity(quantity + 1)}
            className="font-bold text-2xl cursor-pointer"
          >
            +
          </span>
        </div>
        <Button
          variant="outline"
          className="w-[9rem] h-[2.8rem] mt-5 bg-[#3B0D0A] text-white"
        >
          Add order{' '}
        </Button>
      </div>

      <div className="border-2 w-[15rem] h-fit p-4 rounded-xl overflow-hidden bg-[#3b0d0ace] text-white">
        <img src={Logo} alt="cake" />
        <div>
          <h1 className="font-bold text-3xl cursor-pointer text-white">
            Cake cake
          </h1>
          <p className="text-white">$99</p>
        </div>

        <div
          className="w-[100%] h-[2.5rem] f-full rounded-md font-bold bg-gray-100 
           flex justify-between items-center px-4 mt-[1rem]"
        >
          <span
            onClick={() => setQuantity(quantity - 1)}
            className="font-bold text-2xl cursor-pointer"
          >
            -
          </span>
          <span>{quantity < 0 ? 0 : quantity}</span>
          <span
            onClick={() => setQuantity(quantity + 1)}
            className="font-bold text-2xl cursor-pointer"
          >
            +
          </span>
        </div>
        <Button
          variant="outline"
          className="w-[9rem] h-[2.8rem] mt-5 bg-[#3B0D0A] text-white"
        >
          Add order{' '}
        </Button>
      </div>
    </div>
  );
}
