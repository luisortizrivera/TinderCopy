import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * A component that provides route protection by checking if the user is authenticated.
 *
 * @component
 * @param {string} [props.redirectPath="/"] - The path to redirect to if the user is not authenticated.
 * @param {ReactNode} props.children - The child components to render if the user is authenticated.
 */
const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/matches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) setIsAuthenticated(true);
        else localStorage.removeItem("auth_token");
      } catch (error) {
        console.error("Failed to validate token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to={redirectPath} replace />;

  return children;
};

export default ProtectedRoute;
