import React, { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Calendar,
  Users,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r w-64 transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default SideBar;
