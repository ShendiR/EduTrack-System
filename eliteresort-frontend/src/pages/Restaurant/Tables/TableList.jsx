import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import TableForm from "../../../components/forms/TableComponents/TableForm";
import TableGrid from "../../../components/forms/TableComponents/TableGrid";
import { RotateCw, Star } from "lucide-react";

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({ tableNumber: "", capacity: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchTables = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/RestaurantTables");
      const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
      setTables(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Kontrolli për numrin e njëjtë
    const duplicate = tables.find(t => t.tableNumber.toString() === newTable.tableNumber.toString());
    if (duplicate) {
      alert(`Gabim: Tavolina No. ${newTable.tableNumber} është regjistruar më parë!`);
      return;
    }

    try {
      // PËRPUTHJA ME MODELIN E JOZEFIT ✅
      const payload = { 
        tableNumber: parseInt(newTable.tableNumber), 
        capacity: parseInt(newTable.capacity),
        isAvailable: true 
      };

      await api.post("/RestaurantTables", payload);
      setNewTable({ tableNumber: "", capacity: "" });
      fetchTables();
    } catch (error) {
      console.error("Post Error Details:", error.response?.data);
      alert("Gabim 400: Kontrollo formatin e të dhënave në Backend.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this table?")) {
      try {
        await api.delete(`/RestaurantTables/${id}`);
        fetchTables();
      } catch (error) { console.error(error); }
    }
  };

  useEffect(() => { fetchTables(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 font-sans">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-serif italic text-slate-900 tracking-tight">Restaurant Tables</h1>
          <div className="flex items-center gap-2 mt-2 font-sans">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Elite Floor Management</p>
          </div>
        </div>
        <button onClick={fetchTables} className="bg-transparent border-none cursor-pointer text-slate-400 hover:text-amber-600 transition-all">
          <RotateCw size={22} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <TableForm newTable={newTable} setNewTable={setNewTable} onAdd={handleAdd} />
        </div>
        <div className="lg:col-span-8">
          <TableGrid tables={tables} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default TableList;