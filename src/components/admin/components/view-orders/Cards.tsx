import { FaRegUserCircle } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type OrderDetails = {
  delivery_address: string;
  email: string;
  name: string;
  phone: string;
  payment_type: string;
};

export default function Cards({
  orderDetails,
}: {
  orderDetails: OrderDetails[];
}) {
  return (
    <div className="flex w-full justify-around mt-[2rem] items-start h-[8rem] p-2">
      {orderDetails.map((order, index) => {
        return (
          <div
            className="flex flex-col items-start border-2 w-[20rem] h-full justify-center p-2 rounded-md bg-white"
            key={index}
          >
            <div className="flex items-center">
              <FaRegUserCircle className="w-10 h-[2rem] mr-1.5" />
              <h1 className="font-bold">Customer</h1>
            </div>

            <div className="ml-[3rem] flex flex-col items-start">
              <p className="font-bold">
                Name:{' '}
                <span className="font-semibold text-gray-400">
                  {order.name}
                </span>
              </p>
              <p className="font-bold">
                Email:{' '}
                <span className="font-semibold text-gray-400">
                  {order.email}
                </span>
              </p>
              <p className="font-bold">
                Phone:{' '}
                <span className="font-semibold text-gray-400">
                  {order.phone}
                </span>
              </p>
            </div>
          </div>
        );
      })}
      {orderDetails.map((order, index) => {
        return (
          <div
            className="relative flex flex-col items-start border-2 w-[20rem] h-full justify-center p-2 rounded-md bg-white"
            key={index}
          >
            <div className="absolute flex items-center top-2">
              <AiOutlineInfoCircle className="w-10 h-[2rem] mr-1.5" />
              <h1 className="font-bold">Order Info</h1>
            </div>

            <div className="ml-[3rem] flex flex-col items-start">
              <p className="font-bold">
                Order type:{' '}
                <span className="font-semibold text-gray-400">
                  {order.payment_type}
                </span>
              </p>
            </div>
          </div>
        );
      })}

      {orderDetails.map((order, index) => {
        return (
          <div
            className="relative flex flex-col items-start border-2 w-[20rem] h-full justify-center p-2 rounded-md bg-white"
            key={index}
          >
            <div className="absolute flex items-center top-2">
              <CiLocationOn className="w-10 h-[2rem] mr-1.5" />
              <h1 className="font-bold">Deliver to</h1>
            </div>

            <div className="ml-[3rem] flex flex-col items-start">
              <p className="font-bold">
                Address:{' '}
                <span className="font-semibold text-gray-400">
                  {order.delivery_address}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
