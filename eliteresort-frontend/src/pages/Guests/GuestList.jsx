import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ firstName: '', lastName: '', email: '' });

  const fetchGuests = async () => {
    try {
      const response = await api.get('/Guests');
      setGuests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Gabim gjatë marrjes së të dhënave:", error);
    }
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();
    try {
      // Dërgimi i të dhënave në Backend
      await api.post('/Guests', newGuest);
      // Pastrimi i formës dhe rifreskimi i listës
      setNewGuest({ firstName: '', lastName: '', email: '' });
      fetchGuests(); 
      alert("Mysafiri u shtua me sukses!");
    } catch (error) {
      console.error("Gabim gjatë shtimit:", error);
      alert("Ndodhi një gabim. Kontrollo nese Backend-i është RUN dhe CORS është i lejuar.");
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="space-y-6">
      {/* FORMA E SHTIMIT */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Shto Mysafir të Ri</h2>
        <form onSubmit={handleAddGuest} className="flex gap-4">
          <input
            type="text"
            placeholder="Emri"
            className="border p-2 rounded w-full"
            value={newGuest.firstName}
            onChange={(e) => setNewGuest({ ...newGuest, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Mbiemri"
            className="border p-2 rounded w-full"
            value={newGuest.lastName}
            onChange={(e) => setNewGuest({ ...newGuest, lastName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            value={newGuest.email}
            onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
            required
          />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Shto
          </button>
        </form>
      </div>

      {/* TABELA E REZULTATEVE */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lista e Mysafirëve</h2>
          <button onClick={fetchGuests} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Refresh
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Emri & Mbiemri</th>
              <th className="p-3 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border-b">{guest.firstName} {guest.lastName}</td>
                <td className="p-3 border-b">{guest.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestList;