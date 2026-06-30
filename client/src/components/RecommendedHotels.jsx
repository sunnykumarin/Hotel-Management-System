import { useMemo } from "react";

import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();

  const recommended = useMemo(() => {
    return rooms.filter((room) =>
      searchedCities.includes(room.hotel.city)
    );
  }, [rooms, searchedCities]);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      <div className="flex flex-wrap justify-center gap-6 mt-20">
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard
            key={room._id}
            room={room}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedHotels;