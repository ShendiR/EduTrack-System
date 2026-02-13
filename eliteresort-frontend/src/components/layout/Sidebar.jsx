import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bed,
  Utensils,
  CalendarCheck,
  Layers,
  Sparkles,
  CreditCard,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  // State për të mbajtur hapur grupet e menusë
  const [openGroups, setOpenGroups] = useState({
    management: true, // E lëmë hapur default
    rooms: false,
    services: false,
  });

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const activeLink = "bg-amber-600 text-white shadow-lg shadow-amber-900/20";
  const normalLink = "text-slate-400 hover:bg-slate-800 hover:text-white";

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col min-h-screen shadow-2xl">
      {/* LOGO AREA */}
      <div className="p-8 text-2xl font-serif italic tracking-widest border-b border-slate-800 text-amber-500 text-center">
        Elite Resort
      </div>

      <nav className="flex-1 p-4 space-y-4 mt-4 overflow-y-auto">
        {/* DASHBOARD - Single Link */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? activeLink : normalLink}`
          }
        >
          <LayoutDashboard size={18} />
          <span className="font-medium text-sm">Dashboard</span>
        </NavLink>

        {/* GROUP 1: GUESTS & PAYMENTS */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("management")}
            className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Management
              </span>
            </div>
            {openGroups.management ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>

          {openGroups.management && (
            <div className="space-y-1 ml-2 border-l border-slate-800 pl-4 animate-in fade-in slide-in-from-top-1">
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500" : "text-slate-400 hover:text-white"}`
                }
              >
                <CalendarCheck size={16} /> Bookings
              </NavLink>
              <NavLink
                to="/guests"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500" : "text-slate-400 hover:text-white"}`
                }
              >
                <Users size={16} /> Guest List
              </NavLink>
              <NavLink
                to="/payments"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500" : "text-slate-400 hover:text-white"}`
                }
              >
                <CreditCard size={16} /> Payments
              </NavLink>
            </div>
          )}
        </div>

        {/* GROUP 2: ROOMS & CATEGORIES */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("rooms")}
            className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bed size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Accommodations
              </span>
            </div>
            {openGroups.rooms ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>

          {openGroups.rooms && (
            <div className="space-y-1 ml-2 border-l border-slate-800 pl-4">
              <NavLink
                to="/rooms"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500" : "text-slate-400 hover:text-white"}`
                }
              >
                <Bed size={16} /> All Rooms
              </NavLink>
              <NavLink
                to="/room-types"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500" : "text-slate-400 hover:text-white"}`
                }
              >
                <Layers size={16} /> Room Types
              </NavLink>
              <NavLink
                to="/amenities"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500" : "text-slate-400 hover:text-white"}`
                }
              >
                <Sparkles size={16} /> Amenities
              </NavLink>
            </div>
          )}
        </div>

        {/* GROUP 3: RESTAURANT & SERVICES */}
        <div className="space-y-1">
          <button
            onClick={() => toggleGroup("services")}
            className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <Utensils size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Services
              </span>
            </div>
            {openGroups.services ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>

          {openGroups.services && (
            <div className="space-y-1 ml-2 border-l border-slate-800 pl-4">
              <NavLink
                to="/restaurant"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500" : "text-slate-400 hover:text-white"}`
                }
              >
                <Utensils size={16} /> Menu & Orders
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* FOOTER & LOGOUT */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <LogOut size={18} /> Logout
        </button>

        <div className="flex items-center gap-2 px-2 text-[10px] text-slate-500 italic uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          System Live
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
