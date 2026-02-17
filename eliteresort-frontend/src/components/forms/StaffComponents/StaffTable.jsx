import React from 'react';
import { Trash2, Users, Briefcase, DollarSign, Calendar } from "lucide-react";

const StaffTable = ({ staff, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-4 text-left">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <th className="pb-4 pl-6">Punonjësi</th>
            <th className="pb-4">Pozita</th>
            <th className="pb-4">Paga</th>
            <th className="pb-4 text-right pr-6">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {staff.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-10 text-slate-400 italic bg-white rounded-3xl border border-dashed border-slate-200">
                Nuk u gjet asnjë punonjës.
              </td>
            </tr>
          ) : (
            staff.map((s) => (
              <tr key={s.id} className="group hover:bg-slate-50 transition-all bg-white shadow-sm border border-slate-100 rounded-3xl">
                <td className="py-5 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600 font-bold">
                      <Users size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{s.firstName} {s.lastName}</span>
                      <span className="text-[10px] text-slate-400 italic">ID: #{s.id}</span>
                    </div>
                  </div>
                </td>
                <td className="py-5">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                    {s.role}
                  </span>
                </td>
                <td className="py-5 font-mono font-bold text-slate-600">
                  ${s.salary?.toLocaleString()}
                </td>
                <td className="py-5 text-right pr-6">
                  <button 
                    onClick={() => onDelete(s.id)} 
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

export default StaffTable;