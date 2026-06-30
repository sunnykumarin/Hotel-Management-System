import Title from "./Title";
import HotelCard from "./HotelCard";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  if (!rooms.length) return null;

  const handleViewAll = () => {
    navigate("/rooms");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex flex-col items-center bg-slate-50 px-6 py-20 md:px-16 lg:px-24">
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      <div className="mt-20 flex flex-wrap justify-center gap-6">
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard
            key={room._id}
            room={room}
            index={index}
          />
        ))}
      </div>

      <button
        onClick={handleViewAll}
        className="my-16 rounded border border-gray-300 bg-white px-5 py-2 text-sm font-medium transition hover:bg-gray-100"
      >
        View All Destinations
      </button>
    </section>
  );
};

export default FeaturedDestination;