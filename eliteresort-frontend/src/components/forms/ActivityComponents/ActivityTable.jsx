import React from 'react';
import { Trash2, Mountain, MapPin, Users, DollarSign, CheckCircle2 } from "lucide-react";

const ActivityTable = ({ activities, onDelete }) => {
  return (
    <div className="overflow-x-auto text-left">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <th className="pb-4 pl-6">Aktiviteti</th>
            <th className="pb-4">Lokacioni & Kapaciteti</th>
            <th className="pb-4">Çmimi</th>
            <th className="pb-4 text-right pr-6">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {activities.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-10 text-slate-400 italic bg-white rounded-3xl border border-dashed border-slate-200">
                Nuk ka aktivitete të regjistruara.
              </td>
            </tr>
          ) : (
            activities.map((act) => (
              <tr key={act.id} className="group hover:bg-slate-50 transition-all bg-white shadow-sm border border-slate-100 rounded-3xl">
                <td className="py-5 pl-6 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                      <Mountain size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{act.title}</span>
                      <span className="text-[10px] text-slate-400 italic line-clamp-1">{act.description || "Pa përshkrim"}</span>
                    </div>
                  </div>
                </td>
                <td className="py-5 text-left text-slate-600">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin size={14} className="text-emerald-500" /> {act.location}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Users size={12} /> MAX: {act.maxParticipants} Persona
                    </div>
                  </div>
                </td>
                <td className="py-5 font-mono font-bold text-emerald-700 text-left">
                  ${act.price?.toLocaleString()}
                </td>
                <td className="py-5 text-right pr-6">
                  <button 
                    onClick={() => onDelete(act.id)} 
                    className="text-slate-200 hover:text-red-500 p-2 transition-all cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;