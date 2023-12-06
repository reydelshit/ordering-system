import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import MessageNotification from '../components/orders/MessageNotifcation';

import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';
import PaidOrdersTable from '../components/view-orders/PaidOrdersTable';
import Cards from '../components/view-orders/Cards';
import NotificationViewOrders from '../components/view-orders/NotificationViewOrders';
import { useToast } from '@/components/ui/use-toast';

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

type Rider = {
  user_id: number;
  name: string;
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
  const [isTemplateMessage, setIsTemplateMessage] = useState<boolean>(true);
  const [orderDate, setOrderDate] = useState<string>('');
  const [assignedRider, setAssignedRider] = useState<string>('');
  const [riders, setRiders] = useState<Rider[]>([]);
  const { toast } = useToast();

  const getAssignedRiderName = async () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/rider.php`, {
        params: { order_id: order_id.ordersid },
      })
      .then((res) => {
        console.log(res.data, 'assigned rider');
        if (res.data.length > 0) {
          setAssignedRider(res.data[0].rider_name);
        }
      });
  };
  const getOrders = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_ORDERING_LOCAL_HOST}/view-orders-admin.php`,
        {
          params: { order_id: order_id.ordersid },
        },
      )
      .then((res) => {
        console.log(res.data, 'ndjkabjkda');
        setUserId(res.data[0].user_id);
        console.log(res.data[0].user_id, 'user id');
        setOrderDate(res.data[0].created_at);
        getUserDetails(res.data[0].user_id);
        getOrderDetails(res.data[0].order_id);
        setOrderId(res.data[0].order_id);
        setOrderStatusID(res.data[0].status_id);
        setStatus(res.data[0].status);
        setPaidOrders(res.data);

        // setDataFetched(true);
      });
  };

  const getAssignedRider = async () => {
    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/rider.php`, {})
      .then((res) => {
        console.log(res.data, 'rider');
        setRiders(res.data);
        // setAssignedRider(res.data[0].name);
      });
  };

  const getUserDetails = async (user_id: number) => {
    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/user.php`, {
        params: { user_id: user_id },
      })
      .then((res) => {
        console.log(res.data, 'recepient details');
        setRecepientName(res.data[0].name);
        setUserDetails(res.data);
        setRecepientProfilePicture(res.data[0].profile_picture);
      });
  };

  const getOrderDetails = async (order_id: number) => {
    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/order-details.php`, {
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
    getAssignedRiderName();
    getAssignedRider();
  }, []);

  const handleRider = (event: string) => {
    const selectedValue = event;

    console.log(selectedValue, 'dsanfkjbajf');

    const filterNumber = selectedValue.match(/\d+/g);
    const parsedSupplierID = filterNumber ? parseInt(filterNumber[0], 10) : 0;

    const filterName = selectedValue.match(/[^0-9]+/g);
    const parsedName = filterName ? filterName.join(' ') : '';
    console.log(parsedSupplierID);
    console.log(parsedName, 'name');

    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/rider.php`, {
        rider_id: parsedSupplierID,
        order_id: order_id.ordersid,
        rider_name: parsedName,
        customer_name: recepientName,
      })
      .then((res) => {
        console.log(res.data, 'status');
        getOrders();
        getAssignedRider();

        toast({
          title: 'Rider: Set Successfully',
          description: moment().format('LLLL'),
        });
      });
  };

  const handleStatus = (event: string) => {
    const selectedValue = event;

    console.log(selectedValue);
    console.log(order_id.ordersid, 'orderid');

    axios
      .put(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/status.php`, {
        status: selectedValue,
        order_id: order_id.ordersid,
      })
      .then((res) => {
        console.log(res.data, 'status');
        getOrders();
        toast({
          title: 'Order Status: Changed Successfully',
          description: moment().format('LLLL'),
        });
      });

    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/notification.php`, {
        sender_id: localStorage.getItem('ordering-token'),
        receiver_id: userDetails[0].user_id,
        message: `Hi ${recepientName}, your order with order id number ${order_id.ordersid} has been ${selectedValue}.`,
      })
      .then(() => {
        console.log('Message sent');
      });
  };

  const handleExport = () => {
    window.print();
  };

  const handleSetTemplateMessage = () => {
    setIsTemplateMessage(!isTemplateMessage);
    const newTemplateMessage = `Hi ${recepientName}, your order with order id number ${order_id.ordersid} has been ${status}.`;
    console.log(newTemplateMessage);
    setTemplateMessage(newTemplateMessage);
  };

  const handleSetNotes = () => {
    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/notes.php`, {
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
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/notes.php`, {
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
        <Button
          className="self-start bg-[#5d383a]"
          onClick={() => navigate(-1)}
        >
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
          <h1 className="bg-[#5d383a] p-2 text-white rounded-xl">
            {assignedRider.length > 0 ? assignedRider : ''}
          </h1>
          <div className="text-start mr-[2rem]">
            <Select
              disabled={assignedRider.length > 0 ? true : false}
              onValueChange={(e) => handleRider(e)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Assigned rider" />
              </SelectTrigger>
              <SelectContent>
                {riders.map((rider, index) => {
                  return (
                    <SelectItem key={index} value={rider.name + rider.user_id}>
                      {rider.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <h1 className="bg-[#5d383a] p-2 text-white rounded-xl">{status}</h1>
          <Select onValueChange={(e) => handleStatus(e)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Set status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="On Delivery">On Delivery</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-[#5d383a]" onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>

     <Cards orderDetails={orderDetails} />


      <div className="flex mt-[2rem] gap-4">
        <PaidOrdersTable paidOrders={paidOrders} status={status} />

        <div className="relative w-[70%] h-[28rem] p-2 border-2 rounded-md bg-white">
          <NotificationViewOrders
            recepientName={recepientName}
            recepeintProfilePicture={recepeintProfilePicture}
            handleSetTemplateMessage={handleSetTemplateMessage}
          />
          {userId !== 0 && <MessageNotification userId={Number(userId)} />}
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
            className="mt-[1rem] self-end bg-[#5d383a]"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
