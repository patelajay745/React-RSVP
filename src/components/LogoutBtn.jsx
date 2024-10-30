import { useAuth } from "@/context/AuthContextProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      const result = await logout();

      if (result.success) {
        navigate("/");
      } else {
        console.log("Logout Error:", result.error);
        console.log("Error Message:", result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className="text-gray-700 hover:text-gray-900 font-medium flex items-center"
      onClick={logoutHandler}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </button>
  );
}

export default LogoutBtn;
