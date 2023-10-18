import Profile from '@/assets/trav.png';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type Feedback = {
  email: string;
  feedback_description: string;
  feedback_id: number;
  feedback_rating: number;
  name: string;
  profile_picture: string;
  feedback_date: string;
  user_id: number;
};

type Replies = {
  content: string;
  created_at: string;
  name: string;
  profile_picture: string;
  reply_to: number;
  user_id: number;
  feedback_id: number;
  user_type: string;
};

export default function Feedbacks() {
  // console.log(order_id);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const order_id = searchParams.get('orderid');
  const user_id = localStorage.getItem('ordering-token');
  const product_id = useParams();
  const navigate = useNavigate();

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [feedBackDescription, setFeedBackDescription] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [rating, setRating] = useState(0);

  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [replyComment, setReplyComment] = useState<string>('');
  const [storeReplies, setStoreReplies] = useState<Replies[]>([]);
  const [inputIndex, setInputIndex] = useState<number>(0);

  const checkIfOrderIdExistToUserId = () => {
    if (user_id === null) {
      setDisabledButton(true);
    }

    axios
      .get('http://localhost/ordering/orders.php', {
        params: {
          order_id: order_id,
          user_id: user_id,
          product_id: product_id.id,
        },
      })
      .then((res) => {
        // setDisabledButton(true);
        if (res.data.length === 0) {
          setDisabledButton(true);
        }
        console.log(res.data, 'check if order id exist to user id');
      });
  };

  const fetchFeedbacks = () => {
    axios
      .get('http://localhost/ordering/feedback.php', {
        params: {
          product_id: product_id.id,
        },
      })
      .then((res) => {
        console.log(res.data, 'feedbacks');
        setFeedbacks(res.data);
      });
  };

  useEffect(() => {
    checkIfOrderIdExistToUserId();
    fetchFeedbacks();
    getReplies();
  }, []);

  const handleFeedbackSubmition = () => {
    axios
      .post('http://localhost/ordering/feedback.php', {
        feedback_rating: rating,
        feedback_description: feedBackDescription,
        user_id: user_id,
        product_id: product_id.id,
      })
      .then((res) => {
        console.log(res.data, 'feedbacks');
        setShowFeedbackForm(false);
        window.location.reload();
      });
  };

  const handleClick = (number: number) => {
    console.log(number + 1);

    setRating(number + 1);

    setSelectedRating(number);
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Set the feedback description state.
    setFeedBackDescription(e.target.value);

    // Focus the textarea.
    textareaRef.current?.focus();
  };

  const getReplies = async () => {
    await axios.get('http://localhost/ordering/reply.php').then((res) => {
      console.log(res.data, 'replies');
      setStoreReplies(res.data);
    });
  };

  const handleReplyComment = (reply_to: number, feedback_id: number) => {
    axios
      .post('http://localhost/ordering/reply.php', {
        content: replyComment,
        reply_to: reply_to,
        feedback_id: feedback_id,
        user_id: user_id && user_id.length > 0 ? user_id : 0,
      })
      .then((res) => {
        console.log(res.data);

        getReplies();
        setReplyComment('');
      });
  };

  const handleShowReplyInput = (index: number, selectedIndex: number) => {
    console.log(index, selectedIndex);

    if (index == selectedIndex) {
      setInputIndex(selectedIndex);
      setShowReplyInput(!showReplyInput);
    }
  };

  return (
    <div className="flex justify-between p-4 h-fit mt-[5rem]">
      <div className="w-[35rem] text-start p-4">
        <h1 className="font-bold text-2xl mb-2">Customer Reviews</h1>
        <div className="flex items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => i).map((number) => {
              const untilWhatNumber = Math.floor(
                feedbacks
                  .map((feedback) => feedback.feedback_rating)
                  .reduce((a, b) => a + b, 0) / feedbacks.length,
              );

              return (
                <svg
                  key={number}
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={number == untilWhatNumber ? 'gray' : 'currentColor'}
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              );
            })}
          </div>
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Based on {Math.ceil(feedbacks.length)}
            {''} reviews
          </p>
        </div>

        <div>
          {Array.from({ length: 5 }, (_, i) => i + 1)
            .reverse()
            .map((number) => {
              return (
                <div key={number} className="flex items-center mt-4">
                  <span className="flex items-center gap-1 text-md">
                    <a href="#">{number}</a>
                    <svg
                      className="w-4 h-3 text-yellow-300 mr-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </span>

                  <div className="w-full h-3.5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      style={{
                        backgroundClip: 'content-box',
                        width: `${
                          (feedbacks.filter(
                            (feedb) => feedb.feedback_rating === number,
                          ).length /
                            feedbacks.length) *
                          100
                        }%`,
                      }}
                      className={`h-full rounded ${
                        feedbacks.filter(
                          (feedb) => feedb.feedback_rating === number,
                        ).length === 0
                          ? 'bg-gray-200'
                          : 'bg-green-700'
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[5rem]">
                    {feedbacks.filter(
                      (feedb) => feedb.feedback_rating === number,
                    ).length === 0
                      ? 0
                      : Math.ceil(
                          (feedbacks.filter(
                            (feedb) => feedb.feedback_rating === number,
                          ).length /
                            feedbacks.length) *
                            100,
                        )}
                    %
                    <span className="ml-2 text-green-700">
                      (
                      {
                        feedbacks.filter(
                          (feedb) => feedb.feedback_rating === number,
                        ).length
                      }
                      )
                    </span>
                  </span>
                </div>
              );
            })}
        </div>

        <div className="mt-[5rem]">
          <h1 className="font-bold text-2xl mb-2">Share your thoughts</h1>
          <p>
            If you have ordered or used this product, share you thoughts with
            other customers
          </p>

          <Button
            onClick={() => setShowFeedbackForm(true)}
            className="block mt-[2rem] mx-auto bg-green-700"
            disabled={disabledButton}
          >
            Write a review
          </Button>
        </div>
      </div>

      <div className="w-[50%]">
        {feedbacks.map((feedback, index) => {
          return (
            <div className="mb-[1rem]" key={index}>
              <div className="flex items-center gap-4">
                <img
                  className="w-[5rem] h-[5rem] rounded-full object-cover bg-green-700"
                  src={feedback.profile_picture}
                  alt="profile"
                />
                <div className="flex flex-col">
                  <h1>{feedback.name}</h1>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => i).map((number) => {
                      const untilWhatNumber = feedback.feedback_rating;
                      return (
                        <svg
                          key={number}
                          className="w-4 h-4 text-yellow-300 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            number == untilWhatNumber ? 'gray' : 'currentColor'
                          }
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="text-start mt-2">{feedback.feedback_description}</p>

              <div className="text-end mt-[1rem] w-full">
                {storeReplies.map(
                  (reply, index) =>
                    reply.feedback_id == feedback.feedback_id && (
                      <div
                        className={`ml-[2rem] text-start p-2 rounded-md min-h-[5rem]`}
                        key={index}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            className="w-[5rem] h-[5rem] rounded-full object-cover bg-green-700"
                            src={reply.profile_picture}
                            alt="profile"
                          />
                          <h1>
                            {reply.user_type === 'admin' ? 'Admin' : reply.name}
                          </h1>
                        </div>

                        <p className="text-start mt-2 border-2 p-2 rounded-md min-h-[5rem]">
                          {reply.content}
                        </p>
                      </div>
                    ),
                )}

                <Button
                  onClick={() => handleShowReplyInput(index, index)}
                  className="bg-green-700"
                >
                  {showReplyInput && inputIndex === index ? 'Cancel' : 'Reply'}
                </Button>

                {showReplyInput && inputIndex === index && (
                  <div className="mt-[1rem] flex flex-col">
                    <Button
                      onClick={() =>
                        setReplyComment('Thanks for your feedback!')
                      }
                      className="self-start bg-green-700 mb-2"
                    >
                      Thanks template
                    </Button>
                    <Textarea
                      value={replyComment}
                      // defaultValue={replyComment}
                      onChange={(e) => setReplyComment(e.target.value)}
                      placeholder="reply here"
                    ></Textarea>

                    <Button
                      onClick={() =>
                        handleReplyComment(
                          feedback.user_id,
                          feedback.feedback_id,
                        )
                      }
                      className="bg-green-700 mt-[1rem] w-[10rem] self-end"
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showFeedbackForm && (
        <div className="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center">
          <div className="w-[35rem] border-2 bg-white p-4 rounded-lg">
            <h1 className="font-bold mb-[5rem] text-2xl">Feedback Form</h1>
            <div className="text-center">
              <span>how would you rate our product?</span>
              <div className="flex mb-[2rem] w-full justify-center">
                {Array.from({ length: 5 }, (_, i) => i).map((number) => {
                  const isSelected = selectedRating === number;
                  return (
                    <Button
                      onClick={() => handleClick(number)}
                      key={number}
                      className={`${
                        isSelected
                          ? 'bg-green-700 text-white'
                          : 'bg-white text-green-700'
                      } ' mr-2 my-2 hover:bg-green-700 hover:text-white`}
                    >
                      {number + 1} ⭐
                    </Button>
                  );
                })}
              </div>
            </div>

            <Textarea
              id="feedback"
              value={feedBackDescription}
              onChange={handleChange}
              placeholder="please write down your feedback here"
              className="h-[10rem]"
            ></Textarea>

            <div className="flex mt-[3rem] gap-2 justify-center">
              <Button
                onClick={() => setShowFeedbackForm(false)}
                className="block bg-red-700"
              >
                cancel
              </Button>

              <Button
                onClick={handleFeedbackSubmition}
                className=" bg-green-700"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
