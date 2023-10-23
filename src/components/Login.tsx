import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Logo from '@/assets/logo.png';

export default function Login({
  handleLogin,
  handleChange,
}: {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col text-center">
      <div>
        <img src={Logo} alt="logo" className="w-[20rem]" />

        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center "
        >
          <Input
            type="email"
            placeholder="Email"
            className="mb-2"
            name="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-2"
            name="password"
            onChange={handleChange}
          />
          <Button className="w-[80%]" type="submit">
            Login
          </Button>
        </form>

        <span className="mt-5 block">
          Don't have an account?
          <Link to="/register" className="text-green-500 ml-2">
            click me
          </Link>
        </span>
      </div>
    </div>
  );
}
