import { Plus, Layers, AlignLeft, DollarSign } from "lucide-react";

const RoomTypeForm = ({ newRoomType, setNewRoomType, onAdd }) => (
  <div className="animate-in fade-in duration-700">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-slate-900 p-2 rounded-lg text-white"><Layers size={20} /></div>
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Room Categories</h2>
    </div>

    <form onSubmit={onAdd} className="space-y-6">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category Name</label>
        <input 
          placeholder="e.g. Deluxe Suite"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 font-medium"
          value={newRoomType.Name} 
          onChange={(e) => setNewRoomType({...newRoomType, Name: e.target.value})} 
          required 
        />
      </div>

      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
        <textarea 
          placeholder="Enter room details..."
          rows="2"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 font-medium resize-none"
          value={newRoomType.Description} 
          onChange={(e) => setNewRoomType({...newRoomType, Description: e.target.value})} 
        />
      </div>

      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Base Price ($)</label>
        <div className="relative mt-1">
          <input 
            type="number"
            placeholder="0.00"
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all font-mono"
            value={newRoomType.BasePrice} 
            onChange={(e) => setNewRoomType({...newRoomType, BasePrice: e.target.value})} 
            required 
          />
          <DollarSign className="absolute right-4 top-4 text-slate-300" size={16} />
        </div>
      </div>

      <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 mt-4">
        <Plus size={16} /> Save Room Type
      </button>
    </form>
  </div>
);

export default RoomTypeForm;