import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw } from "lucide-react";
import MenuItemForm from "../../components/forms/RestaurantComponents/MenuItemForm";
import MenuItemTable from "../../components/forms/RestaurantComponents/MenuItemTable";

const MenuItem = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ Name: "", Description: "", Price: "", Category: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchMenu = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/MenuItems");
      setItems(Array.isArray(res.data) ? res.data : res.data.value || []);
    } catch (err) { console.error("API Error:", err); }
    finally { setTimeout(() => setIsLoading(false), 700); }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newItem, Price: parseFloat(newItem.Price) };
      await api.post("/MenuItems", payload);
      setNewItem({ Name: "", Description: "", Price: "", Category: "" });
      fetchMenu();
    } catch (err) { alert("Error adding culinary item."); }
  };

  // KETU SHTOHET FUNKSIONI I RI I FSHIRJES
  const handleDeleteItem = async (id) => {
    if (!id) {
      console.error("ID is missing!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this exquisite dish?")) {
      try {
        // Përdorim backticks (`) për të dërguar ID-në te API
        await api.delete(`/MenuItems/${id}`);
        fetchMenu(); // Rifreskon listën pas fshirjes
      } catch (err) {
        console.error("Delete Error:", err.response?.data);
        alert("Error: Could not delete item. The server might be down or ID not found.");
      }
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="h-1.5 w-full bg-linear-to-r from-amber-200 via-amber-500 to-amber-200"></div>
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-20 border-b border-slate-100 pb-12">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.5em] text-amber-600 uppercase">Resort Gastronomy</span>
            <h1 className="text-6xl font-serif italic text-slate-900">Fine Dining Menu</h1>
          </div>
          <button onClick={fetchMenu} className="flex items-center gap-3 text-slate-400 hover:text-amber-600 transition-all text-[10px] font-bold uppercase tracking-[0.3em] group">
            <RotateCw size={14} className={isLoading ? "animate-spin text-amber-600" : "group-hover:rotate-180"} />
            Refresh Menu
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-4 sticky top-12">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50">
              <MenuItemForm newItem={newItem} setNewItem={setNewItem} onAdd={handleAddItem} />
            </div>
          </div>
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-6 border border-slate-50 shadow-sm">
            <MenuItemTable items={items} onDelete={handleDeleteItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;