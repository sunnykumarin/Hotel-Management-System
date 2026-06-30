import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { userLoading, isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!userLoading && !isOwner) {
      navigate("/");
    }
  }, [userLoading, isOwner, navigate]);

  if (userLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;