import { Trash2, Soup, Pizza, Wine, Cake } from "lucide-react";

const getIcon = (category) => {
  switch(category) {
    case 'Starters': return <Soup size={18} />;
    case 'Main Course': return <Pizza size={18} />;
    case 'Beverages': return <Wine size={18} />;
    case 'Desserts': return <Cake size={18} />;
    default: return <Soup size={18} />;
  }
};

const MenuItemTable = ({ items, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        <tr className="text-left text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          <th className="pb-4 pl-6">Exquisite Dish</th>
          <th className="pb-4">Category</th>
          <th className="pb-4">Price</th>
          <th className="pb-4 text-right pr-6">Management</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          // Këtu kontrollojmë si id ashtu edhe Id
          <tr key={item.id || item.Id} className="group hover:bg-slate-50/50 transition-all bg-white shadow-sm border border-slate-100 rounded-3xl">
            <td className="py-5 pl-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  {getIcon(item.category || item.Category)}
                </div>
                <span className="font-bold text-slate-700">{item.name || item.Name}</span>
              </div>
            </td>
            <td className="py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {item.category || item.Category}
            </td>
            <td className="py-5 font-mono font-bold text-slate-900">
                ${item.price || item.Price}
            </td>
            <td className="py-5 text-right pr-6">
              <button 
                // KETU dërgojmë ID-në e saktë te funksioni onDelete
                onClick={() => onDelete(item.id || item.Id)} 
                className="text-slate-200 hover:text-red-500 p-2 transition-all cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MenuItemTable;