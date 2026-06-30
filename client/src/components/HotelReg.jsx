import React, { useState } from "react";
import toast from "react-hot-toast";

import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const HotelReg = () => {
    const {
        setShowHotelReg,
        axios,
        getToken,
        setIsOwner,
    } = useAppContext();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [city, setCity] = useState("");

    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const token = await getToken();
            console.log(token);

            const { data } = await axios.post(
                "/api/hotels",
                {
                    name,
                    address,
                    contact,
                    city,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);

                setIsOwner(true);
                setShowHotelReg(false);

                setName("");
                setAddress("");
                setContact("");
                setCity("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={() => setShowHotelReg(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="flex bg-white rounded-xl overflow-hidden max-w-4xl w-full mx-4"
            >
                <img
                    src={assets.regImage}
                    alt="Register Hotel"
                    className="hidden md:block w-1/2 object-cover"
                />

                <div className="relative flex flex-col md:w-1/2 p-8 md:p-10">
                    <img
                        src={assets.closeIcon}
                        alt="Close"
                        className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
                        onClick={() => setShowHotelReg(false)}
                    />

                    <h2 className="text-2xl font-semibold mt-2">
                        Register Your Hotel
                    </h2>

                    {/* Hotel Name */}

                    <div className="mt-5">
                        <label
                            htmlFor="name"
                            className="text-gray-600 font-medium"
                        >
                            Hotel Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter Hotel Name"
                            className="w-full mt-2 border border-gray-300 rounded px-3 py-2 outline-indigo-500"
                        />
                    </div>

                    {/* Phone */}

                    <div className="mt-5">
                        <label
                            htmlFor="contact"
                            className="text-gray-600 font-medium"
                        >
                            Phone
                        </label>

                        <input
                            id="contact"
                            type="text"
                            required
                            value={contact}
                            onChange={(e) =>
                                setContact(e.target.value)
                            }
                            placeholder="Enter Phone Number"
                            className="w-full mt-2 border border-gray-300 rounded px-3 py-2 outline-indigo-500"
                        />
                    </div>

                    {/* Address */}

                    <div className="mt-5">
                        <label
                            htmlFor="address"
                            className="text-gray-600 font-medium"
                        >
                            Hotel Address
                        </label>

                        <input
                            id="address"
                            type="text"
                            required
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            placeholder="Enter Address"
                            className="w-full mt-2 border border-gray-300 rounded px-3 py-2 outline-indigo-500"
                        />
                    </div>

                    {/* City */}

                    <div className="mt-5 max-w-xs">
                        <label
                            htmlFor="city"
                            className="text-gray-600 font-medium"
                        >
                            City
                        </label>

                        <select
                            id="city"
                            required
                            value={city}
                            onChange={(e) =>
                                setCity(e.target.value)
                            }
                            className="w-full mt-2 border border-gray-300 rounded px-3 py-2 outline-indigo-500"
                        >
                            <option value="">
                                Select City
                            </option>

                            {cities.map((city) => (
                                <option
                                    key={city}
                                    value={city}
                                >
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded transition"
                    >
                        {loading
                            ? "Registering..."
                            : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HotelReg;