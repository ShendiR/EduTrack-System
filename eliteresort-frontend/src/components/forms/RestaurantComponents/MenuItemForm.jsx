import { Plus, Utensils } from "lucide-react";

const MenuItemForm = ({ newItem, setNewItem, onAdd }) => (
  <div className="animate-in fade-in duration-700">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-amber-500 p-2 rounded-lg text-white"><Utensils size={20} /></div>
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Add New Dish</h2>
    </div>
    <form onSubmit={onAdd} className="space-y-5">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Dish Name</label>
        <input 
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 transition-all mt-1"
          value={newItem.Name} 
          onChange={(e) => setNewItem({...newItem, Name: e.target.value})} 
          required 
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
        <select 
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 transition-all mt-1 appearance-none cursor-pointer"
          value={newItem.Category} 
          onChange={(e) => setNewItem({...newItem, Category: e.target.value})} 
          required
        >
          <option value="">Select Category</option>
          <option value="Starters">Starters</option>
          <option value="Main Course">Main Course</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
        <input 
          type="number" step="0.01"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 transition-all mt-1 font-mono"
          value={newItem.Price} 
          onChange={(e) => setNewItem({...newItem, Price: e.target.value})} 
          required 
        />
      </div>
      <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] shadow-lg mt-4">
        <Plus size={16} /> Add to Menu
      </button>
    </form>
  </div>
);

export default MenuItemForm;