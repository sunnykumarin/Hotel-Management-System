import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";

const ListRoom = () => {
  const { axios, getToken, user, currency } = useAppContext();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Rooms
  const fetchRooms = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/rooms/owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setRooms(data.rooms);
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

  // Toggle Availability
  const toggleAvailability = async (roomId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading rooms...
      </div>
    );
  }

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up to date to provide the best experience for users."
      />

      <p className="text-gray-500 mt-8 mb-3">
        All Rooms
      </p>

      {rooms.length === 0 ? (
        <div className="border rounded-lg p-10 text-center text-gray-500">
          No rooms found.
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg overflow-hidden max-w-5xl">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">
                    Room
                  </th>

                  <th className="py-3 px-4 text-left hidden md:table-cell">
                    Amenities
                  </th>

                  <th className="py-3 px-4 text-center">
                    Price / Night
                  </th>

                  <th className="py-3 px-4 text-center">
                    Available
                  </th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td className="border-t px-4 py-3">
                      {room.roomType}
                    </td>

                    <td className="border-t px-4 py-3 hidden md:table-cell">
                      {room.amenities.join(", ")}
                    </td>

                    <td className="border-t px-4 py-3 text-center">
                      {currency}
                      {room.pricePerNight}
                    </td>

                    <td className="border-t px-4 py-3">
                      <div className="flex justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={room.isAvailable}
                            onChange={() =>
                              toggleAvailability(room._id)
                            }
                          />

                          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>

                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListRoom;