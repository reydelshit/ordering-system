import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Feedbacks from './Feedbacks';

// type Image = {
//   images_data: string;
// }[];

type Product = {
  product_id: number;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
  product_description: string;
  tags: string;
};

type Image = {
  images_data: string;
};

export default function View() {
  const [quantity, setQuantity] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [product, setProduct] = useState<Product[]>([]);
  const [images, setImages] = useState<Image[]>([]);

  const id = useParams();

  const navigate = useNavigate();

  const fetchProduct = () => {
    console.log(id);
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/product.php`, {
        params: {
          product_id: id.id,
        },
      })
      .then((res) => {
        // console.log(res.data, 'view product');

        setProduct(res.data);
      });
  };

  const fetchProductImages = () => {
    console.log(id);
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/product-images.php`, {
        params: {
          product_id: id.id,
        },
      })
      .then((res) => {
        console.log(res.data, 'view product images');
        setImages(res.data);
      });
  };

  useEffect(() => {
    fetchProduct();
    fetchProductImages();
  }, []);

  const handleShowPicture = (index: number) => {
    setShowImage(true);
    setTrackIndex(index);
    console.log(index);
  };

  const handleAddToCart = (id: number) => {
    const token = localStorage.getItem('ordering-token');

    if (token === null) {
      navigate('/login');
    }
    const data = {
      user_id: token,
      product_id: id,
      qty: quantity,
    };

    // console.log(id);

    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php`, {
        params: {
          product_id: id,
          user_id: token,
        },
      })
      .then((res) => {
        console.log(res.data, 'res');
        if (res.data.length > 0) {
          axios
            .put(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php`, {
              cart_id: res.data[0].cart_id,
              qty: res.data[0].qty + quantity,
            })
            .then((res) => {
              console.log(res);
            });
        } else {
          axios
            .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php`, data)
            .then((res) => {
              console.log(res.data);
            });
        }
      });
  };

  const ModalPicture = () => {
    return (
      <div
        onClick={() => setShowImage(false)}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center"
      >
        <Button
          className="self-end mr-[10rem]"
          onClick={() => setShowImage(false)}
        >
          Close
        </Button>
        <div className="w-[50%] h-[80%] flex justify-center items-center object-contain overflow-hidden rounded-2xl">
          <img
            className="h-fit rounded-lg w-full object-cover"
            src={images[trackIndex].images_data!}
            alt="picture"
          />
          B
        </div>
      </div>
    );
  };
  return (
    <div className="relative">
      {product.map((prod, index) => (
        <div
          className="w-full h-[70vh] flex p-2 justify-between gap-[2rem] container"
          key={index}
        >
          <div className="w-[40em] flex flex-col justify-center items-center">
            <img
              className="object-cover !h-[30rem] rounded-lg bg-[#5d383a]"
              src={prod.product_image}
              alt="cake"
            />
            <div className="flex w-full justify-center h-[7rem] gap-4 p-4 mt-5 object-cover">
              {images.map((image, index) => (
                <img
                  key={index}
                  className="w-[9rem] h-[8rem] cursor-pointer object-cover rounded-md"
                  src={image.images_data!}
                  alt="cake"
                  onClick={() => handleShowPicture(index)}
                />
              ))}
            </div>
          </div>
          {showImage && <ModalPicture />}
          <div className="text-start flex flex-col item-start justify-center w-[38rem] p-2 container">
            <span>{prod.tags}</span>
            <h1 className="font-bold text-4xl mb-4">{prod.product_name}</h1>
            <p className="mb-4 break-words w-full block">
              {prod.product_description}
            </p>
            <span className="flex items-center gap-5 mb-4">
              <h1 className="font-bold text-3xl">₱{prod.product_price}</h1>
              {/* <p className="p-1 rounded-sm bg-violet-600 text-white">50%</p> */}
            </span>
            <div className="flex h-[2.8rem] gap-8">
              <div
                className="w-[50%] f-full rounded-md font-bold bg-gray-100
           flex justify-between items-center px-4"
              >
                <span
                  onClick={() => setQuantity(quantity - 1)}
                  className="font-bold text-2xl cursor-pointer"
                >
                  -
                </span>
                <span>{quantity < 0 ? 0 : quantity}</span>
                <span
                  onClick={() => setQuantity(quantity + 1)}
                  className="font-bold text-2xl cursor-pointer"
                >
                  +
                </span>
              </div>
              <Button
                onClick={() => handleAddToCart(prod.product_id)}
                className="w-[50%] h-full bg-[#5d383a] "
              >
                Add to Order cart
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Feedbacks />
    </div>
  );
}
