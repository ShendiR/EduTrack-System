import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, Bed, Utensils, CalendarCheck,
  Layers, Sparkles, CreditCard, ChevronDown, ChevronRight,
  LogOut, Star, Armchair , UserCog , Mountain 
} from "lucide-react";

const Sidebar = () => {
  const [openGroups, setOpenGroups] = useState({
    management: true, 
    rooms: true, 
    services: true, 
  });

  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const activeLink = "bg-amber-600 text-white shadow-lg shadow-amber-900/20";
  const normalLink = "text-slate-400 hover:bg-slate-800 hover:text-white";

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col min-h-screen shadow-2xl overflow-hidden font-sans">
      <div className="p-8 text-2xl font-serif italic tracking-widest border-b border-slate-800 text-amber-500 text-center">
        Elite Resort
      </div>

      <nav className="flex-1 p-4 space-y-4 mt-4 overflow-y-auto">
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? activeLink : normalLink}`}>
          <LayoutDashboard size={18} />
          <span className="font-medium text-sm">Dashboard</span>
        </NavLink>

        <div className="space-y-1">
          <button onClick={() => toggleGroup("management")} className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-colors border-none bg-transparent cursor-pointer">
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Management</span>
            </div>
            {openGroups.management ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          {openGroups.management && (
            <div className="space-y-1 ml-2 border-l border-slate-800 pl-4">
              <NavLink to="/bookings" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <CalendarCheck size={16} /> Bookings
              </NavLink>
              <NavLink to="/guests" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <Users size={16} /> Guest List
              </NavLink>
              <NavLink to="/payments" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <CreditCard size={16} /> Payments
              </NavLink>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <button onClick={() => toggleGroup("rooms")} className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-colors border-none bg-transparent cursor-pointer">
            <div className="flex items-center gap-3">
              <Bed size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Accommodations</span>
            </div>
            {openGroups.rooms ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          {openGroups.rooms && (
            <div className="space-y-1 ml-2 border-l border-slate-800 pl-4">
              <NavLink to="/rooms" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <Bed size={16} /> All Rooms
              </NavLink>
              <NavLink to="/room-types" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <Layers size={16} /> Room Types
              </NavLink>
              <NavLink to="/amenities" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <Sparkles size={16} /> Amenities
              </NavLink>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <button onClick={() => toggleGroup("services")} className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-colors border-none bg-transparent cursor-pointer">
            <div className="flex items-center gap-3">
              <Utensils size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Restaurant</span>
            </div>
            {openGroups.services ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openGroups.services && (
            <div className="space-y-1 ml-2 border-l border-slate-800 pl-4">
              <NavLink to="/restaurant" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <Utensils size={16} /> Menu & Orders
              </NavLink>
              <NavLink to="/tables" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <Armchair size={16} /> Restaurant Tables
              </NavLink>
              <NavLink to="/events" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
                <Star size={16} className="text-amber-500" /> Grand Events
              </NavLink>

            <NavLink to="/staff" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
            <UserCog size={16} /> Staff Members
            </NavLink>

            <NavLink to="/spa" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
            <Sparkles size={16} /> Spa Services
            </NavLink>

            <NavLink to="/activities" className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${isActive ? "text-amber-500 font-bold" : "text-slate-400 hover:text-white"}`}>
            <Mountain size={16} /> Activities
            </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium border-none bg-transparent cursor-pointer">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;