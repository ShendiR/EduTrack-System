import { Plus } from "lucide-react";

const GuestForm = ({ newGuest, setNewGuest, onAdd }) => (
  <div className="lg:col-span-1">
    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
      New Registration
    </h2>
    <form onSubmit={onAdd} className="space-y-4">
      <input
        placeholder="First Name"
        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900/5"
        value={newGuest.firstName}
        onChange={(e) =>
          setNewGuest({ ...newGuest, firstName: e.target.value })
        }
        required
      />
      <input
        placeholder="Last Name"
        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900/5"
        value={newGuest.lastName}
        onChange={(e) => setNewGuest({ ...newGuest, lastName: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900/5"
        value={newGuest.email}
        onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
        required
      />
      <button
        type="submit"
        className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm shadow-sm"
      >
        <Plus size={16} /> Add Guest
      </button>
    </form>
  </div>
);

export default GuestForm;
