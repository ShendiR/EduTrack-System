import { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Utensils, Star } from "lucide-react";

const RestaurantPreview = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get("/MenuItems"); // NDRYSHIMI KETU
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.$values || [];
        setMenu(data.slice(0, 4));
      } catch (err) {
        console.error("Menu Error:", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Utensils className="text-rose-500" size={20} />
          Restaurant Highlights
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menu.length > 0 ? (
          menu.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-rose-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-rose-500 shadow-sm">
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-sm font-bold text-slate-700">
                  {item.name}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-900 bg-white px-3 py-1 rounded-xl shadow-sm">
                ${item.price}
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic text-sm col-span-2 text-center py-4">
            No menu items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantPreview;
