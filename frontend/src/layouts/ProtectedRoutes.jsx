import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import userContext from "../contexts/userContext";

function ProtectedRoutes({ children }) {
  const { user } = useContext(userContext);
  if (user) {
    <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProtectedRoutes;
