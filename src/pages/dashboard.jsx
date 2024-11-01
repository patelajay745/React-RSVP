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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContextProvider";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [firstName, setFirstName] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    {
      icon: PlusCircle,
      label: "Create Event",
      path: "/dashboard/create-event",
    },
    { icon: Calendar, label: "My Events", path: "/dashboard/events" },
    { icon: Users, label: "Attendees", path: "/dashboard/attendees" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const getFormattedGreeting = (name) =>
    `Hello, ${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    setFirstName(JSON.parse(localStorage.getItem("userData")).firstName);
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
            <div className="flex items-center space-x-2">
              <span className="hidden md:inline-block font-medium">
                {getFormattedGreeting(firstName)}
              </span>
            </div>

            <Link to="/">Home</Link>

            <Link to="/dashboard">DashBoard</Link>

            <LogoutBtn />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r w-64 transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-200 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <div className="p-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Attendees</p>
                  <h3 className="text-2xl font-bold">521</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                  <h3 className="text-2xl font-bold">8</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Calendar className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Events</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-4 font-semibold text-sm text-gray-600">
                        Event Name
                      </th>
                      <th className="pb-4 font-semibold text-sm text-gray-600">
                        Date
                      </th>
                      <th className="pb-4 font-semibold text-sm text-gray-600">
                        Attendees
                      </th>
                      <th className="pb-4 font-semibold text-sm text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="text-sm">
                      <td className="py-4">Tech Conference 2024</td>
                      <td className="py-4">Mar 15, 2024</td>
                      <td className="py-4">125</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="text-sm">
                      <td className="py-4">Product Launch</td>
                      <td className="py-4">Mar 20, 2024</td>
                      <td className="py-4">89</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
