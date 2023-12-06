import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import { MainContext } from '@/components/hooks/useShowMessage';
import { Input } from '@/components/ui/input';

type Notification = {
  created_at: string;
  message_context: string;
  receiver_id: number;
  sender_id: number;
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

type MessageType = {
  created_at: string;
  message_context: string;
  receiver_id: number;
  sender_id: number;
  profile_picture: string;
  sender_username: string;
};

export default function MessageNotification({ userId }: { userId: number }) {
  const [message, setMessage] = useState('');
  const [recepientMessage, setRecepientMessage] = useState<MessageType[]>([]);

  const getMessageRecepient = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/message-fetch.php`, {
        params: {
          sender_id: Number(localStorage.getItem('ordering-token')),
          receiver_id: userId,
        },
      })
      .then((res) => {
        console.log(res.data, 'get message recepient');
        setRecepientMessage(res.data);
      });
  };

  useEffect(() => {
    getMessageRecepient();
  }, []);

  const handleMessageSent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/message.php`, {
        sender_id: Number(localStorage.getItem('ordering-token')),
        receiver_id: userId,
        message_context: message,
      })
      .then((res) => {
        console.log(res.data, 'message sent');
        getMessageRecepient();
        setMessage('');
      });
  };
  const userPov = Number(localStorage.getItem('ordering-token'));

  return (
    <div className="flex flex-col bottom-2 justify-between items-center">
      <div className="overflow-x-auto h-[17rem] w-full">
        {recepientMessage.map((res, index) => {
          return (
            <div
              key={index}
              className={`border-2 p-2 mt-[1rem] rounded-sm w-full ${
                Number(res.sender_id) === Number(userPov)
                  ? 'bg-[#5D383A] !text-white'
                  : 'bg-gray-200'
              } text-start`}
            >
              <p>{res.message_context}</p>
              <p className="text-xs">{moment(res.created_at).format('LLL')}</p>
            </div>
          );
        })}
      </div>

      <div className="h-[4rem] absolute bottom-2 w-[90%] flex p-2 gap-5">
        <form className="w-full flex gap-4" onSubmit={handleMessageSent}>
          <Input
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            placeholder="Type your message here"
            required
          />

          <Button type="submit" className="bg-[#5D383A]">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
