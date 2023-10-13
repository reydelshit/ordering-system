import Cake from '@/assets/cake.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Trav from '@/assets/trav.png';
import Travis from '@/assets/travis.png';
export default function Home() {
  return (
    <div className="w-full flex items-center h-[90vh] p-4">
      <div className="text-start w-[60%]">
        <h1 className="font-semibold text-6xl mb-5 uppercase">
          Highest in the Room 🔥🔥
        </h1>
        <p>Fashion is an art, but individuality is the key. </p>
        <Link to="/shop">
          <Button
            variant="outline"
            className="w-[10rem] h-[3rem] mt-5 bg-[#3D633C] text-white"
          >
            Order now
          </Button>
        </Link>
      </div>

      <div className="w-[75rem]">
        <img className="w-full h-full" src={Trav} alt="cake" />
      </div>
    </div>
  );
}
