import { Trash2, Sparkles, Clock, DollarSign } from "lucide-react";

const SpaTable = ({ services, onDelete }) => {
  return (
    <div className="overflow-x-auto text-left">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <th className="pb-4 pl-6">Sherbimi</th>
            <th className="pb-4">Kohezgjatja</th>
            <th className="pb-4">Çmimi</th>
            <th className="pb-4 text-right pr-6">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="group hover:bg-slate-50 transition-all bg-white shadow-sm border border-slate-100 rounded-3xl">
              <td className="py-5 pl-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-2 rounded-xl text-purple-600">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">{s.name}</p>
                    <p className="text-[10px] text-slate-400 italic">{s.description || "Pa përshkrim"}</p>
                  </div>
                </div>
              </td>
              <td className="py-5">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={14} className="text-purple-400" /> {s.duration || "N/A"}
                </div>
              </td>
              <td className="py-5">
                <div className="flex items-center gap-1 text-purple-700 font-bold">
                  <DollarSign size={14} />{s.price}
                </div>
              </td>
              <td className="py-5 text-right pr-6">
                <button onClick={() => onDelete(s.id)} className="text-slate-200 hover:text-red-500 p-2 transition-all cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpaTable;