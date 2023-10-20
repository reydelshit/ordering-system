import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import moment from 'moment';

type Notification = {
  created_at: string;
  message: string;
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
  const [notification, setNotification] = useState<Notification[]>([]);
  const [message, setMessage] = useState<string>('');

  const getNotification = async () => {
    try {
      const response = await axios.get(
        'http://localhost/ordering/notification.php',
        {
          params: { receiver_id: userId },
        },
      );
      // console.log(response.data, 'notif');

      if (response.data.length > 0) {
        setNotification(response.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      //   setDataFetched(false);
    }
  };

  const handleSendMessageNotification = () => {
    axios
      .post('http://localhost/ordering/notification.php', {
        sender_id: localStorage.getItem('ordering-token'),
        receiver_id: userDetails[0].user_id,
        message: message.length > 0 ? message : templateMessage,
      })
      .then(() => {
        getNotification();
        setMessage('');
      });
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="flex flex-col bottom-2 justify-between items-center">
      <div className="h-[18rem]  overflow-auto w-full flex flex-col gap-1 p-4">
        {notification.length > 0 ? (
          notification.map((noti, index) => (
            <div
              className="border-2 h-fit mt-[1rem] w-[100%] rounded-sm bg-gray-500 p-3 text-xs text-start !text-white"
              key={index}
            >
              <p>{noti.message}</p>
              <p className="mt-1">{moment(noti.created_at).format('LLLL')}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        B
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
