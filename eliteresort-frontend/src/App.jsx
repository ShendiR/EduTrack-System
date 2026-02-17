import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideBar from "./components/layout/Sidebar";
import NavBar from "./components/layout/Navbar";

// Importet e faqeve
import Dashboard from "./pages/Dashboard/Dashboard";
import GuestList from "./pages/Guests/GuestList";
import RoomList from "./pages/Rooms/RoomList";
import RoomTypeList from "./pages/RoomTypes/RoomTypeList";
import MenuList from "./pages/Restaurant/MenuList";
import BookingList from "./pages/Bookings/BookingList";
import Login from "./pages/Auth/Login";
import AmenityList from "./pages/Amenities/AmenityList";
import PaymentList from "./pages/Payments/PaymentList";
import StaffList from './pages/Staff/StaffList';
import SpaList from './pages/Spa/SpaList';
import ActivityList from './pages/Activities/ActivityList';

// SIGUROHU QE KETA EMRA PERPUTHEN ME FOLDERS TUAJ ✅
import EventList from "./pages/Events/EventList";
import TableList from "./pages/Restaurant/Tables/TableList";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Rruga për Login */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />

        {/* Layout kryesor */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex min-h-screen bg-[#FAFAFA]">
                <SideBar />

                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                  <NavBar />

                  <main className="flex-1 overflow-y-auto p-8">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      
                      {/* --- MANAGEMENT GROUP --- */}
                      <Route path="/bookings" element={<BookingList />} />
                      <Route path="/guests" element={<GuestList />} />
                      <Route path="/payments" element={<PaymentList />} />
                      
                      {/* ROUTE E EVENTEVE ✅ */}
                      <Route path="/events" element={<EventList />} />

                      {/* --- ACCOMMODATIONS --- */}
                      <Route path="/rooms" element={<RoomList />} />
                      <Route path="/room-types" element={<RoomTypeList />} />
                      <Route path="/amenities" element={<AmenityList />} />

                      {/* --- SERVICES --- */}
                      <Route path="/restaurant" element={<MenuList />} />
                      <Route path="/tables" element={<TableList />} />

                      <Route path="/staff" element={<StaffList />} />
                      <Route path="/spa" element={<SpaList />} />
                      <Route path="/activities" element={<ActivityList />} />

                      {/* Catch-all - kthehu ne dashboard nese path nuk ekziston */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;