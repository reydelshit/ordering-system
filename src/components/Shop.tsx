import Logo from '@/assets/cake.png';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_qty: number;
  product_image: string;
  feedback_rating: number;
};

type Feedback = {
  email: string;
  feedback_description: string;
  feedback_id: number;
  feedback_rating: number;
  name: string;
  profile_picture: string;
  feedback_date: string;
};

export default function Shop() {
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  // const [priceFilter, setPriceFilter] = useState<number[]>([0, 1000]);
  const [rangeValue, setRangeValue] = useState(5000);

  const [search, setSearch] = useState('');

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const getProduct = () => {
    axios.get('http://localhost/ordering/product.php/').then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };

  // const fetchFeedbacks = () => {
  //   axios
  //     .get('http://localhost/ordering/feedback.php', {
  //       params: {
  //         product_id: product_id.id,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data, 'feedbacks');
  //       setFeedbacks(res.data);
  //     });
  // };

  useEffect(() => {
    getProduct();
    // fetchFeedbacks()
  }, []);

  const navigate = useNavigate();

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

    console.log(id);

    axios
      .get('http://localhost/ordering/cart.php', {
        params: {
          product_id: id,
          user_id: token,
        },
      })
      .then((res) => {
        console.log(res.data, 'cart');
        if (res.data.length > 1) {
          axios
            .put('http://localhost/ordering/cart.php', {
              cart_id: res.data[0].cart_id,
              qty: res.data[0].qty + quantity,
            })
            .then((res) => {
              console.log(res);
            });
        } else {
          axios.post('http://localhost/ordering/cart.php', data).then((res) => {
            console.log(res.data);
          });
        }
      });
  };

  const handleIncreaseQuantity = (index: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (index: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) - 1,
    }));
  };

  const handlePriceFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
  };

  const handleClick = (number: number) => {
    console.log(number + 1);
    setRating(number + 1);
    setSelectedRating(number);
  };

  return (
    <div className="border-2  p-4">
      <div className="border-2 h-[4rem] rounded-lg mb-2 flex justify-between w-full items-center px-2">
        <Popover>
          <PopoverTrigger>Filter</PopoverTrigger>
          <PopoverContent className="h-fit w-fit">
            <div className="border-2 p-2 rounded-md mb-2">
              <h1 className="font-bold mb-2">Category</h1>
              <span className="block mb-2">
                <Checkbox className="mr-2" />
                Tshirt
              </span>
              <span className="block mb-2">
                <Checkbox className="mr-2" />
                Pants
              </span>
              <span className="block mb-2">
                <Checkbox className="mr-2" />
                Hoodie
              </span>
              <span className="block mb-2">
                <Checkbox className="mr-2" />
                All
              </span>
            </div>

            <div className="border-2 p-2 rounded-md py-[1rem mb-2">
              <h1 className="font-bold mb-2">Price Range</h1>

              <span>{rangeValue}</span>
              <input
                id="steps-range"
                type="range"
                min="0"
                max="10000"
                value={rangeValue}
                onChange={handlePriceFilter}
                step="1"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-green-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5  [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
            <div className="border-2 p-2 rounded-md py-[1rem]">
              <h1 className="font-bold mb-2">Filter by Star</h1>

              <div className="flex mt-[1rem] w-full justify-center">
                {Array.from({ length: 5 }, (_, i) => i).map((number) => {
                  const isSelected = selectedRating === number;
                  return (
                    <Button
                      onClick={() => handleClick(number)}
                      key={number}
                      className={`${
                        isSelected
                          ? 'bg-green-700 text-white'
                          : 'bg-white text-green-700'
                      } ' mr-2 my-2 hover:bg-green-700 hover:text-white`}
                    >
                      {number + 1} ⭐
                    </Button>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 rounded-lg h-full w-[20rem] ml-2 p-2"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="w-full h-screen grid grid-cols-4 gap-4">
        {product
          .filter((prod) => {
            return (
              prod.product_price <= rangeValue &&
              prod.product_name.includes(search)
            );
          })
          .map((prod, index) => (
            <div
              key={index}
              className="border-2 w-[18rem] max-h-[25rem] rounded-xl overflow-hidden text-white text-start p-4 flex flex-col items-center"
            >
              <img
                className="w-full h-[60%] object-cover rounded-lg"
                src={prod.product_image}
                alt="cake"
              />
              <div className="p-2 w-full flex justify-center flex-col bg-white rounded-b-lg">
                <div>
                  <div className="flex justify-between mb-2">
                    <Link to={`/shop/${prod.product_id}`}>
                      {' '}
                      <h1 className="font-semibold text-xl cursor-pointer text-black">
                        {prod.product_name.slice(0, 10)}
                      </h1>
                    </Link>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => i).map((number) => {
                        const untilWhatNumber = prod.feedback_rating;
                        return (
                          <svg
                            key={number}
                            className="w-4 h-4 text-yellow-300 mr-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill={
                              number == untilWhatNumber
                                ? 'gray'
                                : 'currentColor'
                            }
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-center w-full">
                    <p className="text-2xl font-bold break-words">
                      ${prod.product_price}
                    </p>
                    <div
                      className="w-full h-[2.5rem] f-full rounded-md font-bold bg-gray-100 
    flex justify-between items-center px-4"
                    >
                      <span
                        onClick={() => handleDecreaseQuantity(index)}
                        className="font-bold text-2xl cursor-pointer"
                      >
                        -
                      </span>
                      {/* <span>{selectedProductIndex === index ? quantity : 1}</span> */}
                      <span>{quantities[index] || 1}</span>
                      <span
                        onClick={() => handleIncreaseQuantity(index)}
                        className="font-bold text-2xl cursor-pointer"
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart(prod.product_id)}
                  variant="outline"
                  className="w-[9rem] h-[2.8rem] mt-4 bg-[#3d633c] text-white self-center"
                >
                  Add order{' '}
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
