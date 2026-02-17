import React, { useEffect, useState } from 'react';
import api from '../../../api/axiosInstance'; 
import StaffForm from './StaffForm';
import StaffTable from './StaffTable';

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const fetchStaff = async () => {
        try {
            setLoading(true);
            const res = await api.get('/Staff');
            
            
            const data = Array.isArray(res.data) 
                ? res.data 
                : res.data.$values || [];
            
            setStaff(data);
        } catch (err) {
            console.error("Gabim gjatë ngarkimit të stafit:", err);
        } finally {
            setLoading(false);
        }
    };

    
    const handleDelete = async (id) => {
        if (window.confirm("A jeni i sigurt që dëshironi ta fshini këtë punonjës?")) {
            try {
                await api.delete(`/Staff/${id}`);
                
                fetchStaff();
            } catch (err) {
                console.error("Gabim gjatë fshirjes:", err);
                alert("Nuk mund të fshihet ky punonjës. Kontrolloni nëse është i lidhur me ndonjë proces tjetër.");
            }
        }
    };

    
    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Elite Staff Management</h2>
                <p className="text-slate-500 text-sm">Menaxhoni stafin, pozitat dhe informacionet e kontaktit.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
                {/* Komponenti i Formes per te shtuar punonjes te rinj */}
                <section>
                    <StaffForm onStaffAdded={fetchStaff} />
                </section>

                {/* Komponenti i Tabeles per te shfaqur dhe fshir punonjesit */}
                <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 px-2">Lista e Punonjësve Aktivë</h3>
                    {loading ? (
                        <div className="flex justify-center p-10 text-slate-400 italic">Duke ngarkuar stafin...</div>
                    ) : (
                        <StaffTable staff={staff} onDelete={handleDelete} />
                    )}
                </section>
            </div>
        </div>
    );
};

export default StaffList;