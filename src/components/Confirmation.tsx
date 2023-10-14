import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from './ui/button';

type Cart = {
  cart_id: number;
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

  const [cart, setCart] = useState<Cart[]>([]);

  const handleFetchCart = () => {
    const token = localStorage.getItem('ordering-token');

    console.log(token);
    if (token === null) {
      return;
    }

    axios
      .get('http://localhost/ordering/cart.php', { params: { user_id: token } })
      .then((res) => {
        setCart(res.data);
        console.log(res.data, 'cart');
      });
  };

  useEffect(() => {
    handleFetchCart();
  }, []);

  return (
    <div>
      <div>
        <h1>Order Confirmation</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        {phone && <p>Phone: {phone}</p>}
        <p>Address: {address}</p>
        total Pay $
        {cart.map((prod) => (
          <div>
            <img className="w-[5rem]" src={prod.product_image} alt="" />
            {prod.product_name}
            {prod.product_price}
            <h1 className="font-bold"> {prod.qty}</h1>
          </div>
        ))}
        {cart.reduce((total, prod) => total + prod.product_price * prod.qty, 0)}
      </div>

      <Button>Confirm</Button>
    </div>
  );
}
