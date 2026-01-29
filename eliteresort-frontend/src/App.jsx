import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";


// Importet e faqeve
import Dashboard from "./pages/Dashboard/Dashboard";
import GuestList from "./pages/Guests/GuestList";
import RoomList from "./pages/Rooms/RoomList";
import RoomTypeList from "./pages/RoomTypes/RoomTypeList";
import MenuList from "./pages/Restaurant/MenuList";
import BookingList from "./pages/Bookings/BookingList";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#FAFAFA]">
        <Sidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
         
          <div className="flex-1 overflow-y-auto p-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<BookingList />} />
              <Route path="/guests" element={<GuestList />} />
              <Route path="/rooms" element={<RoomList />} />
              <Route path="/room-types" element={<RoomTypeList />} />
              <Route path="/restaurant" element={<MenuList />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;