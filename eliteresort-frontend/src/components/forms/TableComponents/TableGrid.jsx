import React from "react";
import { Trash2, Users, Utensils, CheckCircle2, XCircle } from "lucide-react";

const TableGrid = ({ tables, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      {tables && tables.length > 0 ? (
        tables.map((table) => (
          <div key={table.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative group overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 ${!table.isAvailable ? 'bg-rose-500' : 'bg-emerald-500'}`} />

            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${!table.isAvailable ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                <Utensils size={24} />
              </div>
              <button onClick={() => onDelete(table.id)} className="text-slate-200 hover:text-rose-500 transition-colors bg-transparent border-none cursor-pointer p-2">
                <Trash2 size={20} />
              </button>
            </div>

            <h3 className="text-2xl font-serif italic text-slate-800">No. {table.tableNumber}</h3>
            
            <div className="flex items-center gap-2 mt-2 text-slate-400">
              <Users size={14} /> 
              <span className="text-[10px] font-bold uppercase tracking-widest">Seats: {table.capacity}</span>
            </div>

            <div className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-2xl w-fit ${!table.isAvailable ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {!table.isAvailable ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
              <span className="text-[10px] font-black uppercase tracking-[0.1em]">
                {table.isAvailable ? 'Available' : 'Occupied'}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
          <p className="text-slate-400 font-serif italic">No tables registered on floor plan.</p>
        </div>
      )}
    </div>
  );
};

export default TableGrid;

