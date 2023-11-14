import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/user.php`, user)
      .then((res) => {
        console.log(res.data);

        if (res.data.status === 'success') {
          navigate('/login');
        }
      });
  };

  return (
    <div className="w-full h-screen border-2 flex justify-center items-center flex-col text-center">
      <div className="w-[30%] flex flex-col justify-center items-center p-4">
        {/* <img src={Logo} alt="logo" className="w-[20rem]" /> */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-full"
        >
          <Input
            placeholder="Name"
            name="name"
            className="mb-2"
            onChange={handleChange}
          />

          <Input
            placeholder="Address"
            name="address"
            className="mb-2"
            onChange={handleChange}
          />

          <Input
            placeholder="Email"
            name="email"
            className="mb-2"
            onChange={handleChange}
          />
          <Input type="password" placeholder="Password" className="mb-2" />
          <Input
            type="password"
            placeholder="Re-enter password"
            name="password"
            className="mb-2"
            onChange={handleChange}
          />

          <div className="flex justify-start mb-4">
            <div className="flex">
              <Input
                type="radio"
                name="gender"
                value="male"
                className="w-[2rem] h-[1.2rem] cursor-pointer"
                onChange={handleChange}
              />
              <Label className="text-start mr-2 text-sm">Male</Label>
            </div>
            <div className="flex">
              <Input
                type="radio"
                name="gender"
                value="female"
                className="w-[2rem] h-[1.2rem] cursor-pointer"
                onChange={handleChange}
              />
              <Label className="text-start mr-2 text-sm">Female</Label>
            </div>
          </div>

          <Button className="w-[80%] self-center mt-[3rem]" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
