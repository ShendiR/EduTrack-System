import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import EventCard from "../../components/forms/EventComponents/EventCards";
import EventForm from "../../components/forms/EventComponents/EventForm";
import { RotateCw, Sparkles } from "lucide-react";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", eventDate: "", location: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/ResortEvents");
      // Sigurohemi që të dhënat të jenë gjithmonë Array
      const data = Array.isArray(res.data) ? res.data : res.data.$values || [];
      setEvents(data);
    } catch (e) {
      console.error("API Error fetching events:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    if (!newEvent.title || !newEvent.eventDate || !newEvent.location) {
      alert("Ju lutem plotësoni të gjitha fushat!");
      return;
    }

    try {
      // RREGULLIMI KRYESOR: Formatimi i datës që mos të kesh "Invalid Date"
      const dateForBackend = new Date(newEvent.eventDate);
      
      if (isNaN(dateForBackend.getTime())) {
        alert("Data e zgjedhur nuk është e vlefshme!");
        return;
      }

      const dataToPost = {
        title: newEvent.title,
        eventDate: dateForBackend.toISOString(), // ISO String për Backend
        location: newEvent.location
      };

      await api.post("/ResortEvents", dataToPost);
      
      // Pastrojmë formën
      setNewEvent({ title: "", eventDate: "", location: "" });
      fetchEvents();
    } catch (err) {
      console.error("Error gjatë shtimit:", err.response?.data || err.message);
      alert("Dështoi shtimi! Kontrollo console.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 font-sans">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Services</span>
          </div>
          <h1 className="text-5xl font-serif italic text-slate-900 tracking-tight">Resort Events</h1>
        </div>
        <button 
          onClick={fetchEvents} 
          className="flex items-center gap-2 text-slate-400 hover:text-amber-600 uppercase text-[10px] font-bold tracking-widest bg-transparent border-none cursor-pointer pb-2"
        >
          <RotateCw size={18} className={isLoading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <EventForm 
        newEvent={newEvent} 
        setNewEvent={setNewEvent} 
        onAdd={handleAddEvent} 
      />
      
      {/* Këtu sigurohemi që i dërgojmë listën saktë */}
      <EventCard 
        events={events} 
        onDelete={async (id) => {
          if(window.confirm("A jeni të sigurt?")) {
            try {
              await api.delete(`/ResortEvents/${id}`);
              fetchEvents();
            } catch (err) {
              console.error("Error gjatë fshirjes:", err);
            }
          }
        }} 
      />
    </div>
  );
};

export default EventList;