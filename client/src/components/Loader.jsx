import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Loader = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (!nextUrl) return;

    const timer = setTimeout(() => {
      navigate(`/${nextUrl}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [nextUrl, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-24 w-24 rounded-full border-4 border-gray-300 border-t-primary animate-spin"></div>
    </div>
  );
};

export default Loader;