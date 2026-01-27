import { Trash2, Bed } from "lucide-react";

const RoomTable = ({ rooms, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-2">
      <thead>
        <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          <th className="pb-6 pl-6">Room</th>
          <th className="pb-6">Price</th>
          <th className="pb-6 text-right pr-6">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {rooms.length > 0 ? rooms.map((room) => (
          <tr key={room.id} className="group hover:bg-slate-50/80 transition-all duration-300">
            <td className="py-6 pl-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-all"><Bed size={20} /></div>
                <div><div className="font-bold text-slate-800 text-sm">Room {room.roomNumber}</div></div>
              </div>
            </td>
            <td className="py-6 text-sm font-mono text-slate-900 font-bold">${room.pricePerNight}</td>
            <td className="py-6 text-right pr-6">
              <button onClick={() => onDelete(room.id)} className="text-slate-200 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all cursor-pointer"><Trash2 size={18} /></button>
            </td>
          </tr>
        )) : (
          <tr><td colSpan="3" className="py-32 text-center text-slate-300 text-[10px] font-bold tracking-[0.5em] uppercase italic">No Rooms Found</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

export default RoomTable;
