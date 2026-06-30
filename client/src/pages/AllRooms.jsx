import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import HotelCard from "../components/HotelCard";
import StarRating from "../components/StarRating";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite",
];

const priceRanges = [
    "0-100",
    "100-200",
    "200-300",
    "300-500",
    "500-1000",
];

const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
];

const AllRooms = () => {
    const { rooms, currency, navigate } = useAppContext();

    const [searchParams] = useSearchParams();

    const destination =
        searchParams.get("destination")?.toLowerCase() || "";

    const [selectedFilters, setSelectedFilters] = useState({
        roomTypes: [],
        priceRanges: [],
    });

    const [selectedSort, setSelectedSort] = useState("");

    const handleRoomType = (type) => {
        setSelectedFilters((prev) => ({
            ...prev,
            roomTypes: prev.roomTypes.includes(type)
                ? prev.roomTypes.filter((item) => item !== type)
                : [...prev.roomTypes, type],
        }));
    };

    const handlePriceRange = (range) => {
        setSelectedFilters((prev) => ({
            ...prev,
            priceRanges: prev.priceRanges.includes(range)
                ? prev.priceRanges.filter((item) => item !== range)
                : [...prev.priceRanges, range],
        }));
    };

    const clearFilters = () => {
        setSelectedFilters({
            roomTypes: [],
            priceRanges: [],
        });

        setSelectedSort("");
    };

    const filteredRooms = useMemo(() => {
        let filtered = [...rooms];

        // Destination Filter
        if (destination) {
            filtered = filtered.filter((room) =>
                room.hotel.city.toLowerCase().includes(destination)
            );
        }

        // Room Type Filter
        if (selectedFilters.roomTypes.length > 0) {
            filtered = filtered.filter((room) =>
                selectedFilters.roomTypes.includes(room.roomType)
            );
        }

        // Price Filter
        if (selectedFilters.priceRanges.length > 0) {
            filtered = filtered.filter((room) => {
                return selectedFilters.priceRanges.some((range) => {
                    const [min, max] = range.split("-").map(Number);

                    return (
                        room.pricePerNight >= min &&
                        room.pricePerNight <= max
                    );
                });
            });
        }

        // Sorting
        if (selectedSort === "Price: Low to High") {
            filtered.sort(
                (a, b) => a.pricePerNight - b.pricePerNight
            );
        }

        if (selectedSort === "Price: High to Low") {
            filtered.sort(
                (a, b) => b.pricePerNight - a.pricePerNight
            );
        }

        return filtered;
    }, [rooms, destination, selectedFilters, selectedSort]);

    return (
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar */}
                <aside className="w-full lg:w-72 bg-white border rounded-xl p-5 h-fit shadow-sm">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-semibold">
                            Filters
                        </h2>

                        <button
                            onClick={clearFilters}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Room Types */}

                    <div className="mb-8">
                        <h3 className="font-medium mb-3">
                            Room Type
                        </h3>

                        <div className="space-y-2">

                            {roomTypes.map((type) => (
                                <label
                                    key={type}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.roomTypes.includes(type)}
                                        onChange={() => handleRoomType(type)}
                                    />

                                    <span>{type}</span>
                                </label>
                            ))}

                        </div>
                    </div>

                    {/* Price */}

                    <div>
                        <h3 className="font-medium mb-3">
                            Price Range
                        </h3>

                        <div className="space-y-2">

                            {priceRanges.map((range) => (

                                <label
                                    key={range}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.priceRanges.includes(range)}
                                        onChange={() => handlePriceRange(range)}
                                    />

                                    <span>
                                        {currency}
                                        {range.replace("-", " - ")}
                                    </span>

                                </label>

                            ))}

                        </div>

                    </div>

                </aside>

                {/* Rooms */}

                <div className="flex-1">

                    {/* Heading */}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                        <div>

                            <h1 className="text-3xl font-playfair">
                                Available Rooms
                            </h1>

                            <p className="text-gray-500 mt-1">
                                {filteredRooms.length} rooms found
                            </p>

                        </div>

                        {/* Sort */}

                        <select
                            value={selectedSort}
                            onChange={(e) =>
                                setSelectedSort(e.target.value)
                            }
                            className="border rounded-lg px-4 py-2 outline-none"
                        >
                            <option value="">
                                Sort By
                            </option>

                            {sortOptions.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}

                        </select>

                    </div>

                    {/* Room List */}

                    {filteredRooms.length === 0 ? (

                        <div className="text-center py-20">

                            <h2 className="text-2xl font-semibold">
                                No Rooms Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Try changing your filters.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {filteredRooms.map((room, index) => (

                                <HotelCard
                                    key={room._id}
                                    room={room}
                                    index={index}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </div>
    );

};

export default AllRooms;