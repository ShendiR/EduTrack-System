import { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Clock, User, ArrowRight } from "lucide-react";

const RecentBookings = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await api.get("/Bookings");
        const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
        
        // Marrim vetëm 5 rezervimet e fundit dhe i rreshtojmë nga më i riu
        const sorted = [...data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);
        
        setRecent(sorted);
      } catch (err) {
        console.error("Error fetching recent bookings:", err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Clock className="text-indigo-500" size={20} />
          Recent Activity
        </h3>
        <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {recent.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">
                  {booking.guest?.firstName} {booking.guest?.lastName}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Room {booking.room?.roomNumber} • {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-bold text-emerald-600">+${booking.totalPrice?.toFixed(2)}</p>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase">Paid</span>
            </div>
          </div>
        ))}
        
        {recent.length === 0 && (
          <p className="text-center text-slate-400 py-10 italic">No recent activity found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentBookings;