import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw } from "lucide-react";
import RoomForm from "../../components/forms/RoomComponents/RoomForm";
import RoomTable from "../../components/forms/RoomComponents/RoomTable";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  // Përshtatja me emrat e Backend-it (C#)
  const [newRoom, setNewRoom] = useState({ 
    RoomNumber: "", 
    PricePerNight: "", 
    RoomTypeId: "" 
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/Rooms");
      setRooms(Array.isArray(res.data) ? res.data : res.data.value || []);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 700);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      // Konvertimi i vlerave në numra për të shmangur Error 400
      const payload = {
        ...newRoom,
        PricePerNight: parseFloat(newRoom.PricePerNight),
        RoomTypeId: parseInt(newRoom.RoomTypeId)
      };
      
      await api.post("/Rooms", payload);
      setNewRoom({ RoomNumber: "", PricePerNight: "", RoomTypeId: "" });
      fetchRooms();
    } catch (err) { 
      console.error("Add Error:", err);
      alert("System Error: Could not register room. Check if RoomType ID exists."); 
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to remove this accommodation?")) {
      try {
        await api.delete(`/Rooms/${id}`);
        fetchRooms();
      } catch (err) { 
        console.error("Delete Error:", err);
        alert("Error: Room is currently linked to a booking."); 
      }
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans">
      <div className="h-1.5 w-full bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950"></div>
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-20 border-b border-slate-100 pb-12">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.5em] text-blue-600 uppercase">Resort Inventory</span>
            <h1 className="text-6xl font-serif italic text-slate-900">Rooms & Suites</h1>
          </div>
          <button onClick={fetchRooms} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-all text-[10px] font-bold uppercase tracking-[0.3em] group">
            <RotateCw size={14} className={isLoading ? "animate-spin text-blue-600" : "group-hover:rotate-180 transition-transform duration-1000"} />
            Refresh Inventory
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div className="lg:col-span-4 sticky top-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-50">
              <RoomForm newRoom={newRoom} setNewRoom={setNewRoom} onAdd={handleAddRoom} />
            </div>
          </div>
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-6 shadow-sm border border-slate-50">
            <RoomTable rooms={rooms} onDelete={handleDeleteRoom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;