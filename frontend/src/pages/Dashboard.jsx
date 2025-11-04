// import { useEffect, useState } from "react";
// import API from "../api/Api";

// export default function Dashboard() {
//   const [events, setEvents] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     startTime: "",
//     endTime: "",
//   });

//   // Fetch Events
//   const fetchEvents = async () => {
//     const res = await API.get("/events/my");
//     setEvents(res.data);
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Create Event
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     await API.post("/events", form);
//     setForm({ title: "", startTime: "", endTime: "" });
//     fetchEvents();
//   };

//   // Toggle Swappable
//   const toggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === "SWAPPABLE" ? "BUSY" : "SWAPPABLE";
//     await API.patch(`/events/${id}`, { status: newStatus });
//     fetchEvents();
//   };

//   // Delete Event
//   const handleDelete = async (id) => {
//     await API.delete(`/events/${id}`);
//     fetchEvents();
//   };

//   return (
//     <div className="dashboard">
//       <h2>My Events</h2>

//       {/* Create Event */}
//       <form onSubmit={handleCreate}>
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />
//         <input
//           type="datetime-local"
//           value={form.startTime}
//           onChange={(e) => setForm({ ...form, startTime: e.target.value })}
//         />
//         <input
//           type="datetime-local"
//           value={form.endTime}
//           onChange={(e) => setForm({ ...form, endTime: e.target.value })}
//         />
//         <button type="submit">Add Event</button>
//       </form>

//       {/* Event List */}
//       <ul>
//         {events.map((ev) => (
//           <li key={ev._id}>
//             <strong>{ev.title}</strong> <br />
//             {new Date(ev.startTime).toLocaleString()} -{" "}
//             {new Date(ev.endTime).toLocaleString()} <br />
//             Status: {ev.status}
//             <div>
//               <button onClick={() => toggleStatus(ev._id, ev.status)}>
//                 {ev.status === "SWAPPABLE" ? "Mark Busy" : "Make Swappable"}
//               </button>
//               <button onClick={() => handleDelete(ev._id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import API from "../api/Api";
import "./Dashboard.css";

export default function Dashboard() {
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });
  const [events, setEvents] = useState([]);

  // ✅ Fetch events when page loads
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

  // ✅ Create event
  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await API.post("/events", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ title: "", startTime: "", endTime: "" });
    fetchEvents();
  };

  // ✅ Toggle status
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

  // ✅ Delete event
  const deleteEvent = async (id) => {
    const token = localStorage.getItem("token");
    await API.delete(`/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEvents();
  };

  return (
    <div className="dashboard">
      <h2>Welcome to SlotSwapper</h2>

      {/* ✅ Create Event Form */}
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

      {/* ✅ Event List */}
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
  );
}
