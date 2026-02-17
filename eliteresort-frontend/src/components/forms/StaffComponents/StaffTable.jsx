import { Trash2, Users, Briefcase, Phone } from "lucide-react";

const StaffTable = ({ staff, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <th className="pb-4 pl-6">Informacioni i Punonjësit</th>
            <th className="pb-4">Pozita / Role</th>
            <th className="pb-4">Kontakt</th>
            <th className="pb-4 text-right pr-6">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr 
              key={s.id} 
              className="group hover:bg-slate-50 transition-all bg-white shadow-sm border border-slate-100 rounded-3xl"
            >
              <td className="py-5 pl-6">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                    <Users size={16} />
                  </div>
                  <span className="font-bold text-slate-700">{s.name || s.fullName}</span>
                </div>
              </td>
              <td className="py-5">
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                  {s.role}
                </span>
              </td>
              <td className="py-5">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                  <Phone size={14} /> {s.phoneNumber || "Nuk ka numër"}
                </div>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;