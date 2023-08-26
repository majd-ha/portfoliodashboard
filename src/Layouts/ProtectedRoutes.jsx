import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
}
