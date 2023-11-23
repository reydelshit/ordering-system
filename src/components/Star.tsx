import axios from 'axios';
import { useEffect, useState } from 'react';

type Feedback = {
  email: string;
  feedback_description: string;
  feedback_id: number;
  feedback_rating: number;
  name: string;
  profile_picture: string;
  feedback_date: string;
};

export default function Star({
  product_id,
  index,
}: {
  product_id: number;
  index: number;
}) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = () => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/feedback.php`, {
        params: {
          product_id: product_id,
        },
      })
      .then((res) => {
        // console.log(res.data, 'feedbacks');
        setFeedbacks(res.data);
      });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <>
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => i).map((number) => {
          const untilWhatNumber = Math.floor(
            feedbacks
              .map((feedback) => feedback.feedback_rating)
              .reduce((a, b) => a + b, 0) / feedbacks.length,
          );

          if (isNaN(untilWhatNumber))
            return (
              <svg
                key={number}
                className="w-4 h-4 mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill={'gray'}
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            );
          return (
            <svg
              key={number}
              className="w-4 h-4 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill={number == untilWhatNumber ? 'gray' : 'yellow'}
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          );
        })}
      </div>
    </>
  );
}
