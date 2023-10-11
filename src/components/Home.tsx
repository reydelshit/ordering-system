import Cake from '@/assets/cake.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full flex items-center h-[90vh] p-4">
      <div className="text-start w-[60%]">
        <h1 className="font-semibold text-6xl mb-5">
          Life is short, eat the cake! 🍰
        </h1>
        <p>
          Life is too short to sweat the small stuff and pass up on the simple
          joys. So, why not savor the sweet moments? Delight in a delectable
          piece of cake, where every bite is a celebration of life's little
          pleasures.{' '}
        </p>
        <Link to="/shop">
          <Button
            variant="outline"
            className="w-[10rem] h-[3rem] mt-5 bg-[#3B0D0A] text-white"
          >
            Order now
          </Button>
        </Link>
      </div>

      <div className="w-[100%]">
        <img className="w-full" src={Cake} alt="cake" />
      </div>
    </div>
  );
}
