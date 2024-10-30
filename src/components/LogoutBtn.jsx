import { useAuth } from "@/context/AuthContextProvider";
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    
    const result = await logout();
    console.log("Logout Result:", result); // Logs result object

    if (result.success) {
      navigate("/");
    } else {
      console.log("Logout Error:", result.error); // Logs error code
      console.log("Error Message:", result.message); // Logs error message
      // You could also show an error message to the user here
    }
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
