import { useState } from "react";
import api from "../../../api/axiosInstance";
import { Sparkles, DollarSign, Clock, FileText } from "lucide-react";

const SpaForm = ({ onServiceAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/SpaServices", {
        ...formData,
        price: parseFloat(formData.price) 
      });
      alert("Shërbimi u shtua me sukses!");
      onServiceAdded();
      setFormData({ name: "", description: "", price: "", duration: "" });
    } catch (err) {
      console.error("Gabim:", err.response?.data);
      alert("Gabim gjatë shtimit të shërbimit.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8 text-left">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
          <Sparkles size={20} />
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Shto Shërbim Spa</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Emri i Shërbimit</label>
          <input 
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-purple-500 transition-all"
            placeholder="Psh. Swedish Massage"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Çmimi ($)</label>
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

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Kohëzgjatja</label>
          <div className="relative">
            <Clock className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500 transition-all"
              placeholder="Psh. 60 min"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Përshkrimi</label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500 transition-all"
              placeholder="Përshkrim i shkurtër..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="md:col-span-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-purple-600 transition-all shadow-lg text-xs uppercase tracking-widest mt-2">
          Shto në Listën Premium
        </button>
      </form>
    </div>
  );
};

export default SpaForm;