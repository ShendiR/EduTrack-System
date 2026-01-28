import StatCards from "../../components/forms/DashboardComponents/StatCards";
import RecentBookings from "../../components/forms/DashboardComponents/RecentBookings";
import OccupancyChart from "../../components/forms/DashboardComponents/OccupancyChart";

const Dashboard = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-serif italic text-slate-900">Elite Resort Overview</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentBookings />
        </div>
        <div>
          <OccupancyChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;