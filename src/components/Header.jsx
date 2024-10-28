import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const loginStatus = useSelector((state) => {
    return state.status;
  });

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !loginStatus,
    },
    {
      name: "Signup",
      slug: "/register",
      active: !loginStatus,
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
      </div>
    </header>
  );
}
