import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/user");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
