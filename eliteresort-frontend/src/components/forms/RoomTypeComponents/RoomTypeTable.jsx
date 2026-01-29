import { Trash2, Hash, Tag } from "lucide-react";

const RoomTypeTable = ({ roomTypes, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-2">
      <thead>
        <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          <th className="pb-6 pl-6">ID</th>
          <th className="pb-6">Type Name</th>
          <th className="pb-6">Description</th>
          <th className="pb-6">Base Price</th>
          <th className="pb-6 text-right pr-6">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {roomTypes.length > 0 ? roomTypes.map((type) => (
          <tr key={type.id} className="group hover:bg-slate-50/80 transition-all duration-300">
            <td className="py-6 pl-6 font-mono text-xs font-bold text-slate-400">#{type.id}</td>
            <td className="py-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Tag size={14} />
                </div>
                <div className="font-bold text-slate-800 text-sm uppercase">{type.name}</div>
              </div>
            </td>
            <td className="py-6">
              <p className="text-xs text-slate-400 max-w-[150px] truncate">{type.description || "---"}</p>
            </td>
            <td className="py-6 text-sm font-mono text-slate-900 font-bold">${type.basePrice}</td>
            <td className="py-6 text-right pr-6">
              <button 
                onClick={() => onDelete(type.id)} 
                className="text-slate-200 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan="5" className="py-32 text-center text-slate-300 text-[10px] font-bold tracking-[0.5em] uppercase italic">
              No Categories Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default RoomTypeTable;