import { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { Calendar, User, Home } from "lucide-react";

const BookingForm = ({ onBookingSuccess }) => {
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({
    GuestId: "",
    RoomId: "",
    CheckInDate: "",
    CheckOutDate: "",
  });

  // Marrim dhomat dhe klientët nga API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, guestsRes] = await Promise.all([
          api.get("/Rooms"),
          api.get("/Guests"),
        ]);

        // Handling data formats from .NET (supporting both flat arrays and $values)
        setRooms(
          Array.isArray(roomsRes.data)
            ? roomsRes.data
            : roomsRes.data.$values || [],
        );
        setGuests(
          Array.isArray(guestsRes.data)
            ? guestsRes.data
            : guestsRes.data.$values || [],
        );
      } catch (err) {
        console.error("Error loading selection data:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      GuestId: parseInt(formData.GuestId),
      RoomId: parseInt(formData.RoomId),
      CheckInDate: formData.CheckInDate,
      CheckOutDate: formData.CheckOutDate,
      Status: "Pending",
      TotalPrice: 0,
    };

    try {
      await api.post("/Bookings", payload);
      alert("Rezervimi u krye me sukses!");
      onBookingSuccess();
      setFormData({
        GuestId: "",
        RoomId: "",
        CheckInDate: "",
        CheckOutDate: "",
      });
    } catch (err) {
      console.log("Error detajet:", err.response?.data);
      alert("Gabim: " + (err.response?.data || "Kontrolloni të dhënat"));
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
          <Calendar size={20} />
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
          New Reservation
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Select Guest */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">
            Select Guest
          </label>
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={18} />
            <select
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-amber-500 transition-all appearance-none"
              value={formData.GuestId}
              onChange={(e) =>
                setFormData({ ...formData, GuestId: e.target.value })
              }
              required
            >
              <option value="">Choose a guest...</option>
              {guests.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.firstName} {g.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Room */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">
            Select Room
          </label>
          <div className="relative">
            <Home className="absolute left-4 top-4 text-slate-400" size={18} />
            <select
              className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-amber-500 transition-all appearance-none"
              value={formData.RoomId}
              onChange={(e) =>
                setFormData({ ...formData, RoomId: e.target.value })
              }
              required
            >
              <option value="">Select available room...</option>
              {rooms
                .filter((r) => r.isAvailable)
                .map((r) => (
                  <option key={r.id} value={r.id}>
                    Room {r.roomNumber} - ${r.pricePerNight}/night
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Check-In */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">
            Check-In Date
          </label>
          <input
            type="date"
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-amber-500 transition-all"
            value={formData.CheckInDate}
            onChange={(e) =>
              setFormData({ ...formData, CheckInDate: e.target.value })
            }
            required
          />
        </div>

        {/* Check-Out */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase ml-1">
            Check-Out Date
          </label>
          <input
            type="date"
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-amber-500 transition-all"
            value={formData.CheckOutDate}
            onChange={(e) =>
              setFormData({ ...formData, CheckOutDate: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-amber-600 transition-all shadow-lg text-xs uppercase tracking-widest mt-4"
        >
          Confirm Elite Reservation
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
