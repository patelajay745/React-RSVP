import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  PlusCircle,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Bell,
} from "lucide-react";
import LogoutBtn from "@/components/LogoutBtn";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContextProvider";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/utils/dateUtils";
import SideBar from "@/components/SideBar";
import DashboardComponent from "@/components/Dashboard";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b h-16 fixed w-full top-0 z-10">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <img src="/logo.png" alt="Logo" className="h-8 ml-2" />
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">Home</Link>

            <Link to="/dashboard">DashBoard</Link>

            <LogoutBtn />
          </div>
        </div>
      </nav>

      {/* Sidebar */}

      <SideBar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}

      <main
        className={`pt-16 transition-all duration-200 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
      {/* <DashboardComponent /> */}
    </div>
  );
}
