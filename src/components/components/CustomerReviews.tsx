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

export default function CustomerReviews({
  feedbacks,
}: {
  feedbacks: Feedback[];
}) {
  return (
    <div className="w-full text-start p-4 mb-[2rem]">
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
                          (feedb) => Number(feedb.feedback_rating) === Number(number),
                        ).length /
                          feedbacks.length) *
                        100
                      }%`,
                    }}
                    className={`h-full rounded ${
                      feedbacks.filter(
                        (feedb) => Number(feedb.feedback_rating) === Number(number),
                      ).length === 0
                        ? 'bg-gray-200'
                        : 'bg-[#5d383a]'
                    }`}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-[5rem]">
                  {feedbacks.filter((feedb) => feedb.feedback_rating === number)
                    .length === 0
                    ? 0
                    : Math.ceil(
                        (feedbacks.filter(
                          (feedb) => Number(feedb.feedback_rating) === Number(number),
                        ).length /
                          feedbacks.length) *
                          100,
                      )}
                  %
                  <span className="ml-2 text-[#5d383a]">
                    (
                    {
                      feedbacks.filter(
                        (feedb) => Number(feedb.feedback_rating) === Number(number),
                      ).length
                    }
                    )
                  </span>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
