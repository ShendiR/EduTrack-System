import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        Elite Resort
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="block p-3 hover:bg-slate-800 rounded">Dashboard</Link>
        <Link to="/guests" className="block p-3 hover:bg-slate-800 rounded">Guests</Link>
        <Link to="/rooms" className="block p-3 hover:bg-slate-800 rounded">Rooms</Link>
        <Link to="/restaurant" className="block p-3 hover:bg-slate-800 rounded">Restaurant</Link>
      </nav>
      <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
        © 2026 Admin Panel
      </div>
    </div>
  );
};

export default Sidebar;