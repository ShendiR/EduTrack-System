import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import GuestList from "./pages/Guests/GuestList";
import RoomList from "./pages/Rooms/RoomList";
import MenuList from "./pages/Restaurant/MenuList";
import BookingList from "./pages/Bookings/BookingList";
import RoomTypeList from "./pages/RoomTypes/RoomTypeList";
function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/guests" element={<GuestList />} />
            <Route path="/rooms" element={<RoomList />} />
            {/* 2. SHTO KËTË RRESHT KËTU */}
            <Route path="/room-types" element={<RoomTypeList />} /> 
            <Route path="/restaurant" element={<MenuList />} />
            <Route path="/bookings" element={<BookingList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;