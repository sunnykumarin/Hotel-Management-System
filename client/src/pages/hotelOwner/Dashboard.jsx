import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { currency, user, getToken, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/bookings/hotel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
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

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">

        <div className="bg-primary/5 border border-primary/10 rounded-lg flex items-center p-5">
          <img
            src={assets.totalBookingIcon}
            alt="Total Bookings"
            className="hidden sm:block h-10"
          />

          <div className="sm:ml-4">
            <p className="text-blue-600 font-medium">
              Total Bookings
            </p>

            <p className="text-2xl font-bold text-gray-700">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-lg flex items-center p-5">
          <img
            src={assets.totalRevenueIcon}
            alt="Total Revenue"
            className="hidden sm:block h-10"
          />

          <div className="sm:ml-4">
            <p className="text-blue-600 font-medium">
              Total Revenue
            </p>

            <p className="text-2xl font-bold text-gray-700">
              {currency}
              {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}

      <h2 className="text-xl font-semibold text-blue-950/80 mb-5">
        Recent Bookings
      </h2>

      {dashboardData.bookings.length === 0 ? (
        <div className="border rounded-lg p-10 text-center text-gray-500">
          No bookings yet.
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg overflow-hidden max-w-4xl">
          <div className="max-h-96 overflow-y-auto">

            <table className="w-full">

              <thead className="sticky top-0 bg-gray-50">

                <tr>
                  <th className="py-3 px-4 text-left">
                    User
                  </th>

                  <th className="py-3 px-4 text-left hidden sm:table-cell">
                    Room
                  </th>

                  <th className="py-3 px-4 text-center">
                    Amount
                  </th>

                  <th className="py-3 px-4 text-center">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                {dashboardData.bookings.map((item) => (

                  <tr key={item._id}>

                    <td className="border-t px-4 py-3">
                      {item.user.username}
                    </td>

                    <td className="border-t px-4 py-3 hidden sm:table-cell">
                      {item.room.roomType}
                    </td>

                    <td className="border-t px-4 py-3 text-center">
                      {currency}
                      {item.totalPrice}
                    </td>

                    <td className="border-t px-4 py-3">

                      <div className="flex justify-center">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.isPaid
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.isPaid
                            ? "Completed"
                            : "Pending"}
                        </span>

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

export default Dashboard;