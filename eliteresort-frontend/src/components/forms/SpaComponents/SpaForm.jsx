import { useState } from "react";
import api from "../../../api/axiosInstance";
import { Sparkles, DollarSign, Clock, FileText } from "lucide-react";

const SpaForm = ({ onServiceAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    durationMinutes: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        durationMinutes: parseInt(formData.durationMinutes), // Konvertimi në INT
        isActive: true
      };

      await api.post("/SpaServices", payload);
      alert("Shërbimi u shtua me sukses!");
      onServiceAdded();
      setFormData({ name: "", description: "", price: "", durationMinutes: "" });
    } catch (err) {
      console.error("Gabim:", err.response?.data);
      alert("Gabim gjatë shtimit të shërbimit.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8 text-left">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg text-purple-700 font-bold">
          <Sparkles size={20} />
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Shto Shërbim Spa</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Emri i Shërbimit</label>
          <input 
            className="bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-purple-500 transition-all"
            placeholder="Psh. Masazh Suedez"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Çmimi ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              type="number"
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500 transition-all"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Kohëzgjatja (Minuta)</label>
          <div className="relative">
            <Clock className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              type="number"
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500 transition-all"
              placeholder="Psh. 60"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({...formData, durationMinutes: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:col-span-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Përshkrimi</label>
          <input 
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-purple-500 transition-all"
            placeholder="Përshkrim i shkurtër i shërbimit..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button type="submit" className="lg:col-span-3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-purple-600 transition-all shadow-lg text-xs uppercase tracking-widest mt-2">
          Shto në Menu
        </button>
      </form>
    </div>
  );
};

export default SpaForm;