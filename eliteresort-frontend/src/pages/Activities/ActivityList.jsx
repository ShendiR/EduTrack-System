import React, { useEffect, useState } from 'react';
import api from '../../../api/axiosInstance';
import ActivityForm from './ActivityForm';
import ActivityTable from './ActivityTable';

const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const res = await api.get('/Activities');
            const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
            setActivities(data);
        } catch (err) {
            console.error("Gabim te Aktivitetet:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("A jeni i sigurt që dëshironi ta fshini këtë aktivitet?")) {
            try {
                await api.delete(`/Activities/${id}`);
                fetchActivities();
            } catch (err) {
                alert("Gabim gjatë fshirjes.");
            }
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-left">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-left">Elite Activities</h2>
                <p className="text-slate-500 text-sm text-left">Organizoni dhe menaxhoni aventurat që ofron resorti.</p>
            </div>
            
            <ActivityForm onActivityAdded={fetchActivities} />

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 px-2 text-left">Lista e Aktiviteteve</h3>
                {loading ? (
                    <div className="text-center p-10 text-slate-400 italic">Duke ngarkuar aktivitetet...</div>
                ) : (
                    <ActivityTable activities={activities} onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
};

export default ActivityList;