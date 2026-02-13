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
import AmenityList from "./pages/Amenities/AmenityList"; // Importi eshte OK ✅
import PaymentList from "./pages/Payments/PaymentList";

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

        {/* Mbrojtja e të gjitha rrugëve të tjera */}
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
                      <Route path="/bookings" element={<BookingList />} />
                      <Route path="/guests" element={<GuestList />} />
                      <Route path="/payments" element={<PaymentList />} />
                      <Route path="/rooms" element={<RoomList />} />
                      <Route path="/room-types" element={<RoomTypeList />} />
                      <Route path="/restaurant" element={<MenuList />} />

                      {/* KETU ISHTE MANGEESIA - E SHTUAM TANI ✅ */}
                      <Route path="/amenities" element={<AmenityList />} />

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
