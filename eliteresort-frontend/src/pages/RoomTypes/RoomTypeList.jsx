import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw } from "lucide-react";
import RoomTypeForm from "../../components/forms/RoomTypeComponents/RoomTypeForm";
import RoomTypeTable from "../../components/forms/RoomTypeComponents/RoomTypeTable";

const RoomTypeList = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  
  // Përshtatja me emrat e Backend-it të Rinorit (C#)
  const [newRoomType, setNewRoomType] = useState({ 
    Name: "", 
    Description: "", 
    BasePrice: "" 
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Funksioni për të marrë kategoritë nga API
  const fetchRoomTypes = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/RoomTypes");
      // Trajtimi i formatit të të dhënave (në rast se vijnë brenda $values)
      setRoomTypes(Array.isArray(res.data) ? res.data : res.data.$values || []);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setTimeout(() => setIsLoading(false), 700);
    }
  };

  // Funksioni për të shtuar një kategori të re
  const handleAddRoomType = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newRoomType,
        BasePrice: parseFloat(newRoomType.BasePrice) // Konvertimi në numër për Backend
      };
      
      await api.post("/RoomTypes", payload);
      setNewRoomType({ Name: "", Description: "", BasePrice: "" }); // Resetimi i formës
      fetchRoomTypes();
    } catch (err) { 
      console.error("Add Error:", err);
      alert("Error: Could not save the room category."); 
    }
  };

  // Funksioni për fshirje
  const handleDeleteRoomType = async (id) => {
    if (window.confirm("Are you sure you want to remove this category? All rooms linked to it might be affected.")) {
      try {
        await api.delete(`/RoomTypes/${id}`);
        fetchRoomTypes();
      } catch (err) { 
        console.error("Delete Error:", err);
        alert("Error: Category is currently in use by existing rooms."); 
      }
    }
  };

  useEffect(() => { fetchRoomTypes(); }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans">
      {/* Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950"></div>
      
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-20 border-b border-slate-100 pb-12">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.5em] text-blue-600 uppercase">Resort Configuration</span>
            <h1 className="text-6xl font-serif italic text-slate-900">Room Categories</h1>
          </div>
          
          <button 
            onClick={fetchRoomTypes} 
            className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-all text-[10px] font-bold uppercase tracking-[0.3em] group"
          >
            <RotateCw 
              size={14} 
              className={isLoading ? "animate-spin text-blue-600" : "group-hover:rotate-180 transition-transform duration-1000"} 
            />
            Sync Database
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          {/* Form Section - Sticky so it follows the scroll */}
          <div className="lg:col-span-4 sticky top-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-50">
              <RoomTypeForm 
                newRoomType={newRoomType} 
                setNewRoomType={setNewRoomType} 
                onAdd={handleAddRoomType} 
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-6 shadow-sm border border-slate-50">
            <RoomTypeTable roomTypes={roomTypes} onDelete={handleDeleteRoomType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeList;