import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mountain, Plus } from 'lucide-react';

const ActivityList = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7247/api/Activities')
            .then(res => setActivities(res.data))
            .catch(err => console.error("Error te Aktivitetet:", err));
    }, []);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Aktivitetet e Resortit</h2>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-all">
                    <Plus size={18} /> Shto Aktivitet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activities.map((act) => (
                    <div key={act.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
                        <div className="w-full h-32 bg-slate-50 rounded-xl mb-4 flex items-center justify-center text-slate-300">
                            <Mountain size={48} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">{act.name}</h3>
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-sm text-slate-500 font-medium italic">Lidhur me lokacionin</span>
                            <span className="font-bold text-indigo-600">${act.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityList;