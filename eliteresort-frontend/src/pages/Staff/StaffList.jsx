import React, { useEffect, useState } from 'react';
import api from "../../api/axiosInstance";
import StaffForm from "../../components/forms/StaffComponents/StaffForm";
import StaffTable from "../../components/forms/StaffComponents/StaffTable";

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const res = await api.get('/Staff');
            // Trajtojmë formatin e mundshëm të .NET ($values)
            const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
            setStaff(data);
        } catch (err) {
            console.error("Gabim gjatë ngarkimit:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("A jeni i sigurt?")) {
            try {
                await api.delete(`/Staff/${id}`);
                fetchStaff();
            } catch (err) {
                alert("Nuk mund të fshihet punonjësi.");
            }
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-left">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Elite Staff Management</h2>
                <p className="text-slate-500 text-sm">Menaxhoni stafin dhe pagat e resortit.</p>
            </div>
            
            <StaffForm onStaffAdded={fetchStaff} />

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 px-2">Lista e Punonjësve</h3>
                {loading ? (
                    <div className="text-center p-10 text-slate-400 italic">Duke ngarkuar stafin...</div>
                ) : (
                    <StaffTable staff={staff} onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
};

export default StaffList;