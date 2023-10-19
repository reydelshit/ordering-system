import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '@/assets/default.jpg';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import moment from 'moment';

// import { URL } from 'url';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type Images = {
  product_id: number;
  images_data: string;
  image_id: number;
};

export default function UpdateProducts({}: {}) {
  const [user, setUser] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('' as string);
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');

  const [images, setImages] = useState<Images[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [storeProduct, setStoreProducts] = useState([]);

  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent) => {
    const value = e.target.value;
    const name = e.target.name;
    setStoreProducts((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const res = await axios.get(
      'http://localhost/ordering/product-update.php',
      {
        params: {
          product_id: id,
        },
      },
    );

    console.log(res.data);
    if (res.data.status === 'success') {
      setProductName(res.data.data.product_name);
      setPrice(res.data.data.product_price);
      setQuantity(res.data.data.quantity);
      setTags(res.data.data.tags);
      setDescription(res.data.data.product_description);
      setImage(res.data.data.product_image);
      setSelectedCategory(res.data.data.product_category);
      setImages(res.data.data.images_data);

      setStoreProducts(res.data.data);
      console.log(res.data.data.product_name);
    }
    // setStoreProducts(res.data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(image);
    // console.log(user);

    axios
      .put('http://localhost/ordering/product.php', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...storeProduct,
        product_id: id,
        product_image: image,
        images_data: newImages,
        product_category: selectedCategory,
      })
      .then((res) => {
        if (res.status === 200) {
          // window.location.reload();
          // navigate('/admin/manage-product');
          toast({
            title: 'Product: Updated Successfully',
            description: moment().format('LLLL'),
          });
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
    const newnewImages = [...newImages];

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
        // console.log('Results:', results);
        newnewImages.push(...(results as string[]));
        // console.log('New Images:', newImages);
        setNewImages(newnewImages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePaymentType = (event: string) => {
    const selectedValue = event;
    setSelectedCategory(selectedValue);
  };

  const handleDeleteImage = (image_id: number) => {
    // console.log(image_id);
    axios
      .delete(`http://localhost/ordering/product-image.php/${image_id}`)
      .then((res) => {
        console.log(res);
        getProductDetails();
      });
  };

  return (
    <div className="w-full h-fit flex justify-center items-center flex-col text-center">
      <div className="w-[40%]">
        <div className="flex justify-between">
          <Button className="self-start" onClick={() => navigate(-1)}>
            Go Back
          </Button>

          <h1 className="font-bold text-2xl">Update Details</h1>
        </div>
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
            defaultValue={productName}
          />
          <Input
            type="number"
            placeholder="price"
            name="product_price"
            className="mb-2"
            onChange={handleChange}
            defaultValue={price}
          />

          <Textarea
            onChange={handleChange}
            name="product_description"
            placeholder="description"
            className="mb-2 min-h-[10rem]"
            defaultValue={description}
          ></Textarea>

          <Input
            type="number"
            placeholder="quantity"
            name="quantity"
            className="mb-2"
            onChange={handleChange}
            defaultValue={quantity}
          />

          <Input
            type="text"
            placeholder="tags (seperated by spaces)"
            name="tags"
            className="mb-2"
            onChange={handleChange}
            defaultValue={tags}
          />

          <Select value={selectedCategory} onValueChange={handlePaymentType}>
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
                <span key={index}>
                  <img
                    src={image.images_data}
                    alt={`Image ${index}`}
                    className="w-[5rem] h-[5rem] object-cover rounded-full mb-4"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDeleteImage(image.image_id)}
                  >
                    Delete
                  </span>
                </span>
              ))}

              {newImages.map((image, index) => (
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
