import React from "react";
import { Link } from "react-router-dom";

import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const HotelCard = ({ room, index }) => {
  const { currency } = useAppContext();

  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="relative max-w-70 w-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition duration-300"
    >
      <img
        src={room.images[0]}
        alt={`${room.hotel.name} Room`}
        className="w-full h-52 object-cover"
      />

      {index % 2 === 0 && (
        <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800">
          Best Seller
        </span>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-xl font-semibold text-gray-800">
            {room.hotel.name}
          </h2>

          <div className="flex items-center gap-1">
            <img
              src={assets.starIconFilled}
              alt="Rating"
            />
            <span>{room.rating || "4.5"}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <img
            src={assets.locationFilledIcon}
            alt="Location"
          />
          <span>{room.hotel.address}</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-gray-700">
            <span className="text-2xl font-semibold">
              {currency}
              {room.pricePerNight}
            </span>
            /night
          </p>

          <span className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(HotelCard);