import { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { DollarSign, CalendarCheck, Home, Users, Utensils } from "lucide-react";

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalBookings: 0,
    availableRooms: 0,
    totalGuests: 0,
    menuCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await Promise.allSettled([
          api.get("/Bookings"),
          api.get("/Rooms"),
          api.get("/Guests"),
          api.get("/MenuItems"), // NDRYSHIMI KETU
        ]);

        const getData = (res) => {
          if (res.status === "fulfilled") {
            return Array.isArray(res.value.data)
              ? res.value.data
              : res.value.data.$values || [];
          }
          return [];
        };

        const bookings = getData(results[0]);
        const rooms = getData(results[1]);
        const guests = getData(results[2]);
        const menu = getData(results[3]);

        setStats({
          totalEarnings: bookings.reduce(
            (sum, b) => sum + (b.totalPrice || 0),
            0,
          ),
          totalBookings: bookings.length,
          availableRooms: rooms.filter((r) => r.isAvailable).length,
          totalGuests: guests.length,
          menuCount: menu.length,
        });
      } catch (err) {
        console.error("Stats Error:", err);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    {
      label: "Total Earnings",
      value: `$${stats.totalEarnings.toFixed(2)}`,
      icon: <DollarSign size={24} />,
      color: "bg-emerald-500",
    },
    {
      label: "Bookings",
      value: stats.totalBookings,
      icon: <CalendarCheck size={24} />,
      color: "bg-amber-500",
    },
    {
      label: "Available Rooms",
      value: stats.availableRooms,
      icon: <Home size={24} />,
      color: "bg-blue-500",
    },
    {
      label: "Menu Items",
      value: stats.menuCount,
      icon: <Utensils size={24} />,
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5"
        >
          <div className={`${card.color} p-4 rounded-2xl text-white shadow-lg`}>
            {card.icon}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {card.label}
            </p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
