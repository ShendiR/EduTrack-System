import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sparkles, Plus } from 'lucide-react';

const SpaList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7247/api/SpaServices')
            .then(res => setServices(res.data))
            .catch(err => console.error("Error te Spa:", err));
    }, []);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Shërbimet Spa</h2>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-all">
                    <Plus size={18} /> Shto Shërbim
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                    <div key={service.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Sparkles className="text-indigo-500" size={24} />
                            <div>
                                <h3 className="font-bold text-slate-800">{service.name}</h3>
                                <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Premium Service</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-indigo-600">${service.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpaList;