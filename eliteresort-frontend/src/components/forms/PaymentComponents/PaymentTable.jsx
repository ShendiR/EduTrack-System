import { Trash2, ReceiptText } from "lucide-react";

const PaymentTable = ({ payments, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-2">
      <thead>
        <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          <th className="pb-6 pl-6">Transaction Details</th>
          <th className="pb-6">Date</th>
          <th className="pb-6">Amount</th>
          <th className="pb-6 text-right pr-6">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <tr
              key={payment.id}
              className="group hover:bg-slate-50/80 transition-all duration-300"
            >
              <td className="py-6 pl-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <ReceiptText size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm font-serif italic">
                      {payment.paymentMethod || "General Payment"}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">
                      Ref ID: #{payment.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-6 text-[11px] text-slate-500 font-medium uppercase tracking-tighter">
                {new Date(payment.paymentDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="py-6 text-sm font-mono text-emerald-600 font-bold">
                +€{payment.amount?.toFixed(2)}
              </td>
              <td className="py-6 text-right pr-6">
                <button
                  onClick={() => onDelete(payment.id)}
                  className="text-slate-200 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all cursor-pointer border-none bg-transparent"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="py-32 text-center text-slate-300 text-[10px] font-bold tracking-[0.5em] uppercase italic"
            >
              No Transactions Recorded
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default PaymentTable;
