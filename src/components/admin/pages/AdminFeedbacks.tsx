import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import CustomerReviews from '@/components/components/CustomerReviews';

type FeedbackProduct = {
  product_id: number;
  product_name: string;
  total_feedback: number;
  feedback_id: number;
  product_image: string;
};

type FeedbackResponse = {
  created_at: string;
  feedback_description: string;
  feedback_rating: number;
  name: string;
  profile_picture: string;
  product_name: string;
  user_id: number;
  feedback_id: number;
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

export default function AdminFeedbacks() {
  const [feedbackProduct, setFeedbackProduct] = useState<FeedbackProduct[]>([]);
  const [feedbackResponses, setFeedbackResponses] = useState<
    FeedbackResponse[]
  >([]);

  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [replyComment, setReplyComment] = useState<string>('');
  const [storeReplies, setStoreReplies] = useState<Replies[]>([]);
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const navigate = useNavigate();
  const getFeedback = async () => {
    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/feedback-admin.php`)
      .then((res) => {
        console.log(res.data);
        setFeedbackProduct(res.data);
      });
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const handleFetchFeedback = (id: number) => async () => {
    // setReplyTo(user_id);

    axios
      .get(
        `${
          import.meta.env.VITE_ORDERING_LOCAL_HOST
        }/feedback-admin.php?product_id=${id}`,
      )
      .then((res) => {
        console.log(res.data);
        // console.log(user_id);
        setFeedbackResponses(res.data);
        // navigate(`/admin/feedback/${id}`, { state: res.data });
      });

    fetchFeedbacks(id);
    getReplies();
  };

  const getReplies = async () => {
    await axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/reply.php`)
      .then((res) => {
        console.log(res.data, 'replies');
        setStoreReplies(res.data);
      });
  };

  const user_id = localStorage.getItem('ordering-token');

  // console.log(localStorage.getItem('ordering-token'));

  const handleReplyComment = (reply_to: number, feedback_id: number) => {
    axios
      .post(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/reply.php`, {
        content: replyComment,
        reply_to: reply_to,
        feedback_id: feedback_id,
        user_id: user_id && user_id.length > 0 ? user_id : 0,
      })
      .then((res) => {
        console.log(res.data);
        getFeedback();
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

  const fetchFeedbacks = (product_id: number) => {
    axios
      .get(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/feedback.php`, {
        params: {
          product_id: product_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'feedbacks');
        setFeedbacks(res.data);
      });
  };

  return (
    <div className="flex justify-center items-center w-full flex-col p-4 bg-slate-50 ">
      <div className="flex justify-between w-full h-[5rem] items-center">
        <Button className="bg-[#5d383a]" onClick={() => navigate(-1)}>
          Go Back
        </Button>

        <h1 className="font-bold text-2xl">Feedback</h1>
      </div>

      <div className="flex w-full justify-between gap-4 mt-[5rem]">
        <div className="w-[25rem] grid place-content-start">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 bg-white"
            placeholder="Search "
          />
          <Table className="border-2 w-full bg-white">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Feedbacks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackProduct
                .filter((feedback) => feedback.product_name.includes(search))
                .map((feedback, index) => {
                  return (
                    <TableRow
                      onClick={handleFetchFeedback(feedback.product_id)}
                      className="cursor-pointer"
                      key={index}
                    >
                      <TableCell>
                        <img
                          className="w-[2rem] h-[2rem] object-cover rounded-sm"
                          src={feedback.product_image}
                          alt={feedback.product_name}
                        />
                      </TableCell>

                      <TableCell>{feedback.product_name}</TableCell>
                      <TableCell>{feedback.total_feedback}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>

        <div className="w-[100%] border-2 p-4 rounded-md bg-white">
          <div className="flex">
            <CustomerReviews feedbacks={feedbacks} />
            {/* <div>card card</div> */}
          </div>

          {feedbackResponses.length > 0 ? (
            feedbackResponses.map((feedback, index) => {
              return (
                <div
                  className="mb-[1rem] w-full border-2 p-2 rounded-md"
                  key={index}
                >
                  {feedback.feedback_rating == null ? (
                    <div className="flex justify-center items-center h-[20rem]">
                      <h1 className="text-2xl">No feedback yet</h1>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-[2rem] h-[2rem] rounded-full object-cover bg-[#5d383a]"
                            src={feedback.profile_picture}
                            alt="profile"
                          />
                          <div className="flex flex-col">
                            <h1 className="text-sm">{feedback.name}</h1>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }, (_, i) => i).map(
                                (number) => {
                                  const untilWhatNumber =
                                    feedback.feedback_rating;
                                  return (
                                    <svg
                                      key={number}
                                      className="w-3 h-3 text-yellow-300 mr-1"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill={
                                        number == untilWhatNumber
                                          ? 'gray'
                                          : 'currentColor'
                                      }
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleShowReplyInput(index, index)}
                          className="self-end bg-[#5d383a]"
                        >
                          {showReplyInput && inputIndex === index
                            ? 'Close Reply'
                            : 'Show Reply'}
                        </Button>
                      </div>
                      <p className="text-start mt-2 border-2 p-2 rounded-md min-h-[4rem] bg-gray-200 text-sm">
                        {feedback.feedback_description}
                      </p>

                      {showReplyInput && inputIndex === index && (
                        <div className="text-end mt-[1rem] w-full">
                          {storeReplies.map(
                            (reply, index) =>
                              reply.feedback_id == feedback.feedback_id && (
                                <div
                                  className={`ml-[2rem] text-start p-2 rounded-md min-h-[2rem]`}
                                  key={index}
                                >
                                  <div className="flex items-center gap-4">
                                    <img
                                      className="w-[2rem] h-[2rem] rounded-full object-cover bg-[#5d383a]"
                                      src={reply.profile_picture}
                                      alt="profile"
                                    />
                                    <h1>
                                      {reply.user_type === 'admin'
                                        ? 'Admin'
                                        : reply.name}
                                    </h1>
                                  </div>

                                  <p className="text-start mt-2 border-2 p-2 rounded-md min-h-[2rem] text-sm bg-gray-200">
                                    {reply.content}
                                  </p>
                                </div>
                              ),
                          )}

                          <div className="mt-[1rem] flex flex-col">
                            <Button
                              onClick={() =>
                                setReplyComment('Thanks for your feedback!')
                              }
                              className="self-start mb-2 bg-[#5d383a]"
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
                              className="mt-[1rem] w-[10rem] self-end bg-[#5d383a]"
                            >
                              Send
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-[20rem]">
              <h1 className="text-2xl">Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
