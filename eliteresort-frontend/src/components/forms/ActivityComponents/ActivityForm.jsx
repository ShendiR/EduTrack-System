import { useState } from "react";
import api from "../../../api/axiosInstance";
import { Mountain, DollarSign, MapPin, Users, Info } from "lucide-react";

const ActivityForm = ({ onActivityAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    maxParticipants: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: parseFloat(formData.price),
        maxParticipants: parseInt(formData.maxParticipants) || 0,
        isAvailable: true
      };

      await api.post("/Activities", payload);
      alert("Aktiviteti u shtua me sukses!");
      onActivityAdded();
      setFormData({ title: "", description: "", location: "", price: "", maxParticipants: "" });
    } catch (err) {
      console.error("Detajet e gabimit:", err.response?.data);
      alert("Gabim gjatë shtimit. Kontrolloni nëse të gjitha fushat janë plotësuar.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8 text-left text-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 font-bold">
          <Mountain size={20} />
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Shto Aktivitet të Ri</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Titulli (Title)</label>
          <input 
            className="bg-slate-50 p-4 rounded-2xl outline-none border border-slate-100 focus:border-emerald-500 transition-all"
            placeholder="Psh. Hiking në Bjeshkë"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required 
          />
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Lokacioni</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none border border-slate-100 focus:border-emerald-500 transition-all"
              placeholder="Vendi i aktivitetit"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Çmimi ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              type="number"
              className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none border border-slate-100 focus:border-emerald-500 transition-all"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Maksimumi i Personave</label>
          <div className="relative">
            <Users className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              type="number"
              className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none border border-slate-100 focus:border-emerald-500 transition-all"
              placeholder="Kapaciteti"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:col-span-2 text-left">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Përshkrimi</label>
          <div className="relative">
            <Info className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none border border-slate-100 focus:border-emerald-500 transition-all"
              placeholder="Detaje rreth aktivitetit..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="lg:col-span-3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all text-xs uppercase tracking-widest shadow-lg shadow-emerald-100">
          Publiko Aktivitetin
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;