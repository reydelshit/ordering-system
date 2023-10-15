import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '@/assets/default.jpg';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { URL } from 'url';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
export default function AddProductModal({
  setShowAddProduct,
}: {
  setShowAddProduct: (value: boolean) => void;
}) {
  const [user, setUser] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('' as string);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');

  const [image, setImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent) => {
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
        images_data: images,
        product_category: selectedCategory,
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

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const newImages = [...images];

    const promises = [];
    for (let i = 0; i < files!.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files![i]);

      promises.push(
        new Promise((resolve, reject) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };

          reader.onerror = (error) => {
            reject(error);
          };
        }),
      );
    }

    Promise.all(promises)
      .then((results) => {
        newImages.push(...(results as string[]));
        setImages(newImages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePaymentType = (event: string) => {
    const selectedValue = event;
    setSelectedCategory(selectedValue);
    // console.log(selectedValue);
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
          <Label className="mb-2 text-start">Primary image</Label>

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

          <Textarea
            onChange={handleChange}
            name="product_description"
            placeholder="description"
            className="mb-2"
          ></Textarea>

          <Input
            type="number"
            placeholder="quantity"
            name="quantity"
            className="mb-2"
            onChange={handleChange}
            // defaultValue={name}
          />

          <Input
            type="text"
            placeholder="tags (seperated by spaces)"
            name="tags"
            className="mb-2"
            onChange={handleChange}
            // defaultValue={name}
          />

          <Select onValueChange={handlePaymentType}>
            <SelectTrigger>
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tshirt">T-shirt</SelectItem>
              <SelectItem value="pants">Pants</SelectItem>
              <SelectItem value="hoodie">Hoodie</SelectItem>
            </SelectContent>
          </Select>

          <div className="my-5 w-full flex flex-col justify-center items-center">
            <Label className="mb-2 text-start">Upload multiple images</Label>

            <div className="border-2 w-full flex mb-2 p-2 gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  className="w-[5rem] h-[5rem] object-cover rounded-full mb-4"
                />
              ))}
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleImages}
              className="cursor-pointer"
            />
          </div>

          <Button className="w-[80%] self-center" type="submit">
            Save and Update
          </Button>
        </form>
      </div>
    </div>
  );
}
