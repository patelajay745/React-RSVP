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

    console.log(shouldCheck);

    if (!shouldCheck) return;

    try {
      console.log("called verify api");
      const response = await fetch(
        "https://rsvp-backend.ajayproject.com/login",
        {
          method: "POST",
          mode: "cors",
          // change this api
          body: new URLSearchParams(formData),
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

  // const login = async (credentails) => {
  //   try {
  //     const response = await fetch(
  //       "https://rsvp-backend.ajayproject.com/login",
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         body: new URLSearchParams(credentails),
  //         credentials: "include",
  //       }
  //     );

  //     if (response.ok) {
  //       setIsAuthenticated(true);
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     return false;
  //   }
  // };

  const logout = async () => {
    try {
      await fetch("https://rsvp-backend.ajayproject.com/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Expose force check method
  const verifyAuth = () => checkAuth(true);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, verifyAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  console.log(context);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export default AuthContextProvider;
