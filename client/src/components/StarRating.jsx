import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={
            star <= rating
              ? assets.starIconFilled
              : assets.starIconOutlined
          }
          alt="star"
          className="w-4 h-4"
        />
      ))}
    </div>
  );
};

export default StarRating;