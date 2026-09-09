import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../store/auth";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuthentication();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;