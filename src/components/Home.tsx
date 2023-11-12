import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Jordans from '@/assets/jordans.png';
import Cake from '@/assets/cake.png';
export default function Home() {
  return (
    <div className="w-full flex items-center h-[90vh] p-4">
      <div className="text-start w-[60%]">
        <h1 className="font-semibold text-6xl mb-5 uppercase text-[#5D383A]">
          CAKE CAKE CAKE 🔥
        </h1>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore saepe
          recusandae a laudantium quibusdam. Omnis nobis praesentium soluta
          dolorum nesciunt!
        </p>
        <Link to="/shop">
          <Button className="w-[15rem] h-[3rem] mt-5 text-white bg-[#5D383A]">
            Order now
          </Button>
        </Link>
      </div>

      <div className="w-[70rem]">
        <img className="w-[80%] h-[80%]" src={Cake} alt="cake" />
      </div>
    </div>
  );
}
