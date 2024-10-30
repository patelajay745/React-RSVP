import { useAuth } from "../context/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import { PageSpinner } from "./LoadingSpinner";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
