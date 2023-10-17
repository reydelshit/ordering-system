import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import MessageNotification from '../components/MessageNotifcation';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';
type Product = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  quantity: number;
  product_image: string;
  status: string;
  product_id: number;
  order_id: number;
  status_id: number;
};

type User = {
  user_id: number;
  name: string;
  address: string;
  email: string;
  password: string;
  gender: string;
  type: string;
  profile_picture: string;
  created_at: string;
  profile_description: string;
};

type OrderDetails = {
  delivery_address: string;
  email: string;
  name: string;
  phone: string;
  payment_type: string;
};

export default function ViewOrders() {
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const [orderID, setOrderId] = useState<number>(0);
  const [orderStatusID, setOrderStatusID] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const order_id = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number>(0);
  const [recepientName, setRecepientName] = useState<string>('');
  const [recepeintProfilePicture, setRecepientProfilePicture] =
    useState<string>('');

  const [notes, setNotes] = useState<string>('');
  const [templateMessage, setTemplateMessage] = useState<string>('');
  const [orderDate, setOrderDate] = useState<string>('');

  const getOrders = async () => {
    await axios
      .get('http://localhost/ordering/view-orders-admin.php', {
        params: { order_id: order_id.ordersid },
      })
      .then((res) => {
        // console.log(res.data, 'ndjkabjkda');
        setUserId(res.data[0].user_id);
        setOrderDate(res.data[0].created_at);
        console.log(res.data[0].user_id, 'user id');
        getUserDetails(res.data[0].user_id);
        getOrderDetails(res.data[0].order_id);
        setOrderId(res.data[0].order_id);
        setOrderStatusID(res.data[0].status_id);
        setStatus(res.data[0].status);
        setPaidOrders(res.data);

        // setDataFetched(true);
      });
  };

  const getUserDetails = async (user_id: number) => {
    await axios
      .get('http://localhost/ordering/user.php', {
        params: { user_id: user_id },
      })
      .then((res) => {
        console.log(res.data);
        setRecepientName(res.data[0].name);
        setUserDetails(res.data);
        setRecepientProfilePicture(res.data[0].profile_picture);
      });
  };

  const getOrderDetails = async (order_id: number) => {
    await axios
      .get('http://localhost/ordering/order-details.php', {
        params: { order_id: order_id },
      })
      .then((res) => {
        console.log(res.data, 'order details');
        setOrderDetails([res.data[0]]);
      });
  };

  useEffect(() => {
    getOrders();
    getNotes();
  }, []);

  const handleStatus = (event: string, status_id: number) => {
    const selectedValue = event;

    console.log(selectedValue);
    console.log(status_id);

    axios
      .put('http://localhost/ordering/status.php', {
        status: selectedValue,
        status_id: status_id,
      })
      .then((res) => {
        console.log(res.data, 'status');
        getOrders();
      });
  };

  const handleExport = () => {
    window.print();
  };

  const handleSetTemplateMessage = () => {
    setTemplateMessage(
      `Hi ${recepientName}, your order with order id number ${order_id.ordersid} has been ${status}.`,
    );
  };

  const handleSetNotes = () => {
    axios
      .post('http://localhost/ordering/notes.php', {
        notesMessage: notes,
        order_id: order_id.ordersid,
      })
      .then((res) => {
        console.log(res.data, 'notes');
        setNotes('');
      });
  };

  const getNotes = async () => {
    axios
      .get('http://localhost/ordering/notes.php', {
        params: { order_id: order_id.ordersid },
      })
      .then((res) => {
        // console.log(res.data, 'notes');
        // console.log(res.data[0].notesMessage, 'notes');
        if (res.data.length > 0) {
          setNotes(res.data[0].notesMessage);
        }
      });
  };

  return (
    <div className="flex flex-col p-4 justify-center bg-white">
      <div className="flex justify-between">
        <Button className="self-start" onClick={() => navigate(-1)}>
          Go Back
        </Button>

        <h1 className="font-bold text-2xl">Order Details</h1>
      </div>

      <div className="h-[5rem] border-2 mt-[2rem] rounded-md flex justify-between items-center p-2 bg-white">
        <div className="text-start">
          <span className="flex items-center">
            <AiOutlineCalendar className="w-[2rem] h-[3rem]" />
            <h1 className="font-bold">{moment(orderDate).format('LLLL')}</h1>
          </span>
          <p className="text-xs"> Order ID: {orderID}</p>
        </div>

        <div className="flex gap-2 items-center">
          <h1>{status}</h1>
          <Select onValueChange={(e) => handleStatus(e, orderStatusID)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Set status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleExport}>Export</Button>
        </div>
      </div>

      <div>
        <div className="flex w-full justify-between mt-[2rem] items-start h-[8rem]">
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
      </div>

      <div className="flex mt-[2rem] gap-4">
        <div className="w-[100%] mt-[2rem] flex flex-col bg-white p-2 rounded-md border-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>

                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paidOrders.map((prod, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-4">
                      <img
                        className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                        src={prod.product_image}
                        alt={prod.product_name}
                      />
                      {prod.product_name}
                    </TableCell>

                    <TableCell>${prod.product_price}</TableCell>
                    <TableCell>{prod.quantity}</TableCell>
                    <TableCell>${prod.product_price * prod.quantity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="self-end mt-[2rem] mr-[2rem] flex gap-2 flex-col items-start w-[10rem]">
            <span className="flex gap-[2rem] text-center w-full justify-between items-center">
              <h1>Total: </h1>
              <p className="font-bold text-start text-2xl">
                {paidOrders.reduce(
                  (total, prod) => total + prod.product_price * prod.quantity,
                  0,
                )}
              </p>
            </span>

            <div className="flex gap-[2rem] text-center w-full justify-between">
              <h1>Status: </h1>
              <p className="font-bold">{status}</p>
            </div>
          </div>
        </div>

        <div className="w-[70%] h-[22rem] relative p-2 border-2 rounded-md bg-white">
          <div className="flex flex-row items-center h-[4rem] w-full justify-between">
            <div className="flex h-full items-center gap-4">
              <img
                className="w-[4rem] h-full cover rounded-full"
                src={recepeintProfilePicture}
                alt={recepientName}
              />
              <span className="font-bold text-1xl">{recepientName}</span>
            </div>

            <Button onClick={handleSetTemplateMessage} className="bg-green-700">
              Use message template
            </Button>
          </div>
          {userId !== 0 && (
            <MessageNotification
              templateMessage={templateMessage}
              userId={Number(userId)}
              userDetails={userDetails}
            />
          )}
        </div>
      </div>

      <div className="w-[100%] flex gap-2 justify-between mt-[2rem]">
        <div className="flex flex-col w-[100%]">
          <Textarea
            defaultValue={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-[10rem] w-full bg-white"
            placeholder="Enter your notes here"
            // disabled={notes.length}
          ></Textarea>
          <Button
            disabled={notes.length === 0 ? true : false}
            onClick={handleSetNotes}
            className="mt-[1rem] self-end bg-green-700"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
