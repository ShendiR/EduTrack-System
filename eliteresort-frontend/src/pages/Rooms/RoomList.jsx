import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw, AlertCircle } from "lucide-react";
import RoomForm from "../../components/forms/RoomComponents/RoomForm";
import RoomTable from "../../components/forms/RoomComponents/RoomTable";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomNumber: "", pricePerNight: "", roomTypeId: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRooms = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await api.get("/Rooms");
      const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
      setRooms(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("Nuk u ngarkuan dhomat nga serveri.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const payload = {
        roomNumber: newRoom.roomNumber,
        pricePerNight: parseFloat(newRoom.pricePerNight),
        isAvailable: true,
        roomTypeId: parseInt(newRoom.roomTypeId)
      };

      await api.post("/Rooms", payload);
      setNewRoom({ roomNumber: "", pricePerNight: "", roomTypeId: "" });
      fetchRooms();
    } catch (error) {
      console.error("Add error:", error);
      setErrorMessage("Gabim gjatë regjistrimit të dhomës.");
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("A jeni i sigurt?")) {
      try {
        await api.delete(`/Rooms/${id}`);
        fetchRooms();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif italic text-slate-900">Rooms & Suites</h1>
          {errorMessage && (
            <div className="flex items-center gap-2 text-red-600 mt-2 text-sm font-medium">
              <AlertCircle size={16} /> {errorMessage}
            </div>
          )}
        </div>
        <button onClick={fetchRooms} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 uppercase text-xs font-bold tracking-widest cursor-pointer">
          <RotateCw size={14} className={isLoading ? "animate-spin" : ""} /> Refresh
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