import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import moment from 'moment';

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

export default function MessageNotification({
  userId,
  userDetails,
  templateMessage,
  isTemplateMessage,
  setIsTemplateMessage,
}: {
  userId: number;
  userDetails: User[];
  templateMessage: string;
  isTemplateMessage: boolean;
  setIsTemplateMessage: (e: boolean) => void;
}) {
  const [recepientMessage, setRecepientMessage] = useState<Notification[]>([]);
  const [message, setMessage] = useState<string>('');

  const getRecepientMessage = async () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/message.php`, {
        params: { receiver_id: userId },
      })
      .then((res) => {
        console.log(res.data, 'message');
        setRecepientMessage(res.data);
      });
  };

  const handleSendMessageNotification = () => {
    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/message.php`, {
        sender_id: localStorage.getItem('ordering-token'),
        receiver_id: userDetails[0].user_id,
        message_context: message,
      })
      .then(() => {
        getRecepientMessage();
        setMessage('');
      });
  };

  useEffect(() => {
    getRecepientMessage();
  }, []);

  return (
    <div className="flex flex-col bottom-2 justify-between items-center">
      <div className="h-[18rem] overflow-auto w-full flex flex-col gap-1 p-4">
        {recepientMessage.length > 0 ? (
          recepientMessage.map((noti, index) => (
            <div
              className="border-2 h-fit mt-[1rem] w-[100%] rounded-sm bg-gray-100 p-3 text-xs text-start !text-white"
              key={index}
            >
              <p>{noti.message_context}</p>
              <p className="mt-1">{moment(noti.created_at).format('LLLL')}</p>
            </div>
          ))
        ) : (
          <p>Loading or empty...</p>
        )}
      </div>
      <div className="flex items-center gap-4 mt-2 absolute bottom-2">
        <Textarea
          defaultValue={isTemplateMessage ? message : templateMessage}
          onChange={(e) => setMessage(e.target.value)}
          className="h-[4rem] w-[20rem]"
          placeholder="Send notification message"
        ></Textarea>
        <Button onClick={handleSendMessageNotification}>Send</Button>
      </div>
    </div>
  );
}
