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

type FeedbackProduct = {
  product_id: number;
  product_name: string;
  total_feedback: number;
  feedback_id: number;
};

type FeedbackResponse = {
  created_at: string;
  feedback_description: string;
  feedback_rating: number;
  name: string;
  profile_picture: string;
  product_name: string;
};
export default function Feedback() {
  const [feedbackProduct, setFeedbackProduct] = useState<FeedbackProduct[]>([]);
  const [feedbackResponses, setFeedbackResponses] = useState<
    FeedbackResponse[]
  >([]); // [
  const navigate = useNavigate();
  const getFeedback = async () => {
    await axios
      .get('http://localhost/ordering/feedback-admin.php')
      .then((res) => {
        console.log(res.data);
        setFeedbackProduct(res.data);
      });
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const handleFetchFeedback = (id: number) => async () => {
    axios
      .get(`http://localhost/ordering/feedback-admin.php?product_id=${id}`)
      .then((res) => {
        console.log(res.data);
        setFeedbackResponses(res.data);
        // navigate(`/admin/feedback/${id}`, { state: res.data });
      });
  };

  return (
    <div className="flex justify-center items-center w-full flex-col p-4">
      <div className="flex justify-between w-full h-[5rem] items-center">
        <Button onClick={() => navigate(-1)}>Go Back</Button>

        <h1 className="font-bold text-2xl">Feedback</h1>
      </div>
      <div className="flex w-full justify-between gap-4 mt-[5rem]">
        <div className="w-[25rem] grid place-content-start">
          <Table className="border-2 w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Feedbacks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackProduct.map((feedback, index) => {
                return (
                  <TableRow
                    onClick={handleFetchFeedback(feedback.product_id)}
                    className="cursor-pointer"
                    key={index}
                  >
                    <TableCell>{feedback.product_name}</TableCell>
                    <TableCell>{feedback.total_feedback}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="w-[100%] border-2 p-4">
          {feedbackResponses.map((feedback, index) => {
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
                              number == untilWhatNumber
                                ? 'gray'
                                : 'currentColor'
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

                <p className="text-start mt-2">
                  {feedback.feedback_description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
