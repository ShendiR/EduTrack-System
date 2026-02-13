import { Trash2, Zap } from "lucide-react";

const AmenityTable = ({ amenities, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-2 text-left">
      <thead>
        <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          <th className="pb-6 pl-6">Amenity</th>
          <th className="pb-6">Description</th>
          <th className="pb-6 text-right pr-6">Action</th>
        </tr>
      </thead>
      <tbody>
        {amenities.map((amenity) => (
          <tr key={amenity.id} className="group hover:bg-slate-50 transition-all">
            <td className="py-6 pl-6">
              <div className="flex items-center gap-4">
                <Zap size={20} className="text-slate-400" />
                <span className="font-bold text-slate-800">{amenity.name}</span>
              </div>
            </td>
            <td className="py-6 text-sm text-slate-500">{amenity.description}</td>
            <td className="py-6 text-right pr-6">
              <button 
                type="button"
                onClick={() => onDelete(amenity.id)} // SIGURUHU QE ESHTE KESHTU
                className="text-slate-300 hover:text-red-500 p-2 transition-all cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AmenityTable;