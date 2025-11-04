# 🕒 SlotSwapper — Peer-to-Peer Time Slot Swapping App

## 📘 Project Overview
**SlotSwapper** is a peer-to-peer scheduling platform that allows users to **swap time slots** in their calendars with others.  
Users can mark their busy slots as *swappable*, browse other users’ swappable slots, and propose or accept swap requests.

---

## 🚀 Features

### 🔐 User Authentication
- JWT-based authentication with protected routes.
- Sign up, log in, and session management.

### 📅 Event Management
- Users can **create, read, update, and delete** their calendar events.
- Each event has a title, start and end time, status (BUSY, SWAPPABLE, SWAP_PENDING), and owner.

### 🔄 Slot Swapping Logic
- Browse other users’ swappable slots.
- Request a swap by offering one of your own swappable slots.
- Accept or reject incoming requests.
- Auto-update event ownership and status after swap.

### 🖥️ Frontend (React)
- Responsive dashboard with event management.
- Marketplace to browse and request swappable slots.
- Notification section for incoming/outgoing requests.
- Dynamic state updates without page refresh.

### 🧠 Bonus Features (Optional)
- Real-time notifications with Socket.IO.
- Docker setup for easy deployment.
- Unit/Integration tests for backend APIs.

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js, JWT |
| **Database** | MongoDB with Mongoose ORM |
| **Auth** | JWT (JSON Web Tokens) |
| **Real-time (Bonus)** | Socket.IO |
| **Deployment** | Vercel (Frontend) / Render (Backend) |

---


