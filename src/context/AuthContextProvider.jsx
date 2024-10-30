import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Checking deafult login behave");
    (async () => {
      try {
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

        response.ok ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (error) {
        console.log("Auth check failed", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (credentails) => {
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

      if (response.ok) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

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

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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
