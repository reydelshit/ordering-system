import axios from 'axios';
import { useEffect, useState } from 'react';

type Notification = {
  created_at: string;
  message: string;
  receiver_id: number;
  sender_id: number;
};
export default function Notification(id: { id: number }) {
  const [notification, setNotification] = useState<Notification[]>([]);
  const getNotification = () => {
    axios
      .get('http://localhost/ordering/message.php', {
        params: { receiver_id: id },
      })
      .then((res) => {
        console.log(res.data, 'notif');
        setNotification([res.data]);
      });
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div>
      <h1>You have {notification.length} notifications</h1>
      {notification.map((noti, index) => {
        return (
          <div className="border-2 p-2 mt-[1rem] rounded-sm" key={index}>
            <p>{noti.message}</p>
          </div>
        );
      })}
    </div>
  );
}
