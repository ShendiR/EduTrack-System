import { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { PieChart, Activity } from "lucide-react";

const OccupancyChart = () => {
  const [data, setData] = useState({
    total: 0,
    occupied: 0,
    available: 0,
    percentage: 0,
  });

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const res = await api.get("/Rooms");
        const rooms = Array.isArray(res.data)
          ? res.data
          : res.data.$values || [];

        const total = rooms.length;
        const occupied = rooms.filter((r) => !r.isAvailable).length;
        const available = total - occupied;
        const percentage = total > 0 ? Math.round((occupied / total) * 100) : 0;

        setData({ total, occupied, available, percentage });
      } catch (err) {
        console.error("Error calculating occupancy:", err);
      }
    };
    fetchOccupancy();
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Activity className="text-amber-500" size={20} />
          Occupancy Rate
        </h3>
        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-tighter">
          Live Status
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        {/* Rrethi i përqindjes */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * data.percentage) / 100}
              strokeLinecap="round"
              className="text-amber-500 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-black text-slate-800">
              {data.percentage}%
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Occupied
            </span>
          </div>
        </div>

        {/* Detajet e dhomave */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm font-semibold text-slate-600">
                Occupied Rooms
              </span>
            </div>
            <span className="font-bold text-slate-800">{data.occupied}</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <span className="text-sm font-semibold text-slate-600">
                Available Rooms
              </span>
            </div>
            <span className="font-bold text-slate-800">{data.available}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyChart;
