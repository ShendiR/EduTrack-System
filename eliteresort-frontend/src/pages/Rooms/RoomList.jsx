import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw } from "lucide-react";
import RoomForm from "../../components/forms/RoomComponents/RoomForm";
import RoomTable from "../../components/forms/RoomComponents/RoomTable";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
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
      // Përshtatja me formatin e Backend-it ($values)
      const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
      setRooms(data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newRoom,
        PricePerNight: parseFloat(newRoom.PricePerNight),
        RoomTypeId: parseInt(newRoom.RoomTypeId)
      };
      await api.post("/Rooms", payload);
      setNewRoom({ RoomNumber: "", PricePerNight: "", RoomTypeId: "" });
      fetchRooms();
    } catch (err) { console.error(err); }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("A jeni i sigurt?")) {
      try {
        await api.delete(`/Rooms/${id}`);
        fetchRooms();
      } catch (err) { console.error(err); }
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif italic text-slate-900">Rooms & Suites</h1>
        <button onClick={fetchRooms} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all text-xs font-bold uppercase tracking-widest">
          <RotateCw size={14} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <RoomForm newRoom={newRoom} setNewRoom={setNewRoom} onAdd={handleAddRoom} />
        </div>
        <div className="lg:col-span-8">
          <RoomTable rooms={rooms} onDelete={handleDeleteRoom} />
        </div>
      </div>
    </div>
  );
};

export default RoomList;