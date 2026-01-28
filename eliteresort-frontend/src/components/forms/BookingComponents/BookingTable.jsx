import { Trash2, Calendar, CreditCard, User } from "lucide-react";

const BookingTable = ({ bookings, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <th className="pb-4 pl-6">Guest & Stay</th>
            <th className="pb-4">Room Details</th>
            <th className="pb-4">Total Price</th>
            <th className="pb-4 text-right pr-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="group hover:bg-slate-50 transition-all bg-white shadow-sm border border-slate-100 rounded-3xl"
            >
              <td className="py-5 pl-6">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    <User size={14} className="text-amber-600" />
                    {booking.guest?.firstName} {booking.guest?.lastName}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                    <Calendar size={10} />
                    {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </span>
                </div>
              </td>
              <td className="py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-600">
                    Room {booking.room?.roomNumber}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 italic">
                    {booking.room?.isAvailable
                      ? "Status: Ready"
                      : "Status: Occupied"}
                  </span>
                </div>
              </td>
              <td className="py-5">
                <div className="flex items-center gap-2 text-amber-700 font-mono font-bold">
                  <CreditCard size={14} />${booking.totalPrice?.toFixed(2)}
                </div>
              </td>
              <td className="py-5 text-right pr-6">
                <button
                  onClick={() => onDelete(booking.id)}
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

export default BookingTable;
