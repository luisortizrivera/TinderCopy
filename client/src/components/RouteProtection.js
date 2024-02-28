import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const isAuthenticated = localStorage.getItem("auth_token") !== null;
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
