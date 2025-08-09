# CampusTraq – Transparent College Management System

CampusTraq is a **full-stack web application** designed to digitize and unify core college processes into a single transparent platform.  
Built during a **36-hour national hackathon**, the system streamlines workflows, enhances accountability, and eliminates paper-based inefficiencies.

---

## 🚀 Features

- **Role-Based Access Control** – Secure login with Firebase Google Authentication for students, faculty, and admins.
- **Student Election System** – Encrypted vote storage, real-time result display, and admin-controlled candidate management.
- **Facility Booking** – Request and approve classrooms, labs, and auditoriums with live availability tracking.
- **Budget Management** – Transparent fund allocation and expense tracking for student bodies.
- **Complaint Management** – Submit, track, and resolve grievances with full visibility.
- **Notice Board** – Centralized announcements for all users.
- **Lost & Found** – Report and track lost items within campus.
- **Event Management** – Create, manage, and RSVP to campus events.

---

## 🛠 Tech Stack

**Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** Firebase Google Authentication  
**Tools:** Git, GitHub, Postman

---

## 🏗 Project Architecture

**Flow Overview:**
1. **Frontend (React.js)** sends requests to the backend via RESTful APIs.
2. **Backend (Node.js + Express)** processes requests, enforces role-based access, and interacts with MongoDB.
3. **Firebase Authentication** validates users and assigns roles (Student / Faculty / Admin).
4. **MongoDB Database** stores structured data for each module (Elections, Complaints, Bookings, etc.).


## 📡 API Endpoints

### Authentication
- **POST** `/auth/login` – Authenticate user via Firebase token.
- **GET** `/auth/user` – Fetch current user profile & role.

### Elections
- **POST** `/elections/create` – Create a new election (Admin).
- **POST** `/elections/vote` – Submit a vote (Student).
- **GET** `/elections/results/:id` – Get real-time results for an election.

### Facility Booking
- **POST** `/facilities/book` – Book a facility (Student/Faculty).
- **GET** `/facilities/status` – View availability.
- **PATCH** `/facilities/approve/:id` – Approve or reject booking (Admin).

### Complaints
- **POST** `/complaints/create` – Submit a complaint.
- **GET** `/complaints` – View all complaints (Admin).
- **PATCH** `/complaints/resolve/:id` – Mark as resolved.

### Budget
- **POST** `/budget/allocate` – Allocate funds (Admin).
- **GET** `/budget/track` – Track fund usage.

---
