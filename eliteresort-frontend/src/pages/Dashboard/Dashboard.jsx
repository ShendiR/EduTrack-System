import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import StatsCards from "../../components/forms/DashboardComponents/StatsCards.jsx";
import RecentBookings from "../../components/forms/DashboardComponents/RecentBookings.jsx";
import OccupancyChart from "../../components/forms/DashboardComponents/OccupancyChart.jsx";
import RestaurantPreview from "../../components/forms/DashboardComponents/RestaurantPreview.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    activeBookings: 0,
    totalStaff: 0,
    revenue: 0
  });

  // Marrim të dhënat reale për t'i kaluar te StatsCards
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [rooms, bookings, staff] = await Promise.all([
          api.get("/Rooms"),
          api.get("/Bookings"),
          api.get("/Staff")
        ]);

        const roomData = rooms.data.$values || rooms.data;
        const bookingData = bookings.data.$values || bookings.data;
        const staffData = staff.data.$values || staff.data;

        setStats({
          totalRooms: roomData.length,
          activeBookings: bookingData.filter(b => b.status === "Confirmed").length,
          totalStaff: staffData.length,
          revenue: bookingData.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)
        });
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8 animate-in fade-in duration-1000">
      <div>
        <h1 className="text-3xl font-serif italic text-slate-900">
          Elite Resort Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      {/* I kalojmë stats si props që kartat të mbushen me numra realë */}
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentBookings />
          <RestaurantPreview />
        </div>
        <div className="sticky top-8">
          <OccupancyChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;