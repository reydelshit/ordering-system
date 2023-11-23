import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Cart = {
  cart_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};

export default function OrderConfirmation() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const address = searchParams.get('address');
  const paymentType = searchParams.get('payment_type');
  const navigate = useNavigate();

  const [cart, setCart] = useState<Cart[]>([]);

  const handleFetchCart = () => {
    const token = localStorage.getItem('ordering-token');

    console.log(token);
    if (token === null) {
      return;
    }

    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php`, {
        params: { user_id: token },
      })
      .then((res) => {
        setCart(res.data);

        console.log(res.data, 'cart');
      });
  };

  useEffect(() => {
    handleFetchCart();
  }, []);

  const handleConfirmPayment = () => {
    const token = localStorage.getItem('ordering-token');

    if (token === null) {
      return;
    }

    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/orders.php`, {
        user_id: token,
        payment_type: paymentType,
        total_amount: cart.reduce(
          (total, prod) => total + prod.product_price * prod.qty,
          0,
        ),
        products: cart,
        delivery_address: address,
        name: name,
        email: email,
        phone: phone,
      })
      .then((res) => {
        console.log(res.data);

        window.location.href = '/profile';
      });

    axios.post('');
  };

  return (
    <div>
      <div className=" mt-[2rem] flex justify-between items-center">
        <h1 className="font-bold text-3xl text-start">ORDER CONFIRMATION</h1>
        <span className="block font-bold text-2xl bg-[#5d383a] p-2 text-white rounded-md">
          ORDER TOTAL: ₱{' '}
          {cart.reduce(
            (total, prod) => total + prod.product_price * prod.qty,
            0,
          )}
        </span>
      </div>
      <div className="flex justify-between items-start text-start mt-[5rem] gap-5">
        <div className="w-[50%] border-2 h-[15rem] flex flex-col items-start p-4 rounded-md">
          <h1 className="font-bold mb-2">Your Information</h1>

          <div>
            <p>{name}</p>
            <p>{email}</p>
            {phone && <p>{phone}</p>}
          </div>
        </div>

        <div className="w-[50%] border-2 h-[15rem] flex flex-col items-start justify-center p-4 rounded-md">
          <h1 className="font-bold mb-2">Payment Type</h1>
          <p className="mb-[3rem]">
            {paymentType === 'cod' ? 'CASH ON DELIVERY (COD)' : 'CARD'}
          </p>
          <h1 className="font-bold mb-2">Shipping Address</h1>
          <p>{address}</p>
        </div>
      </div>

      <div className="mt-[4rem]">
        <h1 className="text-start font-bold">YOUR ORDERS</h1>
        {cart.map((cart, index) => (
          <div
            className="flex h-[6rem] items-center justify-between w-full border-b-2 p-2 mb-2"
            key={index}
          >
            <div className="flex gap-2">
              <img
                className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                src={cart.product_image}
                alt={cart.product_name}
              />
              <div>
                <h1 className="font-bold">{cart.product_name}</h1>
                <p>Qty: {cart.qty}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between h-full items-center">
              <span className="block font-bold">
                ₱{cart.product_price * cart.qty}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="self-start mr-2 bg-red-500"
        onClick={() => navigate(-1)}
      >
        Cancel, Go Back
      </Button>

      <AlertDialog>
        <AlertDialogTrigger className="bg-[#5d383a] text-white font-semibold p-1.5 rounded-md">
          {' '}
          Confirm Order
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed with the order? You will have the
              option to cancel before finalizing. Please double-check the
              details before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#5d383a]"
              onClick={handleConfirmPayment}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
