import Cake from '@/assets/cake.png';
import { Button } from './ui/button';

export default function View() {
  return (
    <div className="w-full h-[70vh] flex p-2 justify-between gap-[4rem] px-[4rem]">
      <div className="w-[100%] flex flex-col justify-center items-center">
        <img className="w-[90%]" src={Cake} alt="cake" />
        <div className="flex w-full justify-center h-[6rem] gap-4">
          <img className="w-[7rem]" src={Cake} alt="cake" />
          <img className="w-[7rem]" src={Cake} alt="cake" />
          <img className="w-[7rem]" src={Cake} alt="cake" />
          <img className="w-[7rem]" src={Cake} alt="cake" />
        </div>
      </div>

      <div className="text-start flex flex-col item-start justify-center w-[100%] p-2">
        <span>CAKE NI BAI</span>
        <h1 className="font-bold text-4xl mb-4">Cake Cake</h1>
        <p className="mb-4 break-words">
          Life is too short to sweat the small stuff and pass up on the simple
          joys. So, why not savor the sweet moments? Delight in a delectable
          piece of cake, where every bite is a celebration of life's little
          pleasures.
        </p>

        <span className="flex items-center gap-5 mb-4">
          <h1 className="font-bold text-3xl">$125.00</h1>
          <p className="p-1 rounded-sm bg-[#3b0d0a] text-white">50%</p>
        </span>

        <div className="flex h-[2.8rem] gap-8">
          <div
            className="w-[50%] f-full rounded-md font-bold bg-gray-100
           flex justify-between items-center px-4"
          >
            <span className="font-bold text-2xl">-</span>
            <span>0</span>
            <span className="font-bold text-2xl">+</span>
          </div>
          <Button className="w-[50%] h-full bg-[#3b0d0a]">
            Add to Order cart
          </Button>
        </div>
      </div>
    </div>
  );
}
