import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useApi } from "@/hooks/useApi";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const cached = localStorage.getItem("authState");
    return cached ? JSON.parse(cached) : false;
  });
  const [lastChecked, setLastChecked] = useState(() => {
    return localStorage.getItem("lastChecked") || 0;
  });
  const api = useApi();

  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async (force = false) => {
    const shouldCheck =
      force || !lastChecked || Date.now() - lastChecked > 30 * 60 * 1000; //every 30 minutes

    console.log("shouldCheck", shouldCheck);

    if (!shouldCheck) return;

    try {
      console.log("called verify api");
      const result = await api.verifyAuth();

      setIsAuthenticated(result.success);
      const currentTime = Date.now();
      setLastChecked(currentTime);

      // Update localStorage
      localStorage.setItem("authState", JSON.stringify(result.success));
      localStorage.setItem("lastChecked", currentTime);
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const result = await api.login(credentials);

      if (result.success) {
        setIsAuthenticated(true);
        const currentTime = Date.now();
        setLastChecked(currentTime);
        // Update localStorage
        localStorage.setItem("authState", JSON.stringify(true));
        localStorage.setItem("lastChecked", currentTime);
      }

      return result;
    } catch (error) {
      console.error("Login failed:", error);
      return error;
    }
  };

  const logout = async () => {
    try {
      const result = await api.logout();

      if (result.success) {
        setIsAuthenticated(false);
        localStorage.removeItem("authState");
        localStorage.removeItem("lastChecked");
      }

      return result;
    } catch (error) {
      console.error("Logout error:", error);
      return error;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Expose force check method
  const verifyAuth = () => checkAuth(true);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, logout, verifyAuth, login }} //add login ,login
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export default AuthContextProvider;
