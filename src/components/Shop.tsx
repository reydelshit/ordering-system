import Logo from '@/assets/cake.png';
import { Button } from './ui/button';

export default function Shop() {
  return (
    <div className="w-full p-4 grid grid-cols-4">
      <div className="border-2 w-[15rem] p-2 rounded-md overflow-hidden">
        <img src={Logo} alt="cake" />
        <div>
          <h1 className="font-bold text-3xl cursor-pointer">Cake cake</h1>
          <p>$99</p>
        </div>
        <Button
          variant="outline"
          className="w-[8rem] h-[2.5rem] mt-5 bg-[#3B0D0A] text-white"
        >
          Add order{' '}
        </Button>
      </div>

      <div className="border-2 w-[15rem] p-2 rounded-md overflow-hidden">
        <img src={Logo} alt="cake" />
        <div>
          <h1 className="font-bold text-3xl cursor-pointer">Cake cake</h1>
          <p>$99</p>
        </div>
        <Button
          variant="outline"
          className="w-[8rem] h-[2.5rem] mt-5 bg-[#3B0D0A] text-white"
        >
          Add order{' '}
        </Button>
      </div>
    </div>
  );
}
