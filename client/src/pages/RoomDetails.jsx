import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { assets, roomCommonData, facilityIcons } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";

const RoomDetails = () => {
    const { id } = useParams();

    const {
        rooms,
        axios,
        getToken,
        navigate,
        currency,
    } = useAppContext();

    const room = useMemo(() => {
        return rooms.find((item) => item._id === id);
    }, [rooms, id]);

    const [mainImage, setMainImage] = useState("");

    const [checkInDate, setCheckInDate] = useState("");

    const [checkOutDate, setCheckOutDate] = useState("");

    const [guests, setGuests] = useState(1);

    const [isAvailable, setIsAvailable] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (room) {
            setMainImage(room.images[0]);
        }
    }, [room]);

    useEffect(() => {
        setIsAvailable(false);
    }, [checkInDate, checkOutDate]);

    if (!room) {
        return (
            <div className="py-40 text-center text-xl">
                Loading room...
            </div>
        );
    }

    // Check Room Availability

    const checkAvailability = async () => {
        try {
            if (!checkInDate || !checkOutDate) {
                toast.error("Please select both dates.");
                return;
            }

            if (
                new Date(checkInDate) >=
                new Date(checkOutDate)
            ) {
                toast.error(
                    "Check-out date must be after check-in."
                );
                return;
            }

            const { data } = await axios.post(
                "/api/bookings/check-availability",
                {
                    room: id,
                    checkInDate,
                    checkOutDate,
                }
            );

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            if (data.isAvailable) {
                setIsAvailable(true);
                toast.success("Room is available.");
            } else {
                setIsAvailable(false);
                toast.error("Room is not available.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message
            );
        }
    };

    // Book Room

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!isAvailable) {
            return checkAvailability();
        }

        try {
            setLoading(true);

            const token = await getToken();

            const { data } = await axios.post(
                "/api/bookings/book",
                {
                    room: id,
                    checkInDate,
                    checkOutDate,
                    guests,
                    paymentMethod: "Pay At Hotel",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);

            navigate("/my-bookings");

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
            {/* Room Details */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-playfair">
                    {room.hotel.name}
                    <span className="text-sm font-inter ml-2">
                        ({room.roomType})
                    </span>
                </h1>

                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded">
                    20% OFF
                </span>
            </div>

            {/* Rating */}

            <div className="flex items-center gap-2 mt-3">
                <StarRating rating={room.rating || 4.5} />
                <p>200+ Reviews</p>
            </div>

            {/* Address */}

            <div className="flex items-center gap-2 mt-2 text-gray-500">
                <img
                    src={assets.locationIcon}
                    alt="Location"
                />

                <span>{room.hotel.address}</span>
            </div>

            {/* Images */}

            <div className="flex flex-col lg:flex-row gap-6 mt-8">
                <div className="lg:w-1/2">
                    <img
                        src={mainImage}
                        alt={`${room.hotel.name} Room`}
                        className="w-full rounded-xl object-cover shadow-lg"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 lg:w-1/2">
                    {room.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${room.hotel.name}-${index + 1}`}
                            loading="lazy"
                            onClick={() => setMainImage(image)}
                            className={`rounded-xl cursor-pointer object-cover shadow-md transition
              ${mainImage === image
                                    ? "outline outline-4 outline-orange-500"
                                    : ""
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Amenities */}

            <div className="flex flex-col md:flex-row justify-between mt-12">

                <div>

                    <h2 className="text-3xl font-playfair">
                        Experience Luxury Like Never Before
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-5">

                        {room.amenities.map((item) => (

                            <div
                                key={item}
                                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                            >
                                <img
                                    src={facilityIcons[item]}
                                    alt={item}
                                    className="w-5"
                                />

                                <span className="text-sm">
                                    {item}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

                <h2 className="text-3xl font-semibold mt-6 md:mt-0">
                    {currency}
                    {room.pricePerNight}
                    <span className="text-lg font-normal">
                        /night
                    </span>
                </h2>

            </div>

            {/* Booking */}

            <form
                onSubmit={onSubmitHandler}
                className="mt-16 bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row justify-between gap-6"
            >

                <div className="flex flex-wrap gap-6">

                    <div>

                        <label>Check-In</label>

                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={checkInDate}
                            onChange={(e) =>
                                setCheckInDate(e.target.value)
                            }
                            className="border rounded px-3 py-2 mt-2"
                            required
                        />

                    </div>

                    <div>

                        <label>Check-Out</label>

                        <input
                            type="date"
                            value={checkOutDate}
                            min={checkInDate}
                            disabled={!checkInDate}
                            onChange={(e) =>
                                setCheckOutDate(e.target.value)
                            }
                            className="border rounded px-3 py-2 mt-2"
                            required
                        />

                    </div>

                    <div>

                        <label>Guests</label>

                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={guests}
                            onChange={(e) =>
                                setGuests(Number(e.target.value))
                            }
                            className="border rounded px-3 py-2 mt-2 w-20"
                            required
                        />

                    </div>

                </div>

                <button
                    disabled={loading}
                    className="bg-primary text-white rounded-md px-10 py-3 hover:bg-primary-dull disabled:opacity-60"
                >
                    {loading
                        ? "Processing..."
                        : isAvailable
                            ? "Book Now"
                            : "Check Availability"}
                </button>

            </form>

            {/* Specifications */}

            <div className="mt-24 space-y-5">

                {roomCommonData.map((spec) => (

                    <div
                        key={spec.title}
                        className="flex gap-3"
                    >
                        <img
                            src={spec.icon}
                            alt={spec.title}
                            className="w-6"
                        />

                        <div>
                            <p>{spec.title}</p>

                            <p className="text-gray-500">
                                {spec.description}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

            {/* Description */}

            <div className="border-y my-16 py-10 text-gray-500 max-w-3xl">

                <p>
                    Guests will be allocated according to
                    availability. Enjoy a luxury stay with
                    premium facilities and excellent
                    hospitality.
                </p>

            </div>

            {/* Host */}

            <div className="flex flex-col gap-5">

                <div className="flex gap-4">

                    <img
                        src={room.hotel.owner.image}
                        alt={room.hotel.name}
                        className="w-16 h-16 rounded-full"
                    />

                    <div>

                        <h3 className="text-xl">
                            Hosted by {room.hotel.name}
                        </h3>

                        <StarRating rating={4.5} />

                    </div>

                </div>

                <button className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dull">
                    Contact Now
                </button>

            </div>

        </div>
    );
};

export default RoomDetails;