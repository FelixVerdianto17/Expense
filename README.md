# Expense Tracker Fullstack App

A fullstack Expense Tracker application built with React, Express, and PostgreSQL.
This project allows users to create, read, update, delete, filter, and summarize expense data with persistent database storage.

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* lucide-react
* axios
* react-hook-form
* TanStack Query

### Backend

* Node.js
* Express.js
* PostgreSQL
* Supabase Database
* pg
* dotenv
* cors

## Features

* Add new expense
* View all expenses
* Edit expense
* Delete expense
* Filter/search expenses
* Expense summary
* Loading state
* Error state
* Empty state
* Persistent data using PostgreSQL/Supabase
* REST API with Express backend

## Project Structure

```txt
expense-tracker/
├── backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── expenseController.js
│   ├── routes/
│   │   └── expenseRoutes.js
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── frontend
    └── src
        ├── api/
        │   └── axiosInstance.js
        ├── features/
        │   └── expenses/
        │       ├── services/
        │       │   └── expenseService.js
        │       ├── hooks/
        │       │   └── useExpenses.js
        │       ├── components/
        │       │   ├── ExpenseForm.jsx
        │       │   ├── ExpenseList.jsx
        │       │   ├── ExpenseItem.jsx
        │       │   └── ExpenseSummary.jsx
        └── App.jsx
```

## Application Flow

```txt
React Frontend
  ↓
TanStack Query
  ↓
expenseService
  ↓
axiosInstance
  ↓
Express Backend
  ↓
Controller
  ↓
pg Pool
  ↓
Supabase PostgreSQL Database
```

The frontend is responsible for displaying the UI, handling forms, and sending API requests.

The backend is responsible for receiving requests, validating data, handling business logic, and communicating with the PostgreSQL database.

The database stores expense data permanently, so the data will not be lost when the backend server restarts.

## API Endpoints

### Get all expenses

```http
GET /expenses
```

Response:

```json
[
  {
    "id": "uuid",
    "title": "Makan Siang",
    "amount": 25000,
    "category": "Food",
    "date": "2026-05-30",
    "created_at": "2026-05-30T00:00:00.000Z",
    "updated_at": "2026-05-30T00:00:00.000Z"
  }
]
```

### Create expense

```http
POST /expenses
```

Request body:

```json
{
  "title": "Kopi",
  "amount": 18000,
  "category": "Drink",
  "date": "2026-05-30"
}
```

### Update expense

```http
PATCH /expenses/:id
```

Request body:

```json
{
  "title": "Kopi Susu",
  "amount": 22000,
  "category": "Drink",
  "date": "2026-05-30"
}
```

### Delete expense

```http
DELETE /expenses/:id
```

## Database Schema

Table name: `expenses`

| Column     | Type        | Description                 |
| ---------- | ----------- | --------------------------- |
| id         | uuid        | Primary key, auto-generated |
| title      | text        | Expense title               |
| amount     | integer     | Expense amount              |
| category   | text        | Expense category            |
| date       | date        | Expense transaction date    |
| created_at | timestamptz | Created timestamp           |
| updated_at | timestamptz | Updated timestamp           |

SQL schema:

```sql
create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  amount integer not null check (amount > 0),
  category text not null,
  date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
DATABASE_URL=your_supabase_postgresql_connection_string
PORT=3000
```

Important: never commit `.env` to GitHub.

## How to Run Locally

### 1. Clone the repository

```bash
git clone your-repository-url
cd expense-tracker
```

### 2. Setup backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```txt
http://localhost:3000
```

### 3. Setup frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

## Backend Concepts Used

* Express server
* REST API routing
* Controller pattern
* Middleware
* CORS
* Environment variables with dotenv
* PostgreSQL connection using pg Pool
* Backend validation
* HTTP status codes
* Error handling

## Frontend Concepts Used

* Component-based UI
* Custom hooks
* Service layer for API requests
* Server state management with TanStack Query
* Form handling with react-hook-form
* Loading, error, and empty states
* Props for edit and delete actions

## What I Learned

Through this project, I learned how frontend, backend, and database work together in a fullstack application.

Key learning points:

* Frontend does not directly manage database data
* Frontend sends requests to backend API endpoints
* Backend validates requests and communicates with the database
* PostgreSQL stores data permanently
* TanStack Query helps manage server state in React
* Environment variables are used to protect sensitive configuration
* A clean project structure makes the code easier to maintain

## Project Status

This project is completed as a basic fullstack CRUD application.

Possible future improvements:

* User authentication
* Expense by user account
* Monthly report
* Category management
* Charts and analytics
* Deployment
* Supabase direct client comparison version

```
```
