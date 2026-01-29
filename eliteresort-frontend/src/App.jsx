import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import GuestList from "./pages/Guests/GuestList";
import RoomList from "./pages/Rooms/RoomList";
import MenuList from "./pages/Restaurant/MenuList";
import BookingList from "./pages/Bookings/BookingList";
import RoomTypeList from "./pages/RoomTypes/RoomTypeList";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* 1. Sidebar qëndron fiks në të majtë */}
        <Sidebar />

        {/* 2. Krijuam një div të ri që mban Navbar-in dhe Main Content vertikalisht */}
        <div className="flex-1 flex flex-col">
          {/* Navbar vendoset këtu, sipër Routes */}
          <Navbar />

          {/* Main Content me padding që të mos ngjitet me Navbarin */}
          <main className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/guests" element={<GuestList />} />
              <Route path="/rooms" element={<RoomList />} />
              <Route path="/room-types" element={<RoomTypeList />} />
              <Route path="/restaurant" element={<MenuList />} />
              <Route path="/bookings" element={<BookingList />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
