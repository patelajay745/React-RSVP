import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow h-1/10">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <img src="../../public/logo.png" alt="Logo" className="h-10" />
        <nav className="space-x-4">
          <a href="#features" className="text-gray-700 hover:text-gray-900">
            Features
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900">
            Pricing
          </a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </a>
          <Link className="text-gray-700 hover:text-gray-900" to="/login">
            Login
          </Link>
          <Link className="text-gray-700 hover:text-gray-900" to="/register">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
