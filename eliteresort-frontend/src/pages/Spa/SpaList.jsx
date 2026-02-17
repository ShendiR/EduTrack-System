import React, { useEffect, useState } from 'react';
import api from "../../api/axiosInstance";
import SpaForm from "../../components/forms/SpaComponents/SpaForm";
import SpaTable from "../../components/forms/SpaComponents/SpaTable";

const SpaList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await api.get('/SpaServices');
            const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
            setServices(data);
        } catch (err) {
            console.error("Error te Spa:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("A jeni i sigurt?")) {
            try {
                await api.delete(`/SpaServices/${id}`);
                fetchServices();
            } catch (err) {
                alert("Gabim gjatë fshirjes.");
            }
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-left text-slate-800">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-left">Elite Spa & Wellness</h2>
                <p className="text-slate-500 text-sm text-left">Menaxhoni menunë e shërbimeve tuaja premium.</p>
            </div>
            
            <SpaForm onServiceAdded={fetchServices} />

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 px-2 text-left">Menuja e Shërbimeve</h3>
                {loading ? (
                    <div className="text-center p-10 text-slate-400">Duke ngarkuar...</div>
                ) : (
                    <SpaTable services={services} onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
};

export default SpaList;