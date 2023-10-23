import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Jordans from '@/assets/jordans.png';
export default function Home() {
  return (
    <div className="w-full flex items-center h-[90vh] p-4">
      <div className="text-start w-[60%]">
        <h1 className="font-semibold text-6xl mb-5 uppercase text-violet-600">
          Shoes That Spark Your Imagination 🔥
        </h1>
        <p className="text-xl">
          Step into a world of creativity and style with our unique and
          imaginative footwear. Explore our collection and let your shoes be the
          canvas for your fashion dreams.
        </p>
        <Link to="/shop">
          <Button className="w-[15rem] h-[3rem] mt-5 text-white">
            Order now
          </Button>
        </Link>
      </div>

      <div className="w-[70rem]">
        <img className="w-[80%] h-[80%]" src={Jordans} alt="cake" />
      </div>
    </div>
  );
}
