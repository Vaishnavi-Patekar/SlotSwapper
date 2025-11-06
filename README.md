# 🕒 SlotSwapper

### 🔗 [Live Website](https://slot-swapper-zb7d.vercel.app/)  

---

## 🧩 Overview

**SlotSwapper** is a **peer-to-peer time-slot scheduling web application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It allows users to manage their calendar events, mark certain slots as *swappable*, and exchange time slots with other users in a transparent and secure way.

The app promotes flexible scheduling and collaboration among users by enabling mutual time-slot exchanges without external coordination.

---

## 💡 Concept

Imagine two users with busy schedules:

- **User A** has a *Team Meeting* on **Tuesday (10:00–11:00 AM)**  
- **User B** has a *Focus Block* on **Wednesday (2:00–3:00 PM)**  

Both mark their slots as **“swappable.”**

- User A requests to swap their Tuesday slot for User B’s Wednesday slot.
- User B receives a **notification** and can either **Accept** or **Reject** the request.
- Once accepted, both users’ calendars update automatically.

This ensures a smooth and fair time-slot swapping experience.

---

## 🚀 Features

### 1. 👤 User Authentication
- Secure **Sign Up** and **Login** functionality.
- Passwords are encrypted.
- **JWT (JSON Web Tokens)** used for protected routes and session management.

### 2. 🗓️ Calendar & Event Management
- Users can create, update, or delete events.
- Each event includes:
  - `title`
  - `startTime`
  - `endTime`
  - `status` (`BUSY`, `SWAPPABLE`, `SWAP_PENDING`)
- Users can mark events as **swappable**.

### 3. 🔁 Slot Swapping Logic
- **GET /api/swappable-slots:** View swappable slots of other users.
- **POST /api/swap-request:** Send a swap offer for another user’s slot.
- **POST /api/swap-response:** Accept or reject incoming swap requests.
- If accepted:
  - Ownership of slots is exchanged.
  - Both slots revert to `BUSY` status.

### 4. 💬 Notifications & Requests
- **Incoming Requests:** View and respond (Accept/Reject) to offers.
- **Outgoing Requests:** Track pending swap offers.
- Automatic calendar updates on acceptance.

### 5. 🎨 Frontend UI/UX
- Built with **React** and **React Router**.
- Responsive design with clear navigation:
  - Login / Signup
  - Dashboard (User’s Calendar)
  - Marketplace (Available Slots)
  - Requests Page (Incoming/Outgoing)
- Real-time updates without manual refresh.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, React Router, Axios, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JSON Web Tokens (JWT) |
| **Deployment** | Vercel |

---

## ⚙️ Installation & Setup

Follow these steps to run SlotSwapper locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Vaishnavi-Patekar/SlotSwapper.git
cd SlotSwapper
```
### 2. Setup Backend
```
cd backend
npm install
```
### Create a .env file in /backend and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
### Then run:
```
npm start
```
### 3. Setup Frontend
```
cd frontend
npm install
npm start
```
