import { User, Mail, Trash2 } from "lucide-react";

const GuestTable = ({ guests, onDelete }) => (
  <div className="lg:col-span-2 overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <th className="pb-4">Guest</th>
          <th className="pb-4">Contact</th>
          <th className="pb-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {guests.length > 0 ? (
          guests.map((guest) => (
            <tr
              key={guest.id}
              className="group hover:bg-slate-50/50 transition-colors"
            >
              <td className="py-5 flex items-center gap-3 font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User size={14} />
                </div>
                {guest.firstName} {guest.lastName}
              </td>
              <td className="py-5 text-sm text-slate-500 font-mono italic">
                <Mail size={12} className="inline mr-1 opacity-40" />{" "}
                {guest.email}
              </td>
              <td className="py-5 text-right">
                <button
                  onClick={() => onDelete(guest.id)}
                  className="text-slate-300 hover:text-red-500 p-2 cursor-pointer transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="3"
              className="py-20 text-center text-slate-300 text-sm italic"
            >
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default GuestTable;
