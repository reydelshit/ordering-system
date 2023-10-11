import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="flex h-[5rem] justify-between items-center border-b-2">
      <div className="flex gap-8 items-center">
        <Link to="/">
          <h1 className="font-bold text-4xl">Cake</h1>
        </Link>

        <div className="flex gap-10">
          <Link to="/about">About 🍰</Link>
          <Link to="/contact">Contact 🍰</Link>
        </div>
      </div>

      <div className="flex">
        <AiOutlineShoppingCart className="w-8 h-[1.5rem] mr-2" />
        <span>profile</span>
      </div>
    </header>
  );
}
