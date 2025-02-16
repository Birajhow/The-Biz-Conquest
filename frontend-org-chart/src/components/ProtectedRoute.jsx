import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
