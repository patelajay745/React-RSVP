import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const cached = localStorage.getItem("authState");
    return cached ? JSON.parse(cached) : false;
  });
  const [lastChecked, setLastChecked] = useState(() => {
    return localStorage.getItem("lastChecked") || 0;
  });

  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async (force = false) => {
    const shouldCheck =
      force || !lastChecked || Date.now() - lastChecked > 30 * 60 * 1000; //every 30 minutes

    console.log("shouldCheck", shouldCheck);

    if (!shouldCheck) return;

    try {
      console.log("called verify api");
      const response = await fetch(
        "https://rsvp-backend.ajayproject.com/verify",
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );

      const newState = response.ok;

      console.log(newState);

      setIsAuthenticated(newState);
      const currentTime = Date.now();
      setLastChecked(currentTime);

      // Update localStorage
      localStorage.setItem("authState", JSON.stringify(newState));
      localStorage.setItem("lastChecked", currentTime);
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentails) => {
    console.log("recived data", new URLSearchParams(credentails));
    try {
      const response = await fetch(
        "https://rsvp-backend.ajayproject.com/login",
        {
          method: "POST",
          mode: "cors",
          body: new URLSearchParams(credentails),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        const currentTime = Date.now();
        setLastChecked(currentTime);

        // Update localStorage
        localStorage.setItem("authState", JSON.stringify(response.ok));
        localStorage.setItem("lastChecked", currentTime);
        return { success: true };
      }
      return {
        success: false,
        message: data,
      };
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        "https://rsvp-backend.ajayproject.com/logout",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("Logout Response:", data);

      if (response.ok) {
        setIsAuthenticated(false);
        return { success: true };
      }

      return {
        success: false,
        error: data.data.code,
        message: data.message,
      };
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        success: false,
        error: "NETWORK_ERROR",
        message: error.message,
      };
    }
  };

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
