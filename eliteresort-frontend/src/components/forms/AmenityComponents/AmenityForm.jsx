import { Plus, Zap, AlignLeft } from "lucide-react";

const AmenityForm = ({ newAmenity, setNewAmenity, onAdd }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-slate-900 p-2 rounded-lg text-white">
        <Zap size={20} />
      </div>
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
        New Amenity
      </h2>
    </div>

    <form onSubmit={onAdd} className="space-y-6">
      {/* Name Input */}
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Amenity Name
        </label>
        <input 
          placeholder="e.g. High-Speed WiFi"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 font-medium"
          value={newAmenity.name} 
          onChange={(e) => setNewAmenity({...newAmenity, name: e.target.value})} 
          required 
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Description
        </label>
        <textarea 
          placeholder="Describe the amenity..."
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 font-medium h-32 resize-none"
          value={newAmenity.description} 
          onChange={(e) => setNewAmenity({...newAmenity, description: e.target.value})} 
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 mt-4"
      >
        <Plus size={16} /> Register Amenity
      </button>
    </form>
  </div>
);

export default AmenityForm;