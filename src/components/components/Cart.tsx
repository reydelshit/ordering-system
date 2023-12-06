import { Button } from '../ui/button';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import moment from 'moment';
import { useToast } from '../ui/use-toast';
type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};

export default function Cart({ cart }: { cart: Cart[] }) {
  const { toast } = useToast();
  const handleDeleteCartProduct = (cart_id: number) => {
    console.log(cart_id);
    axios
      .delete(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php/${cart_id}`)
      .then((res) => {
        console.log(res);
        toast({
          title: 'Cart: Deleted Successfully',
          description: moment().format('LLLL'),
        });
      });
  };
  return (
    <div className="w-full">
      {cart.length > 0 ? (
        cart.map((ca, index) => (
          <div
            className="flex h-[6rem] items-center justify-between border-b-2 mb-2"
            key={index}
          >
            <div className="flex gap-2 w-full">
              <img
                className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                src={ca.product_image}
                alt={ca.product_name}
              />
              <div>
                <h1 className="font-bold">{ca.product_name}</h1>
                <p>Qty: {ca.qty}</p>
              </div>
            </div>

            <div className="flex flex-col justify-around h-full items-center">
              <span
                onClick={() => handleDeleteCartProduct(ca.cart_id)}
                className="cursor-pointer"
              >
                <AiOutlineDelete className="text-3xl text-[#5d383a]" />
              </span>
              <span className="block font-bold">
                ₱{ca.product_price * ca.qty}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-[9rem]">
          <h1 className="font-bold text-1xl">Cart is empty</h1>
        </div>
      )}

      <div>
        <div className="w-full flex justify-between p-4 font-bold">
          <h1>Total</h1>
          <span>
            ₱
            {cart.reduce(
              (total, prod) => total + prod.product_price * prod.qty,
              0,
            )}
          </span>
        </div>

        <div>
          <Link to="/shop/checkout">
            <Button className="w-full h-[3rem] text-white font-bold bg-[#5d383a]">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
