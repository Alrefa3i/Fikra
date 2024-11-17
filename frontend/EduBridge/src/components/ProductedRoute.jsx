import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProductedRoute({ children }) {
  const { isAuthorized } = useAuth();

  if (isAuthorized === null) {
    return <>loading ....</>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
}