import { useState } from "react";
import api from "../../../api/axiosInstance";
import { Mountain, DollarSign, MapPin, Info } from "lucide-react";

const ActivityForm = ({ onActivityAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/Activities", {
        ...formData,
        price: parseFloat(formData.price)
      });
      alert("Aktiviteti u shtua me sukses!");
      onActivityAdded();
      setFormData({ name: "", description: "", location: "", price: "" });
    } catch (err) {
      alert("Gabim gjatë shtimit të aktivitetit.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8 text-left">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
          <Mountain size={20} />
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Regjistro Aktivitet të Ri</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 text-left">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Emri i Aktivitetit</label>
          <input 
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all text-left"
            placeholder="Psh. Mountain Biking"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        <div className="space-y-2 text-left">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Çmimi ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              type="number"
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500 transition-all text-left"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Lokacioni</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500 transition-all text-left"
              placeholder="Psh. North Slope"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">Përshkrimi</label>
          <div className="relative">
            <Info className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500 transition-all text-left"
              placeholder="Detaje të shkurtra..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="md:col-span-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg text-xs uppercase tracking-widest">
          Shto Aktivitetin në Resort
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;