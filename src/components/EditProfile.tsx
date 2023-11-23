import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DefaultProfile from '@/assets/default.jpg';

type User = {
  user_id: number;
  name: string;
  address: string;
  email: string;
  password: string;
  gender: string;
  type: string;
  profile_picture: string;
  created_at: string;
};

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { set } from 'date-fns';
import { Textarea } from './ui/textarea';

export default function EditProfile() {
  const user_id = useLocation().pathname.split('/')[3];
  const navigate = useNavigate();
  const [user, setUser] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');

  const [image, setImage] = useState<string | null>(null);

  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/user.php`, {
        params: { user_id: user_id },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);

        setName(res.data[0].name);
        setAddress(res.data[0].address);
        setEmail(res.data[0].email);
        setGender(res.data[0].gender);
        setImage(res.data[0].profile_picture);
        setDescription(res.data[0].profile_description);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/user.php`, {
        name: name,
        address: address,
        email: email,
        gender,
        profile_description: description,
        profile_picture: image,
        user_id: user_id,
      })
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          navigate('/profile');
          window.location.reload();
        }
      });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader();
    data.readAsDataURL(e.target.files![0]);

    data.onloadend = () => {
      const base64 = data.result;
      if (base64) {
        setImage(base64.toString());
      }
    };
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center flex-col text-center">
        <div className="mb-2 w-[28%] flex flex-col justify-center items-center">
          <img
            className="w-[15rem] h-[15rem] object-cover rounded-full mb-4"
            src={image! ? image! : DefaultProfile}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            className="cursor-pointer"
          />
        </div>

        <div className="w-[30%] flex flex-col justify-center items-center p-4">
          <form
            onSubmit={handleEditProfile}
            className="flex flex-col justify-center w-full"
          >
            <Label className="text-start mr-2 text-sm">Name</Label>
            <Input
              name="name"
              className="mb-2"
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />

            <Label className="text-start mr-2 text-sm">Address</Label>
            <Input
              name="address"
              className="mb-2"
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={address}
            />

            <Label className="text-start mr-2 text-sm">Email</Label>

            <Input
              name="email"
              className="mb-2"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />

            <Label className="text-start mr-2 text-sm">Bio (desc)</Label>

            <Textarea
              name="description"
              className="mb-2 h-[10rem]"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
            ></Textarea>

            <div className="flex justify-start mb-4">
              <div className="flex">
                <Input
                  type="radio"
                  name="gender"
                  value="male"
                  className="w-[2rem] h-[1.2rem] cursor-pointer"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'male'}
                />
                <Label className="text-start mr-2 text-sm">Male</Label>
              </div>
              <div className="flex">
                <Input
                  type="radio"
                  name="gender"
                  value="female"
                  className="w-[2rem] h-[1.2rem] cursor-pointer"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'female'}
                />
                <Label className="text-start mr-2 text-sm">Female</Label>
              </div>
            </div>

            <Button
              className="w-[80%] self-center mt-[3rem] bg-[#5d383a]"
              type="submit"
            >
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
