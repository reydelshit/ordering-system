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
import Star from './Star';

type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_qty: number;
  product_image: string;
  feedback_rating: number;
  product_category: string;
};


type CartProductRes = {
  cart_id: number;
  product_id: number;
  user_id: number;
  qty: number;
  isPaid: number;
}

export default function Shop() {
  const [product, setProduct] = useState<Product[]>([]);

  const productIndex = 0; // Define productIndex here
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const [rangeValue, setRangeValue] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState('' as string);
  const [cart, setCart] = useState<CartProductRes []>([])

  const [search, setSearch] = useState('');

  const getProduct = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/product.php`)
      .then((res) => {
        console.log(res.data, 'product');
        setProduct(res.data);
      });
  };

  useEffect(() => {
    getProduct();
    // fetchFeedbacks()
  }, []);

  const navigate = useNavigate();

  const handleAddToCart = (id: number, index: number) => {
    const token = localStorage.getItem('ordering-token');

    if (token === null) {
      navigate('/login');
    }
    const data = {
      user_id: token,
      product_id: id,
      qty: quantities[index] > 0 ? quantities[index] : 1,
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
        console.log(res.data, 'cart');

        setCart(res.data)
        // console.log(cart[0].qty, 'currebt')

        // if(res.data.length > 0){
        //   const currentQ = cart[0].qty
        //   const ohoh = parseInt(currentQ as unknown as string) + 5
        //   console.log(ohoh)

        // }
        
        if (res.data.length > 0) {


          // console.log(cart[0].qty as number + 5, 'calculate')
          axios
            .put(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php`, {
              cart_id: res.data[0].cart_id,
              qty: parseInt(res.data[0].qty) + quantities[index],
            })
            .then((res) => {
              console.log(res.data);
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

  const handleIncreaseQuantity = (index: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1,
    }));

    console.log(quantities);
  };

  const handleDecreaseQuantity = (index: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) - 1,
    }));

    console.log(quantities);
  };

  const handlePriceFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
  };

  const handleChangeCategory = (event: React.FormEvent<HTMLInputElement>) => {
    setSelectedCategory(event.currentTarget.value);
  };

  return (
    <div className="p-4 ">
      <div className="h-[4rem] rounded-lg mb-2 flex justify-between w-full items-center px-2">
        <Popover>
          <PopoverTrigger className="bg-[#5d383a] p-2 rounded-md text-white w-[10rem]">
            Filter
          </PopoverTrigger>
          <PopoverContent className="h-fit w-[20rem]">
            <div className="border-2 p-2 rounded-md mb-2">
              <h1 className="font-bold mb-2">Category</h1>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="tshirt"
                  name="category"
                  onChange={handleChangeCategory}
                  className="w-4 h-4 cursor-pointer rounded-lg"
                />
                <span className="ml-2">Tshirt</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="pants"
                  name="category"
                  onChange={handleChangeCategory}
                  className="w-4 h-4 cursor-pointer rounded-lg"
                />
                <span className="ml-2">Pants</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value=""
                  name="category"
                  onChange={handleChangeCategory}
                  className="w-4 h-4 cursor-pointer rounded-lg"
                />
                <span className="ml-2">All</span>
              </div>
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
            {/* <div className="border-2 p-2 rounded-md py-[1rem]">
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
            </div> */}
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
      <div className="w-full h-fit grid grid-cols-5 gap-4">
        {product
          .filter((prod) => {
            return (
              prod.product_price <= rangeValue &&
              prod.product_name.includes(search) &&
              prod.product_category.includes(selectedCategory)
            );
          })
          .map((prod, index) => (
            <div
              key={index}
              className="border-2 w-[18rem] max-h-[25rem] rounded-xl overflow-hidden text-start p-4 flex flex-col items-center"
            >
              <img
                className="w-full h-[60%] object-cover rounded-lg bg-[#5d383a]"
                src={prod.product_image}
                alt="cake"
              />
              <div className="p-2 w-full flex justify-center flex-col rounded-b-lg">
                <div>
                  <div className="flex justify-between mb-2">
                    <Link to={`/shop/${prod.product_id}`}>
                      {' '}
                      <h1 className="font-semibold text-xl cursor-pointer text-[#5d383a]">
                        {prod.product_name.slice(0, 10)}
                      </h1>
                    </Link>
                    <Star product_id={prod.product_id} index={index} />
                  </div>

                  <div className="flex items-center gap-4 justify-center w-full">
                    <p className="text-2xl font-bold break-words">
                      ₱{prod.product_price}
                    </p>
                    <div
                      className="w-full h-[2.5rem] f-full rounded-md font-bold bg-gray-200
    flex justify-between items-center px-4"
                    >
                      <span
                        onClick={() => handleDecreaseQuantity(index)}
                        className="font-bold text-2xl cursor-pointer"
                      >
                        -
                      </span>

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
                  onClick={() => handleAddToCart(prod.product_id, index)}
                  className="w-[9rem] h-[2.8rem] mt-4 text-white self-center bg-[#5d383a]"
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
