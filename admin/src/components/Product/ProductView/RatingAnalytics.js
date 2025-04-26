import React from "react";

function RatingAnalytics({ reviews = [], rating = 0 }) {
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[Math.floor(review.rating) - 1]++;
    }
  });
  const totalReviews = reviews.length;

  return (
    <>
      <div className="flex items-center py-3">
        <h1 className="text-[16px] font-semibold opacity-80">
          Rating Analytics
        </h1>
        <hr className="flex-grow border-gray-700 ml-4" />
      </div>
      <div className="lg:flex justify-center items-center mb-6 gap-[100px]">
        <div className="md:w-12/12">
          {[5, 4, 3, 2, 1].map((star) => (
            <div
              key={star}
              className="flex items-center mb-2 gap-3 justify-center"
            >
              <span className="text-[15px] tracking-[.3px] whitespace-nowrap capitalize opacity-55">
                {star} Star
              </span>
              <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden mx-2">
                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: totalReviews
                      ? `${(ratingCounts[5 - star] / totalReviews) * 100}%`
                      : "0%",
                  }}
                ></div>
              </div>
              <span>({ratingCounts[5 - star]})</span>
            </div>
          ))}
        </div>
        <div className="text-center md:w-12/12">
          <div className="text-xl mb-5 font-medium capitalize opacity-55">
            Total review ({totalReviews})
          </div>
          <div className="text-[80px] font-extrabold tracking-[-1px] leading-[60px] mb-5 opacity-80">
            {rating.toFixed(1)}
          </div>
          <div className="flex justify-center items-center mt-2 gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`material-icons text-yellow-500 ${
                  star <= Math.round(rating)
                    ? "star"
                    : star - 0.5 <= rating
                    ? "star_half"
                    : "star_border"
                }`}
              >
                star
              </i>
            ))}
          </div>
          <div className="mt-2 text-[16px] capitalize opacity-55">
            Your Average Rating Star
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingAnalytics;
