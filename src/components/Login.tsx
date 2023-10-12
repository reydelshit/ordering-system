import { Link, useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';

import { useState } from 'react';
import axios from 'axios';
import Logo from '@/assets/logo.png';

export default function Login({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (value: boolean) => void;
}) {
  const navigation = useNavigate();
  const [loginDetails, setLoginDetails] = useState([]);
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setLoginDetails((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get('http://localhost/ordering/login.php', {
        params: loginDetails,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('success');
          console.log(res.data);
          localStorage.setItem('ordering-token', res.data[0].user_id);
          //   setEmail(res.data[0].email);
          setIsLoggedIn(true);

          navigation('/shop');
        }
      });
  };

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
