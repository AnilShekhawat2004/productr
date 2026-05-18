# Productr – Product Management Platform

A full-stack **product management platform** where users can securely create, manage, publish, and unpublish products.  
The application includes **OTP-based email verification**, secure authentication, and a complete dashboard for managing products efficiently.

🔗 **Live Website:** https://productr-rho.vercel.app

---

## 🌐 Overview

Productr allows users to:

- Create an account securely
- Verify their email using OTP authentication
- Manage products from a dedicated dashboard
- Publish and unpublish products anytime
- Edit or delete products easily

The platform is designed with a modern full-stack architecture using **React + Vite**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

### 🔐 Authentication System

- User Signup & Login
- OTP verification via email
- JWT-based authentication
- Secure protected routes
- Email verification before account access

---

## 📦 Product Management

After logging in, users can:

- ➕ Create new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📢 Publish products
- 🚫 Unpublish products
- 👀 View:
  - Published Products
  - Unpublished Products

---

## 🖼️ Media Uploads

- Product image uploads using Cloudinary
- Optimized cloud-based image storage
- Fast image delivery and management


---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Context API / State Management

### Backend
- Node.js
- Express.js
- REST API Architecture

### Database
- MongoDB (Mongoose ODM)

### Authentication & Security
- JWT (JSON Web Tokens)
- OTP Email Verification

### Media Storage
- Cloudinary

---

## 📂 Project Structure

```bash
Productr/
│
├── server/                 # Backend (Node.js + Express)
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── config
│   └── utils
│
├── client/                 # Frontend (React + Vite)
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   └── assets
│
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

Follow these steps to run the project locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/productr.git

cd productr
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

---

## Frontend `.env`

Create a `.env` file inside the frontend/client folder and add:

```env
VITE_BACKEND_URL="http://localhost:4000"
```

---

## Backend `.env`

Create a `.env` file inside the server folder and add:

```env
MAIL_HOST=

MAIL_USER=
MAIL_PASS=

JWT_SECRET=

FOLDER_NAME=

CLOUD_NAME=
API_KEY=
API_SECRET=

MONGODB_URL=

PORT=4000

FRONTEND_URL=http://localhost:5173
```

---

# ▶️ Run the Project

---

## Run Frontend

```bash
npm run client
```

---

## Run Backend

```bash
npm run server
```

---

## Run Frontend + Backend Together

```bash
npm run dev
```

---

# 🌍 Local Development URLs

Frontend:
```bash
http://localhost:5173
```

Backend:
```bash
http://localhost:4000
```

---

# 🔒 Security Features

- JWT Authentication
- Protected Routes
- OTP Email Verification
- Secure API Handling
- Environment Variable Protection

---

# 🚀 Future Enhancements

- Product search & filtering
- Category-based products
- Pagination
- User profile management
- Role-based access control
- Product analytics dashboard

---

# 👨‍💻 Author

Created by **Anil Singh Shekhawat**

Full-Stack Web Developer

🔗 Live Project: https://productr-rho.vercel.app

---

# ⭐ Support

If you found this project helpful, please ⭐ star the repository — it really helps!