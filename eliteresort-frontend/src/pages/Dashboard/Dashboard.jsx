import StatsCards from "../../components/forms/DashboardComponents/StatsCards.jsx";
import RecentBookings from "../../components/forms/DashboardComponents/RecentBookings.jsx";
import OccupancyChart from "../../components/forms/DashboardComponents/OccupancyChart.jsx";
import RestaurantPreview from "../../components/forms/DashboardComponents/RestaurantPreview.jsx";

const Dashboard = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-serif italic text-slate-900">
          Elite Resort Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentBookings />
          <RestaurantPreview />
        </div>
        <div>
          <OccupancyChart />
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
//hi
export default Dashboard;
=======
export default Dashboard;
>>>>>>> 2ac5ce0dd0a77430e3a8656d81b3dc020e497721
