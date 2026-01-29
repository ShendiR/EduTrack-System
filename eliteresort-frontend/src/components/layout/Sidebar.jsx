import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bed,
  Utensils,
  CalendarCheck,
  Layers // Ikonë për kategoritë
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { path: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/bookings", icon: <CalendarCheck size={20} />, label: "Bookings" },
    { path: "/guests", icon: <Users size={20} />, label: "Guests" },
    { path: "/rooms", icon: <Bed size={20} />, label: "Rooms" },
    { path: "/room-types", icon: <Layers size={20} />, label: "Room Types" }, // Butoni i ri
    { path: "/restaurant", icon: <Utensils size={20} />, label: "Restaurant" },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col min-h-screen shadow-2xl">
      <div className="p-8 text-2xl font-serif italic tracking-widest border-b border-slate-800 text-amber-500">
        Elite Resort
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="font-medium text-sm tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 text-xs text-slate-500 italic">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Server Online
        </div>
      </div>
    </div>
  );
};

export default Sidebar;