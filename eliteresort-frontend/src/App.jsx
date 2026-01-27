import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import GuestList from './pages/Guests/GuestList';
import RoomList from './pages/Rooms/RoomList';
import MenuList from './pages/Restaurant/MenuList';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar qëndron fiks në të majtë */}
        <Sidebar />

        {/* Pjesa kryesore e përmbajtjes */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/guests" element={<GuestList />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/restaurant" element={<MenuList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;