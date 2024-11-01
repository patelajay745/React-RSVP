import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/signup";
import ConfirmEmail from "./pages/confirmEmail";
import AuthContextProvider from "./context/AuthContextProvider";
import Dashboard from "./pages/dashboard";
import DashboardComponent from "./components/Dashboard";
import CreateEvent from "./components/CreateEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardComponent />,
      },
      {
        path: "create-event",
        element: <CreateEvent />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>
);
