import { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { DollarSign, CalendarCheck, Home, Users } from "lucide-react";

const StatCards = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalBookings: 0,
    availableRooms: 0,
    totalGuests: 0
  });
//a
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookingsRes, roomsRes, guestsRes] = await Promise.all([
          api.get("/Bookings"),
          api.get("/Rooms"),
          api.get("/Guests")
        ]);

        // Marrim të dhënat duke mbështetur formatin $values të .NET
        const bookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : bookingsRes.data.$values || [];
        const rooms = Array.isArray(roomsRes.data) ? roomsRes.data : roomsRes.data.$values || [];
        const guests = Array.isArray(guestsRes.data) ? guestsRes.data : guestsRes.data.$values || [];

        // Llogarisim fitimet totale nga të gjitha rezervimet
        const earnings = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

        setStats({
          totalEarnings: earnings,
          totalBookings: bookings.length,
          availableRooms: rooms.filter(r => r.isAvailable).length,
          totalGuests: guests.length
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    { label: "Total Earnings", value: `$${stats.totalEarnings.toFixed(2)}`, icon: <DollarSign size={24} />, color: "bg-emerald-500" },
    { label: "Bookings", value: stats.totalBookings, icon: <CalendarCheck size={24} />, color: "bg-amber-500" },
    { label: "Available Rooms", value: stats.availableRooms, icon: <Home size={24} />, color: "bg-blue-500" },
    { label: "Total Guests", value: stats.totalGuests, icon: <Users size={24} />, color: "bg-indigo-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-all">
          <div className={`${card.color} p-4 rounded-2xl text-white shadow-lg`}>
            {card.icon}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;