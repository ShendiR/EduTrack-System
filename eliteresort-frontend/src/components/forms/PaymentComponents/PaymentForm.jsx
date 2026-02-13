import { Plus, CreditCard, ChevronDown } from "lucide-react";

const PaymentForm = ({ newPayment, setNewPayment, onAdd }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-slate-900 p-2 rounded-lg text-white">
        <CreditCard size={20} />
      </div>
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
        New Transaction
      </h2>
    </div>

    <form onSubmit={onAdd} className="space-y-6">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Amount (EUR)
        </label>
        <input
          type="number"
          placeholder="0.00"
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 font-mono font-bold"
          value={newPayment.amount}
          onChange={(e) =>
            setNewPayment({ ...newPayment, amount: e.target.value })
          }
          required
        />
      </div>

      <div className="relative">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
          Payment Method
        </label>
        <select
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all mt-1 appearance-none cursor-pointer font-medium"
          value={newPayment.paymentMethod}
          onChange={(e) =>
            setNewPayment({ ...newPayment, paymentMethod: e.target.value })
          }
          required
        >
          <option value="">Select Method</option>
          <option value="Cash">Cash Payment</option>
          <option value="Card">Credit Card</option>
          <option value="Transfer">Bank Transfer</option>
        </select>
        <ChevronDown
          className="absolute right-4 top-10 text-slate-300 pointer-events-none"
          size={16}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-amber-600 transition-all cursor-pointer flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 mt-4"
      >
        <Plus size={16} /> Authorize Payment
      </button>
    </form>
  </div>
);

export default PaymentForm;
