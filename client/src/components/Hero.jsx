import { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Hero = () => {
  const {
    navigate,
    getToken,
    axios,
    setSearchedCities,
  } = useAppContext();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const onSearch = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();

      // Save recent searched city only if user is logged in
      if (token && destination.trim()) {
        await axios.post(
          "/api/user/store-recent-search",
          {
            recentSearchedCity: destination,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Update local recent searched cities
      setSearchedCities((prev) => {
        const updated = prev.filter(
          (city) => city !== destination
        );

        updated.push(destination);

        return updated.slice(-3);
      });

      // Navigate to rooms page
      navigate(
        `/rooms?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/heroImage.jpg')] bg-cover bg-center bg-no-repeat h-screen"
    >
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
        The Ultimate Hotel Experience
      </p>

      <h1 className="font-playfair text-2xl md:text-[56px] md:leading-[60px] font-bold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>

      <p className="max-w-[520px] mt-3 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive hotels
        and resorts. Start your journey today.
      </p>

      <form
        onSubmit={onSearch}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row gap-4 max-md:w-full"
      >
        {/* Destination */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.locationIcon}
              alt="Destination"
              className="h-4"
            />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            id="destinationInput"
            list="destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Type here"
            className="rounded border border-gray-300 px-3 py-2 mt-2 text-sm outline-none"
            required
          />

          <datalist id="destinations">
            {cities.map((city) => (
              <option
                key={city}
                value={city}
              />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="Check In"
              className="h-4"
            />
            <label htmlFor="checkIn">Check In</label>
          </div>

          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="rounded border border-gray-300 px-3 py-2 mt-2 text-sm outline-none"
          />
        </div>

        {/* Check Out */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="Check Out"
              className="h-4"
            />
            <label htmlFor="checkOut">Check Out</label>
          </div>

          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split("T")[0]}
            className="rounded border border-gray-300 px-3 py-2 mt-2 text-sm outline-none"
          />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests">Guests</label>

          <input
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            min={1}
            max={10}
            className="rounded border border-gray-300 px-3 py-2 mt-2 text-sm outline-none w-20"
          />
        </div>

        {/* Search */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-md cursor-pointer hover:bg-gray-800 transition"
        >
          <img
            src={assets.searchIcon}
            alt="Search"
            className="h-5"
          />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;