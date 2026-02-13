import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw, AlertCircle } from "lucide-react";
import AmenityForm from "../../components/forms/AmenityComponents/AmenityForm";
import AmenityTable from "../../components/forms/AmenityComponents/AmenityTable";

const AmenityList = () => {
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAmenities = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await api.get("/Amenities");
      const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
      setAmenities(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("Nuk u ngarkuan pajisjet nga serveri.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAmenity = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await api.post("/Amenities", newAmenity);
      setNewAmenity({ name: "", description: "" });
      fetchAmenities();
    } catch (err) {
      console.error("Add error:", err);
      setErrorMessage("Gabim gjatë regjistrimit të pajisjes.");
    }
  };

  const handleDeleteAmenity = async (id) => {
    if (!id) return;
    if (window.confirm("A jeni i sigurt?")) {
      try {
        // Përdorim thirrje direkte pa Template Literals për të shmangur gabimin 2:1
        await api.delete("/Amenities/" + id); 
        fetchAmenities();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif italic text-slate-900">Resort Amenities</h1>
          {errorMessage && (
            <div className="flex items-center gap-2 text-red-600 mt-2 text-sm font-medium">
              <AlertCircle size={16} /> {errorMessage}
            </div>
          )}
        </div>
        <button 
          onClick={fetchAmenities} 
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 uppercase text-xs font-bold tracking-widest cursor-pointer transition-colors"
        >
          <RotateCw size={14} className={isLoading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <AmenityForm 
            newAmenity={newAmenity} 
            setNewAmenity={setNewAmenity} 
            onAdd={handleAddAmenity} 
          />
        </div>
        <div className="lg:col-span-8">
          <AmenityTable 
            amenities={amenities} 
            onDelete={handleDeleteAmenity} 
          />
        </div>
      </div>
    </div>
  );
};

export default AmenityList;