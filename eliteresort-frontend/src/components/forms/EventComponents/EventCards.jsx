import React from "react";
import { Trash2, MapPin, Clock, CalendarDays } from "lucide-react";

const EventCard = ({ events, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {events && events.map((event) => (
        <div key={event.id} className="bg-white rounded-[2.5rem] border border-slate-100 flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 group relative">
          
          <div className="bg-slate-50 p-6 flex justify-between items-center group-hover:bg-slate-900 transition-colors duration-500">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-slate-800 text-amber-600">
                   <CalendarDays size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-amber-500">Date Scheduled</p>
                   <p className="text-sm font-bold text-slate-800 group-hover:text-white">
                      {event.eventDate 
                        ? new Date(event.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
                        : "No Date"}
                   </p>
                </div>
             </div>
             <button 
              onClick={() => onDelete(event.id)} 
              className="p-2 text-slate-200 hover:text-rose-500 bg-transparent border-none cursor-pointer transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="p-8">
            <h3 className="text-3xl font-serif italic text-slate-800 mb-6 group-hover:text-amber-600 transition-colors">
              {event.title}
            </h3>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <MapPin size={14} className="text-amber-500" /> 
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <Clock size={14} className="text-amber-500" /> 
                {event.eventDate 
                  ? new Date(event.eventDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  : "--:--"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;