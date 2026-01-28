import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Plus, RotateCw, X } from "lucide-react";
import BookingForm from "../../components/forms/BookingComponents/BookingForm";
import BookingTable from "../../components/forms/BookingComponents/BookingTable";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // Logjika për shfaqjen e formës

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Bookings");
      // Sigurohemi që të dhënat janë në formatin e duhur
      setBookings(Array.isArray(res.data) ? res.data : res.data.$values || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (
      window.confirm("A jeni të sigurt që dëshironi të anuloni këtë rezervim?")
    ) {
      try {
        await api.delete(`/Bookings/${id}`);
        fetchBookings(); // Rifreskon listën pas fshirjes
      } catch (err) {
        alert("Gabim gjatë fshirjes së rezervimit.");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header-i i faqes */}
      <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-8">
        <div>
          <span className="text-[10px] font-bold tracking-[0.5em] text-amber-600 uppercase">
            Management System
          </span>
          <h1 className="text-5xl font-serif italic text-slate-900 mt-2">
            Room Reservations
          </h1>
        </div>

        <div className="flex gap-4">
          <button
            onClick={fetchBookings}
            className="p-3 text-slate-400 hover:text-amber-600 transition-all bg-white rounded-xl shadow-sm border border-slate-100"
          >
            <RotateCw size={20} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => setShowForm(!showForm)}
            className={`${
              showForm ? "bg-slate-800" : "bg-amber-600"
            } text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-lg font-bold text-xs uppercase tracking-widest`}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Close" : "New Reservation"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Seksioni i Formës (Shfaqet vetëm kur shtypet butoni) */}
        {showForm && (
          <div className="bg-white p-8 rounded-4xl shadow-xl border border-amber-50 animate-in fade-in slide-in-from-top-4 duration-500">
            <BookingForm
              onBookingSuccess={() => {
                fetchBookings();
                setShowForm(false); // Mbyll formën pas suksesit
              }}
            />
          </div>
        )}

        {/* Tabela e Rezervimeve */}
        <div className="bg-white rounded-4xl p-4 shadow-sm border border-slate-100">
          {loading && bookings.length === 0 ? (
            <div className="py-20 text-center text-slate-400 italic">
              Loading reservations...
            </div>
          ) : (
            <BookingTable bookings={bookings} onDelete={handleDeleteBooking} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
