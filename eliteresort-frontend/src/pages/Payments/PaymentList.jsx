import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { RotateCw, AlertCircle } from "lucide-react";
import PaymentForm from "../../components/forms/PaymentComponents/PaymentForm";
import PaymentTable from "../../components/forms/PaymentComponents/PaymentTable";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    amount: "",
    paymentMethod: "",
    status: "Paid",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPayments = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await api.get("/Payments");
      // Sigurohemi që kapim të dhënat saktë edhe nëse vijnë si $values
      const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
      setPayments(data);
    } catch (error) {
      setErrorMessage("Failed to load records.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        amount: parseFloat(newPayment.amount),
        paymentMethod: newPayment.paymentMethod,
        status: "Completed",
        paymentDate: new Date().toISOString(),
      };
      await api.post("/Payments", payload);
      setNewPayment({ amount: "", paymentMethod: "", status: "Paid" });
      fetchPayments();
    } catch (error) {
      setErrorMessage("Error recording transaction.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this payment record?")
    ) {
      try {
        // Thirrja e saktë api/Payments/{id}
        await api.delete(`/Payments/${id}`);
        fetchPayments(); // Rifreskon tabelën pas fshirjes
      } catch (error) {
        console.error("Delete error:", error);
        setErrorMessage("Could not delete the record. It might not exist.");
      }
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif italic text-slate-900">
            Financial Ledger
          </h1>
          {errorMessage && (
            <div className="flex items-center gap-2 text-red-600 mt-2 text-sm font-medium">
              <AlertCircle size={16} /> {errorMessage}
            </div>
          )}
        </div>
        <button
          onClick={fetchPayments}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 uppercase text-xs font-bold tracking-widest cursor-pointer bg-transparent border-none"
        >
          <RotateCw size={14} className={isLoading ? "animate-spin" : ""} />{" "}
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <PaymentForm
            newPayment={newPayment}
            setNewPayment={setNewPayment}
            onAdd={handleAddPayment}
          />
        </div>
        <div className="lg:col-span-8">
          <PaymentTable payments={payments} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
