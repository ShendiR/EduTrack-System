import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search Bar - Me stil modern */}
      <div className="relative w-96 group">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search bookings, guests..."
          className="block w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-100 mx-2"></div>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pl-1.5 pr-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100"
          >
            <div className="w-9 h-9 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              S
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-bold text-slate-800 leading-none">
                Shendi Admin
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                Super Admin
              </p>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-slate-50 mb-1">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                  Account Management
                </p>
              </div>
              <button className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3">
                <User size={16} className="text-slate-400" /> My Profile
              </button>
              <button className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3">
                <Settings size={16} className="text-slate-400" /> System
                Settings
              </button>
              <div className="h-px bg-slate-50 my-2"></div>
              <button className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-3 font-semibold">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
