import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import userContext from "../contexts/userContext";

function ProtectedLayout() {
  const location = useLocation();
  const { user, token } = useContext(userContext);
  return user && token ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default ProtectedLayout;
