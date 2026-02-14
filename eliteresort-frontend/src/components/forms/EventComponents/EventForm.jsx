import React from "react";
import { Plus, Calendar } from "lucide-react";

const EventForm = ({ newEvent, setNewEvent, onAdd }) => {
  
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl mb-12 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-600 p-2 rounded-xl text-white">
          <Calendar size={20} />
        </div>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
          Schedule Elite Event
        </h2>
      </div>

      <form onSubmit={onAdd} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Event Name
          </label>
          <input 
            className="w-full bg-slate-800 border-none p-4 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-amber-500 transition-all"
            placeholder="Gala Dinner..."
            value={newEvent.title || ""} 
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
            required 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Date & Time
          </label>
          <input 
            type="datetime-local"
            className="w-full bg-slate-800 border-none p-4 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-amber-500 transition-all"
            value={formatDateTimeForInput(newEvent.eventDate)} 
            onChange={(e) => setNewEvent({...newEvent, eventDate: e.target.value})} 
            required 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Location
          </label>
          <input 
            className="w-full bg-slate-800 border-none p-4 rounded-2xl text-white text-sm outline-none focus:ring-1 focus:ring-amber-500 transition-all"
            placeholder="Grand Ballroom"
            value={newEvent.location || ""} 
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} 
            required 
          />
        </div>

        <button type="submit" className="md:col-span-3 bg-amber-600 text-white font-bold py-4 rounded-2xl hover:bg-amber-500 transition-all uppercase text-[11px] tracking-[0.3em] mt-2 shadow-lg shadow-amber-900/40 cursor-pointer border-none">
          <Plus size={18} className="inline mr-2 mb-1" /> Create Grand Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;