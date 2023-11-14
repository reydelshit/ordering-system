import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultProfile from '@/assets/default.jpg';
import { Link } from 'react-router-dom';

export default function ProfileIcon() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);

  const getProfilePicture = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/user.php`, {
        params: { user_id: localStorage.getItem('ordering-token') },
      })
      .then((res) => {
        setImage(res.data[0].profile_picture);
      });
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ordering-token');
    localStorage.removeItem('type');
    // window.location.reload();
    navigate('/login');
  };

  return (
    <Popover>
      <PopoverTrigger>
        {' '}
        <img
          className="w-[3rem] h-[3rem] rounded-full cursor-pointer object-cover"
          src={image ? image : DefaultProfile}
          alt="default profile"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[6rem] border-2 self-end flex flex-col justify-center items-center">
        <Link className="cursor-pointer" to="/profile">
          Profile
        </Link>

        <span onClick={handleLogout} className="cursor-pointer">
          Logout
        </span>
      </PopoverContent>
    </Popover>
  );
}
