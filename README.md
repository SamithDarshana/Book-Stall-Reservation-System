# Book Stall Reservation System

A full-stack web application for managing reservations of book stalls at exhibitions. Users can create reservations, confirm them, and receive a QR code via email for entry. The system includes backend APIs and a frontend interface for managing and displaying reservations.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup and Installation](#setup-and-installation)  
  - [Backend](#backend)  
  - [Frontend](#frontend)  
- [Environment Variables](#environment-variables)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)

---

## Features

- User registration and authentication  
- Create and manage reservations for book stalls  
- Confirm reservations with user assignment  
- Generate QR codes for confirmed reservations  
- Send confirmation emails with QR codes  
- Fetch reservations by size, reservation ID, or all reservations  
- Delete reservations  

---

## Tech Stack

**Backend:**

- Node.js + Express  
- TypeScript  
- MongoDB + Mongoose  
- Nodemailer (for emails)  
- QRCode generation  

**Frontend:**

- React (or Vite React)  
- Fetch API / Axios  
- Tailwind CSS / custom CSS (optional)  

---

## Project Structure

```

Book-Stall-Reservation-System/
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  │  └─ db.ts
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  └─ index.ts
│  ├─ package.json
│  └─ .env
└─ frontend/
├─ src/
│  ├─ components/
│  ├─ pages/
│  └─ 
├─ package.json
└─ .env

````

---

## Setup and Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in backend folder with the following variables:

```env
PORT=4000
MONGO_URL=mongodb://localhost:27017/bookstall
JWT_SECRET=supersecret
```

4. Start the backend server:

```bash
npm run dev
```

* Server runs on `http://localhost:4000`
* MongoDB connection should log: `✅ MongoDB Connected: localhost`

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in frontend folder:

```env
VITE_API_URL=http://localhost:4000/api
```

4. Start frontend:

```bash
npm run dev   # for Vite
npm start     # for CRA
```

* Frontend runs on `http://localhost:5173` (Vite)
* It fetches data from backend APIs using the environment variable

---

## API Endpoints

### Reservations

| Method | URL                                       | Description                            |
| ------ | ----------------------------------------- | -------------------------------------- |
| GET    | `/api/reservation`                        | Get all reservations                   |
| GET    | `/api/reservation/:reservationId`         | Get reservation by ID                  |
| GET    | `/api/reservation/size/:size`             | Get reservations by size               |
| POST   | `/api/reservation`                        | Create a new reservation               |
| PATCH  | `/api/reservation/confirm/:reservationId` | Confirm a reservation (assign to user) |
| DELETE | `/api/reservation/:reservationId`         | Delete a reservation                   |

### Users

| Method | URL          | Description   |
| ------ | ------------ | ------------- |
| GET    | `/api/users` | Get all users |

### Auth

| Method | URL                  | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get JWT token |

---

## Usage

1. Open frontend in browser.
2. View reservations or create a new reservation.
3. Confirm a reservation by selecting a user.
4. QR code is sent to user email for confirmed reservations.
5. All changes are reflected in MongoDB database.

---
