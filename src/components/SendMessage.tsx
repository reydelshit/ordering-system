import Cake from '@/assets/cake.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from './hooks/useShowMessage';
import axios from 'axios';
import moment from 'moment';

type MessageType = {
  created_at: string;
  message_context: string;
  receiver_id: number;
  sender_id: number;
  profile_picture: string;
  sender_username: string;
};

export default function SendMessage() {
  const { recepientIDNumber, showMessage, setShowMessage } =
    useContext(MainContext);

  const [message, setMessage] = useState('');
  const [recepientMessage, setRecepientMessage] = useState<MessageType[]>([]);

  const getMessageRecepient = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/message-fetch.php`, {
        params: {
          sender_id: Number(localStorage.getItem('ordering-token')),
          receiver_id: recepientIDNumber,
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
        receiver_id: recepientIDNumber,
        message_context: message,
      })
      .then((res) => {
        console.log(res.data, 'message sent');
        getMessageRecepient();
        setMessage('');
      });
  };
  const userId = Number(localStorage.getItem('ordering-token'));

  return (
    <div className="bg-white h-[30rem] w-[30rem] border-2 border-[#5D383A] bottom-0 fixed right-10 p-4 rounded-lg">
      <div className="flex items-center justify-between border-b-2 p-2">
        {recepientMessage
          .map((res, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <img
                  className="w-[6rem] h-[6rem] rounded-full object-cover"
                  src={res.profile_picture ? res.profile_picture : Cake}
                  alt=""
                />
                <h1 className="font-bold">{res.sender_username}</h1>
              </div>
            );
          })
          .slice(0, 1)}

        <Button onClick={() => setShowMessage(false)} className="bg-[#5D383A]">
          Close
        </Button>
      </div>
      <div className="overflow-x-auto h-[17rem]">
        {recepientMessage.map((res, index) => {
          return (
            <div
              key={index}
              className={`border-2 p-2 mt-[1rem] rounded-sm  ${
                Number(res.sender_id) === Number(userId)
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
            onChange={(e) => setMessage(e.target.value)}
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
