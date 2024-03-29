import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../contexts/userContext";

export default function ProtectedLayout() {
  const { user } = useContext(userContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
