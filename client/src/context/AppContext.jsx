import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/react";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const navigate = useNavigate();

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [rooms, setRooms] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);

  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  // Fetch all rooms
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/api/rooms");

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch logged in user
  const fetchUser = useCallback(async () => {
    if (!isLoaded) return;

    if (!user) {
      setIsOwner(false);
      setSearchedCities([]);
      setUserLoading(false);
      return;
    }

    try {
      setUserLoading(true);

      const token = await getToken();

      const { data } = await api.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User API:", data);

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setUserLoading(false);
    }
  }, [isLoaded, user, getToken]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value = {
    currency,
    navigate,

    axios: api,

    user,
    getToken,

    rooms,
    setRooms,

    searchedCities,
    setSearchedCities,

    isOwner,
    setIsOwner,

    showHotelReg,
    setShowHotelReg,

    loading,
    userLoading,

    fetchRooms,
    fetchUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);