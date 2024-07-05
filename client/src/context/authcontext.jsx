import React from "react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const login = async (inputs) => {
    try {
      const res = await axios.post("/api/login", inputs);
      setCurrentUser(res.data);
      window.location.href = "/";

      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      alert(error.response.data);
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/logout");
      setCurrentUser(null);
      localStorage.removeItem("user");
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Example usage:
// Wrap your app with AuthContexProvider
// <AuthContexProvider>
//   <App />
// </AuthContexProvider>

// Then, in any component, you can use the AuthContext to access currentUser, login, and logout.
// e.g.
// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";
// const { currentUser, login, logout } = useContext(AuthContext);
