import { Plus, Hotel, ChevronDown } from "lucide-react";

const RoomForm = ({ newRoom, setNewRoom, onAdd }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-slate-900 p-2 rounded-lg text-white">
        <Hotel size={20} />
      </div>
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
        New Accommodation
      </h2>
    </div>

    <form onSubmit={onAdd} className="space-y-6">
      {/* Room Number Input */}
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Room Number
        </label>
        <input 
          placeholder="e.g. 101"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 font-medium"
          value={newRoom.roomNumber} 
          onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})} 
          required 
        />
      </div>

      {/* Category Select - KËTU ISHTE GABIMI ME ID-të */}
      <div className="relative">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Room Category
        </label>
        <select 
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 appearance-none cursor-pointer font-medium"
          value={newRoom.roomTypeId} 
          onChange={(e) => setNewRoom({...newRoom, roomTypeId: e.target.value})} 
          required
        >
          <option value="">Select Category</option>
          <option value="1">Standard</option>
          <option value="2">Deluxe</option>
          <option value="3">Suite</option>
        </select>
        <ChevronDown className="absolute right-4 top-10 text-slate-300 pointer-events-none" size={16} />
      </div>

      {/* Price Input */}
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Price Per Night
        </label>
        <input 
          type="number"
          placeholder="0.00"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 font-mono"
          value={newRoom.pricePerNight} 
          onChange={(e) => setNewRoom({...newRoom, pricePerNight: e.target.value})} 
          required 
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 mt-4"
      >
        <Plus size={16} /> Register Room
      </button>
    </form>
  </div>
);

export default RoomForm;