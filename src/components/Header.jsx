import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContextProvider";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !isAuthenticated,
    },
    {
      name: "Signup",
      slug: "/register",
      active: !isAuthenticated,
    },
  ];

  return (
    <header className="bg-white shadow h-1/10">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/">
          <img src="../../public/logo.png" alt="Logo" className="h-10" />{" "}
        </Link>
        <nav className="space-x-4">
          {navItems.map((item) =>
            item.active ? (
              <Link
                key={item.name}
                to={item.slug}
                className="text-gray-700 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ) : null
          )}
        </nav>

        {isAuthenticated && (
          <Link
            key="dashboard"
            to="/dashboard"
            className="text-gray-700 hover:text-gray-900"
          >
            Dashboard
          </Link>
        )}

        {isAuthenticated && <LogoutBtn />}
      </div>
    </header>
  );
}
