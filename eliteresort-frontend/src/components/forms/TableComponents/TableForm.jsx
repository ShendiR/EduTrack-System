import React from "react";
import { Plus, Utensils } from "lucide-react";

const TableForm = ({ newTable, setNewTable, onAdd }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-fit font-sans">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-slate-900 p-2 rounded-lg text-white"><Utensils size={20} /></div>
      <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Add Table</h2>
    </div>

    <form onSubmit={onAdd} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Table Number</label>
        <input 
          type="number" 
          placeholder="e.g. 5"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:border-amber-500 transition-all"
          value={newTable.tableNumber} 
          onChange={(e) => setNewTable({...newTable, tableNumber: e.target.value})} 
          required 
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Capacity</label>
        <input 
          type="number" 
          placeholder="e.g. 4"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:border-amber-500 transition-all"
          value={newTable.capacity} 
          onChange={(e) => setNewTable({...newTable, capacity: e.target.value})} 
          required 
        />
      </div>
      <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-amber-600 transition-all text-[11px] uppercase tracking-widest border-none cursor-pointer">
        <Plus size={16} className="inline mr-2" /> Register Table
      </button>
    </form>
  </div>
);

export default TableForm;