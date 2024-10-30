import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ConfirmEmail from "./pages/confirmEmail";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import AuthContextProvider from "./context/AuthContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/confirm",
    element: <ConfirmEmail />,
  },
  {
    path: "/login",

    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}>
        <Home />
      </RouterProvider>
    </AuthContextProvider>
  </StrictMode>
);
