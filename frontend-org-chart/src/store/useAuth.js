import { useState, useEffect } from "react";
import { login, signup } from "../api/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
      console.log(token);
    }
  }, []);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    localStorage.setItem("token", data.access_token);
    setUser({ token: data.access_token });
  };

  const handleSignup = async (email, password) => {
    await signup(email, password);
    await handleLogin(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, handleLogin, handleSignup, logout };
};
