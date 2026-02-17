import { useState } from "react";
import api from "../../../api/axiosInstance";
import { UserPlus, Briefcase, Phone, DollarSign } from "lucide-react";

const StaffForm = ({ onStaffAdded }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    phoneNumber: "",
    salary: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        salary: parseFloat(formData.salary), // .NET kërkon decimal
        isActive: true,
        hireDate: new Date().toISOString()
      };

      await api.post("/Staff", payload);
      alert("Punonjësi u shtua me sukses!");
      onStaffAdded(); // Rifreskon tabelën automatikisht
      setFormData({ firstName: "", lastName: "", role: "", phoneNumber: "", salary: "" });
    } catch (err) {
      console.error("Gabimi:", err.response?.data);
      alert("Gabim: Kontrolloni nëse të gjitha fushat janë plotësuar saktë.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8 text-left">
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
        <UserPlus size={18} className="text-indigo-600" /> Regjistrim i Ri i Stafit
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Emri</label>
          <input 
            className="bg-slate-50 p-4 rounded-2xl outline-none border border-slate-100 focus:border-indigo-500 transition-all"
            placeholder="Psh. Agon"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Mbiemri</label>
          <input 
            className="bg-slate-50 p-4 rounded-2xl outline-none border border-slate-100 focus:border-indigo-500 transition-all"
            placeholder="Psh. Gashi"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Pozita (Role)</label>
          <input 
            className="bg-slate-50 p-4 rounded-2xl outline-none border border-slate-100 focus:border-indigo-500 transition-all"
            placeholder="Psh. Manager"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            required 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Paga (Salary)</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              type="number"
              className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none border border-slate-100 focus:border-indigo-500 transition-all"
              placeholder="0.00"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:col-span-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Telefoni</label>
          <div className="relative">
            <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none border border-slate-100 focus:border-indigo-500 transition-all"
              placeholder="+383 4X XXX XXX"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>
        </div>
        
        <button type="submit" className="lg:col-span-3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all text-xs uppercase tracking-widest shadow-lg shadow-indigo-100">
          Ruaj Punonjësin në Sistem
        </button>
      </form>
    </div>
  );
};

export default StaffForm;