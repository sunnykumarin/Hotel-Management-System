# 🏨 Hotel Management System

A full-stack Hotel Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application enables users to search hotels, explore room listings, view hotel details, and manage bookings through a modern and responsive interface. The project also includes secure authentication using Clerk and cloud-based image storage with Cloudinary.

---

## 🚀 Features

### User Features

* Secure Authentication with Clerk
* Google Sign-In Support
* Browse Hotels and Rooms
* Search Hotels by Destination
* Filter Rooms by Type and Price
* View Detailed Hotel and Room Information
* Responsive User Interface
* Recent Search Tracking

### Hotel Owner Features

* Hotel Registration Request
* Hotel Management Dashboard
* Room Listing Management
* Property Information Management

### System Features

* RESTful API Architecture
* JWT-Based Authorization
* MongoDB Database Integration
* Cloudinary Image Upload and Storage
* Responsive Design for Mobile and Desktop
* Scalable Backend Structure

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Clerk Authentication
* Cloudinary
* Svix Webhooks

### Deployment

* Frontend: Render / Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📁 Project Structure

```bash
Hotel-Management-System
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── layouts
│   │   └── App.jsx
│   │
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/hotel-management-system.git
cd hotel-management-system
```

---

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:8000
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
MONGODB_URI=
CLERK_WEBHOOK_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

JWT_SECRET=
```

### Frontend (.env)

```env
VITE_BACKEND_URL=http://localhost:8000

VITE_CLERK_PUBLISHABLE_KEY=

VITE_CURRENCY=$
```

---

## 🔐 Authentication

The application uses Clerk Authentication for:

* User Registration
* User Login
* Google OAuth Login
* Session Management
* User Profile Management

Clerk webhooks are integrated to synchronize authenticated users with MongoDB.

---

## ☁️ Cloudinary Integration

Cloudinary is used for:

* Hotel Images
* Room Images
* Media Storage
* Optimized Image Delivery

---

## 📊 Database Schema

### User

* User ID
* Username
* Email
* Profile Image
* Role
* Recent Searched Cities

### Hotel

* Hotel Information
* Location Details
* Amenities
* Hotel Owner

### Room

* Room Type
* Price Per Night
* Amenities
* Availability
* Images

---

## 📸 Screenshots

Add screenshots of:

* Home Page
* Hotel Listing Page
* Room Details Page
* Authentication Page
* Hotel Owner Dashboard

Example:

```markdown
![Home Page](screenshots/home.png)
![Rooms](screenshots/rooms.png)
```

---

## 🚀 Deployment

### Frontend

Deploy using:

* Render
* Vercel

### Backend

Deploy using:

* Render

### Database

* MongoDB Atlas

---

## 🔮 Future Enhancements

* Online Booking System
* Payment Gateway Integration
* Hotel Reviews and Ratings
* Booking History
* Email Notifications
* Admin Dashboard
* Wishlist Feature
* Advanced Search Filters
* Real-Time Room Availability

---

## 📚 Learning Outcomes

This project helped in understanding:

* Full Stack Development
* REST API Design
* Authentication and Authorization
* MongoDB Data Modeling
* React State Management
* Cloud Deployment
* Third-Party API Integration
* Modern Web Development Practices

---

## 👨‍💻 Author

**Sunny Kumar**

Computer Science Engineering Student

* MERN Stack Developer
* Full Stack Web Development Enthusiast
* Open Source Learner

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
