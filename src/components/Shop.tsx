import Logo from '@/assets/cake.png';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_qty: number;
  product_image: string;
};
export default function Shop() {
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState<Product[]>([]);

  const getProduct = () => {
    axios.get('http://localhost/ordering/product.php/').then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };

  useEffect(() => {
    getProduct();
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

    axios
      .get('http://localhost/ordering/cart.php', {
        params: {
          product_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'res');
        if (res.data.length > 0) {
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

  return (
    <div className="w-full h-screen p-4 grid grid-cols-4 gap-4">
      {product.map((product) => (
        <div
          key={product.product_id}
          className="border-2 w-[18rem] max-h-[25rem] rounded-xl overflow-hidden text-white text-start p-4 flex flex-col items-center"
        >
          <img
            className="w-full h-[60%] object-cover rounded-lg"
            src={product.product_image}
            alt="cake"
          />
          <div className="p-2 w-full flex justify-center flex-col bg-white rounded-b-lg">
            <div>
              <Link to={`/shop/${product.product_id}`}>
                {' '}
                <h1 className="font-semibold text-xl cursor-pointer text-black">
                  {product.product_name.slice(0, 10)}
                </h1>
              </Link>

              <div className="flex items-center gap-4 justify-center w-full">
                <p className="text-2xl font-bold break-words">
                  ${product.product_price}
                </p>
                <div
                  className="w-full h-[2.5rem] f-full rounded-md font-bold bg-gray-100 
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
              </div>
            </div>

            <Button
              onClick={() => handleAddToCart(product.product_id)}
              variant="outline"
              className="w-[9rem] h-[2.8rem] mt-4 bg-[#3d633c] text-white self-center"
            >
              Add order{' '}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
