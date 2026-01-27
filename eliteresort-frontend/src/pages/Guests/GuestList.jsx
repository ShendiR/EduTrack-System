import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw } from "lucide-react";
import GuestForm from "../../components/guest/GuestForm";
import GuestTable from "../../components/guest/GuestTable";

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchGuests = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/Guests");
      const data = Array.isArray(res.data) ? res.data : res.data.value || [];
      setGuests(data);
    } catch (err) {
      console.error("Connection error:", err);
    } finally {
      // Vonesë e vogël artificiale për të shijuar animacionin e refresh-it
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/Guests", newGuest);
      setNewGuest({ firstName: "", lastName: "", email: "" });
      fetchGuests();
    } catch (err) {
      alert("System failed to register guest. Please check your connection.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this guest from the directory?",
      )
    ) {
      try {
        await api.delete(`/Guests/${id}`);
        fetchGuests();
      } catch (err) {
        alert("Deletion failed. The record might have already been removed.");
      }
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans">
      {/* Decorative Top Accent */}
      <div className="h-1 w-full bg-linear-to-r from-slate-900 via-blue-800 to-slate-900"></div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-10">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.4em] text-blue-600 uppercase">
              Elite Resort & Spa
            </span>
            <h1 className="text-5xl font-serif italic text-slate-900">
              Guest Directory
            </h1>
          </div>

          <button
            onClick={fetchGuests}
            className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-all duration-500 cursor-pointer text-xs font-bold tracking-widest uppercase"
          >
            <RotateCw
              size={16}
              className={`${isLoading ? "animate-spin text-blue-600" : "hover:rotate-180 transition-transform"}`}
            />
            {isLoading ? "Syncing..." : "Refresh Database"}
          </button>
        </div>

        {/* Main Content: 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Form Column - Sticky for better UX */}
          <div className="lg:col-span-4 sticky top-10">
            <div className="bg-white p-10 rounded-4xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-50">
              <GuestForm
                newGuest={newGuest}
                setNewGuest={setNewGuest}
                onAdd={handleAdd}
              />
            </div>
          </div>

          {/* Table Column */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-4xl p-4 shadow-sm border border-slate-50">
              <GuestTable guests={guests} onDelete={handleDelete} />
            </div>

            {/* Footer Note */}
            <p className="mt-8 text-center text-slate-300 text-[11px] tracking-widest uppercase">
              Authorized personnel only • © 2026 Elite Resort Management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestList;
