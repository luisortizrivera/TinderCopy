import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
