import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '@/assets/default.jpg';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
// import { URL } from 'url';

export default function AddProductModal({
  setShowAddProduct,
}: {
  setShowAddProduct: (value: boolean) => void;
}) {
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');

  const [image, setImage] = useState<string | null>(null);

  const { id } = useParams();

  // const fetchUser = async () => {
  //   axios
  //     .get(`http://localhost/hd-monitoring/register.php/${id}`)
  //     .then((res) => {
  //       console.log(res.data, 'reyudel');
  //       setUser(res.data);
  //       setName(res.data.name);
  //       setEmail(res.data.email);
  //       setHeight(res.data.height);

  //       setImage(res.data.image);
  //     });
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(image);
    // console.log(user);

    axios
      .post('http://localhost/ordering/product.php', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...user,
        product_image: image,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'success') {
          window.location.reload();
          setShowAddProduct(false);
          // navigate('/');
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

        // console.log(base64.toString());
      }
    };
  };

  return (
    <div className="w-full h-fit flex justify-center items-center flex-col text-center">
      <div className="w-[40%]">
        <h1 className="text-2xl font-bold mb-2">Update Details</h1>
        <div className="mb-2 w-full flex flex-col justify-center items-center">
          <img
            className="w-[15rem] h-[15rem] object-cover rounded-full mb-4"
            src={image! ? image! : defaultProfile}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            className="cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <Input
            placeholder="name of the product (cake)"
            name="product_name"
            className="mb-2"
            onChange={handleChange}
            // defaultValue={name}
          />
          <Input
            type="number"
            placeholder="price"
            name="product_price"
            className="mb-2"
            onChange={handleChange}
            // defaultValue={name}
          />
          <Input
            type="number"
            placeholder="quantity"
            name="quantity"
            className="mb-2"
            onChange={handleChange}
            // defaultValue={name}
          />

          <Button className="w-[80%] self-center" type="submit">
            Save and Update
          </Button>
        </form>
      </div>
    </div>
  );
}
