import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import gcash from '@/assets/gcash.jpg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
type Cart = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  product_image: string;
};

export default function Checkout() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    'cod' as string,
  );
  const [user, setUser] = useState([]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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

  const fetchUser = () => {
    const token = localStorage.getItem('ordering-token');

    if (token === null) {
      return;
    }

    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/user.php`, {
        params: { user_id: token },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data[0].name);
        setAddress(res.data[0].address);
        setEmail(res.data[0].email);

        setUser(res.data);
      });
  };

  useEffect(() => {
    handleFetchCart();
    fetchUser();
  }, []);

  const handleDeleteCartProduct = (cart_id: number) => {
    console.log(cart_id);
    axios
      .delete(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/cart.php/${cart_id}`)
      .then((res) => {
        console.log(res);
      });
  };

  const handlePaymentType = (event: string) => {
    const selectedValue = event;
    setSelectedPaymentType(selectedValue);
    // console.log(selectedValue);
  };

  return (
    <div className="w-full flex justify-around">
      <div className="w-[40%] p-4 flex flex-col justify-center items-center">
        <div className="flex gap-4 justify-center mt-[4rem] items-center">
          <div className="w-[15rem]">
            <Select onValueChange={handlePaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cod">Cash On Delivery (COD)</SelectItem>
                <SelectItem value="gcash">Gcash</SelectItem>

                {/* <SelectItem value="card">Card</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
        {
          selectedPaymentType === 'gcash' ? (
            <div className="mt-[5rem] border-2 w-full p-4 rounded-lg">
              <h1 className="mb-2 font-bold text-2xl"> GCASH PAYMENT</h1>
              <img src={gcash} className="h-[40rem]" alt="gcash" />

              <Button className="bg-[#5d383a]" disabled>
                Continue
              </Button>
            </div>
          ) : (
            <div className="mt-[5rem] border-2 w-full p-4 rounded-lg">
              <form>
                <h1 className="mb-2 font-bold text-2xl">CASH ON DELIVERY</h1>
                <div className="p-4">
                  <Label className="text-start block mb-2">
                    Contact Information
                  </Label>
                  <Input
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-2"
                    placeholder="Name"
                    required
                  ></Input>
                  <Input
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2"
                    placeholder="Email"
                  ></Input>
                  <Input
                    onChange={(e) => setPhone(e.target.value)}
                    className="mb-2"
                    placeholder="Phone number"
                    required
                  ></Input>
                </div>

                <div className="p-4 mt-[2rem]">
                  <Label className="text-start block mb-2">
                    Delivery Address
                  </Label>
                  <Input
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mb-2"
                    placeholder="Address"
                    required
                  ></Input>
                </div>

                <Button
                  className="bg-[#5d383a]"
                  type="submit"
                  disabled={!name || !email || !phone || !address}
                >
                  <Link
                    to={`/shop/checkout/order-confirmation?name=${name}&email=${email}&phone=${phone}&address=${address}&payment_type=${selectedPaymentType}`}
                  >
                    Pay ₱
                    {cart.reduce(
                      (total, prod) => total + prod.product_price * prod.qty,
                      0,
                    )}
                  </Link>
                </Button>
              </form>
            </div>
          )

          // <div className="mt-[5rem] border-2 w-full p-4 rounded-lg">
          //   <h1 className="mb-2 font-bold text-2xl">CARD PAYMENT</h1>

          //   <div className="p-4">
          //     <Label className="text-start block mb-2">Name</Label>
          //     <Input
          //       defaultValue={name}
          //       onChange={(e) => setName(e.target.value)}
          //       className="mb-2"
          //     ></Input>

          //     <Label className="text-start block mb-2">Address</Label>
          //     <Input
          //       defaultValue={address}
          //       onChange={(e) => setAddress(e.target.value)}
          //       className="mb-2"
          //     ></Input>

          //     <Label className="text-start block mb-2">Card number</Label>
          //     <Input className="mb-2"></Input>

          //     <div>
          //       <Label className="text-start block mb-2">Expiration</Label>
          //       <div className="flex gap-2 mb-2">
          //         <Input className="mb-2" placeholder="MM"></Input>
          //         <Input className="mb-2" placeholder="YY"></Input>
          //       </div>

          //       <Label className="text-start block mb-2">CVC</Label>
          //       <Input className="mb-2"></Input>
          //     </div>

          //     <Link to="/shop/checkout/order-confirmation">
          //       <Button>
          //         Pay $
          //         {cart.reduce(
          //           (total, prod) => total + prod.product_price * prod.qty,
          //           0,
          //         )}
          //       </Button>
          //     </Link>
          //   </div>
          // </div>
        }
      </div>

      <div className="w-[30rem] p-4">
        <h1 className="font-bold text-2xl">ORDERS</h1>
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
              <span
                onClick={() => handleDeleteCartProduct(cart.cart_id)}
                className="cursor-pointer"
              >
                <AiOutlineDelete className="text-3xl text-[#5d383a]" />
              </span>
              <span className="block font-bold">
                ₱{cart.product_price * cart.qty}
              </span>
            </div>
          </div>
        ))}
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
      </div>
    </div>
  );
}
