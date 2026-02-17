import { Trash2, Mountain, MapPin, DollarSign } from "lucide-react";

const ActivityTable = ({ activities, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <th className="pb-4 pl-6">Aktiviteti</th>
            <th className="pb-4">Lokacioni</th>
            <th className="pb-4">Çmimi</th>
            <th className="pb-4 text-right pr-6">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act) => (
            <tr key={act.id} className="group hover:bg-slate-50 transition-all bg-white shadow-sm border border-slate-100 rounded-3xl">
              <td className="py-5 pl-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                    <Mountain size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">{act.name}</p>
                    <p className="text-[10px] text-slate-400 italic">{act.description || "Pa përshkrim"}</p>
                  </div>
                </div>
              </td>
              <td className="py-5 text-left">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <MapPin size={14} className="text-emerald-400" /> {act.location || "Resort Area"}
                </div>
              </td>
              <td className="py-5 text-left">
                <div className="flex items-center gap-1 text-emerald-700 font-bold">
                  <DollarSign size={14} />{act.price}
                </div>
              </td>
              <td className="py-5 text-right pr-6">
                <button onClick={() => onDelete(act.id)} className="text-slate-200 hover:text-red-500 p-2 transition-all cursor-pointer">
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

export default ActivityTable;