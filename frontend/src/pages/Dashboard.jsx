import { useState, useEffect } from "react";
import API from "../api/Api";
import "./Dashboard.css";

export default function Dashboard() {
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    const res = await API.get("/events/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await API.post("/events", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ title: "", startTime: "", endTime: "" });
    fetchEvents();
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("token");
    const newStatus = currentStatus === "BUSY" ? "SWAPPABLE" : "BUSY";
    await API.patch(
      `/events/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");
    await API.delete(`/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEvents();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Welcome to SlotSwapper</h2>

        <form onSubmit={handleCreate} className="create-form">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            required
          />
          <button type="submit">Create Event</button>
        </form>

        <div className="events-section">
          <h3>Your Events</h3>
          <ul>
            {events.map((e) => (
              <li key={e._id}>
                <strong>{e.title}</strong> — {e.startTime} to {e.endTime}  
                <span> [{e.status}] </span>
                <button onClick={() => toggleStatus(e._id, e.status)}>
                  {e.status === "BUSY" ? "Make Swappable" : "Make Busy"}
                </button>
                <button onClick={() => deleteEvent(e._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
