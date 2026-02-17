import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, UserPlus } from 'lucide-react';

const StaffList = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7247/api/Staff')
            .then(res => setStaff(res.data))
            .catch(err => console.error("Error te Stafi:", err));
    }, []);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Menaxhimi i Stafit</h2>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-all">
                    <UserPlus size={18} /> Shto Punonjës
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {staff.map((s) => (
                    <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{s.fullName || s.name}</h3>
                                <p className="text-sm text-slate-500 font-medium uppercase tracking-tighter">{s.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffList;