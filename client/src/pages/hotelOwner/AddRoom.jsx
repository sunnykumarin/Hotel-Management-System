import React, { useState } from "react";
import toast from "react-hot-toast";

import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill in all the details.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );

      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        }
      });

      const token = await getToken();

      const { data } = await axios.post("/api/rooms", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);

        setInputs({
          roomType: "",
          pricePerNight: "",
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });

        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
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
    <form onSubmit={onSubmitHandler}>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully to improve the booking experience."
      />

      {/* Images */}

      <p className="text-gray-800 mt-10">Images</p>

      <div className="grid grid-cols-2 sm:flex gap-4 flex-wrap my-2">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`roomImage${key}`}>
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt="Upload"
              className="w-20 h-20 object-cover rounded cursor-pointer border"
            />

            <input
              hidden
              id={`roomImage${key}`}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImages({
                  ...images,
                  [key]: e.target.files[0],
                })
              }
            />
          </label>
        ))}
      </div>

      {/* Room Type + Price */}

      <div className="flex flex-col sm:flex-row gap-6 mt-6">

        <div className="max-w-xs flex-1">
          <p className="text-gray-800 mb-2">
            Room Type
          </p>

          <select
            value={inputs.roomType}
            onChange={(e) =>
              setInputs({
                ...inputs,
                roomType: e.target.value,
              })
            }
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">
              Select Room Type
            </option>

            <option value="Single Bed">
              Single Bed
            </option>

            <option value="Double Bed">
              Double Bed
            </option>

            <option value="Luxury Room">
              Luxury Room
            </option>

            <option value="Family Suite">
              Family Suite
            </option>
          </select>
        </div>

        <div>
          <p className="text-gray-800 mb-2">
            Price / Night
          </p>

          <input
            type="number"
            placeholder="0"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({
                ...inputs,
                pricePerNight: e.target.value,
              })
            }
            className="border border-gray-300 rounded p-2 w-32"
          />
        </div>

      </div>

      {/* Amenities */}

      <p className="text-gray-800 mt-8 mb-2">
        Amenities
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-lg">
        {Object.keys(inputs.amenities).map(
          (amenity, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={
                  inputs.amenities[amenity]
                }
                onChange={() =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]:
                        !inputs.amenities[
                          amenity
                        ],
                    },
                  })
                }
              />

              <span>{amenity}</span>
            </label>
          )
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 bg-primary text-white px-8 py-2 rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;