import { useState } from "react";
import api from "../../../api/axiosInstance";
import { UserPlus, Briefcase, Phone } from "lucide-react";

const StaffForm = ({ onStaffAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phoneNumber: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dërgojmë të dhënat në API
      await api.post("/Staff", formData);
      alert("Punonjësi u shtua me sukses!");
      
      onStaffAdded(); // Rifreskon listën automatikisht
      setFormData({ name: "", role: "", phoneNumber: "" }); // Reset formën
    } catch (err) {
      console.error("Gabim gjatë shtimit:", err.response?.data);
      alert("Gabim: " + (err.response?.data || "Kontrolloni lidhjen me serverin"));
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
          <UserPlus size={20} />
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
          Regjistrim i Ri në Staf
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Emri i Plotë</label>
          <input 
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-indigo-500 transition-all"
            placeholder="Psh. Filan Fisteku"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Pozita</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-indigo-500 transition-all"
              placeholder="Psh. Receptionist"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Nr. Telefonit</label>
          <div className="relative">
            <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-indigo-500 transition-all"
              placeholder="044XXXXXX"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="md:col-span-3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg text-xs uppercase tracking-widest"
        >
          Konfirmo Punonjësin e Ri
        </button>
      </form>
    </div>
  );
};

export default StaffForm;