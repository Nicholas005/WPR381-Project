# 🎟️ Smart Event Management & Ticketing Platform

> A full-stack web application built for **Advanced Events (Pty) Ltd** — a secure, scalable, and real-world event booking platform that manages corporate conferences, workshops, music festivals, and private events.

---

## 📋 Project Overview

Advanced Events (Pty) Ltd previously relied on manual spreadsheets and disconnected tools, leading to booking errors, poor access control, and operational inefficiencies. This platform replaces those legacy processes with a unified digital solution featuring:

- Secure user authentication with role-based access
- Full event lifecycle management (CRUD) for administrators
- Automated ticket booking with real-time capacity validation
- Admin analytics dashboards and user booking history
- A contact/enquiry management system

---

## 🛠️ Technologies Used

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Server-side JavaScript runtime |
| Express.js | Web framework for routing and middleware |

### Frontend (Server-Side Rendering)
| Technology | Purpose |
|---|---|
| EJS (Embedded JavaScript Templates) | Dynamic HTML templating |
| HTML5 & CSS3 | Page structure and styling |
| Bootstrap / Tailwind CSS | Responsive UI components |

### Database
| Technology | Purpose |
|---|---|
| MongoDB (Atlas or Local) | NoSQL data persistence |
| Mongoose ODM | Schema definition, validation, and queries |

### Security & Auth
| Library | Purpose |
|---|---|
| bcrypt | Password hashing |
| express-session / jsonwebtoken (JWT) | Session and authentication management |
| dotenv | Secure environment variable management |

### Dev Tools
| Tool | Purpose |
|---|---|
| nodemon | Auto-restart server during development |
| Git & GitHub | Version control and team collaboration |
| Postman / Thunder Client | API endpoint testing |
| MongoDB Compass | Database inspection and management |
| Visual Studio Code | Primary IDE |

---

## 👥 Team Members and Roles

| Name | Student Number | Role | Responsibilities |
|---|---|---|---|
| [Name 1] | [ST######] | Team Lead / Project Coordinator | Project planning, integration, Git management, README |
| [Name 2] | [ST######] | Backend Developer | Express routes, controllers, middleware, API logic |
| [Name 3] | [ST######] | Frontend Developer | EJS views, CSS styling, layout, responsiveness |
| [Name 4] | [ST######] | Database Engineer | Mongoose schemas, relationships, seed data |
| [Name 5] | [ST######] | Security / DevOps Engineer | Auth middleware, bcrypt, RBAC, session handling, .env |

---

## 📁 Project Structure

```
smart-event-platform/
├── controllers/
│   ├── authController.js         # Registration, login, logout logic
│   ├── eventController.js        # Event CRUD operations
│   ├── bookingController.js      # Ticket booking & capacity validation
│   ├── dashboardController.js    # Admin analytics & user history
│   └── contactController.js     # Enquiry submission & management
├── middleware/
│   ├── authMiddleware.js         # Verify logged-in session/JWT
│   ├── adminMiddleware.js        # Restrict routes to admin role
│   └── errorMiddleware.js        # Global error handling
├── models/
│   ├── User.js                   # User schema (name, email, password, role)
│   ├── Event.js                  # Event schema (title, date, category, capacity)
│   ├── Booking.js                # Booking schema (user ref, event ref, tickets)
│   └── Contact.js                # Enquiry schema (name, email, message)
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── bookingRoutes.js
│   ├── dashboardRoutes.js
│   └── contactRoutes.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs                 # Home / Event Listing Page
│   ├── auth.ejs                  # Login & Registration Page
│   ├── admin-events.ejs          # Event Management Page (Admin)
│   ├── dashboard.ejs             # Booking & Dashboard Page
│   └── contact.ejs              # Contact / Enquiry Management Page
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── config/
│   └── db.js                     # MongoDB connection
├── .env                          # Environment variables (not committed)
├── .env.example                  # Example env file (committed)
├── .gitignore
├── app.js                        # Express app setup
├── server.js                     # Server entry point
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local) **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/[your-org]/smart-event-platform.git
cd smart-event-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/smart-events
# OR for Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart-events

SESSION_SECRET=your_super_secret_key_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### 4. (Optional) Seed the Database

To populate the database with sample events and an admin account:

```bash
npm run seed
```

> Default admin credentials after seeding:
> - **Email:** `admin@advancedevents.co.za`
> - **Password:** `Admin@123`

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### 6. Start in Production Mode

```bash
npm start
```

---

## 🌐 Portal Pages

| Page | Route | Access |
|---|---|---|
| Home / Event Listing | `/` | Public |
| User Authentication | `/auth/login` & `/auth/register` | Public |
| Event Management | `/admin/events` | Admin Only |
| Booking & Dashboard | `/dashboard` | Authenticated Users |
| Contact / Enquiries | `/contact` | Public (view by Admin) |

---

## 🔐 Authentication & Security

- Passwords are hashed using **bcrypt** before storage — plain text passwords are never saved.
- Sessions are managed with **express-session** (or JWT stored in HTTP-only cookies).
- **Role-Based Access Control (RBAC)** distinguishes between `admin` and `user` roles.
- Protected routes are secured via **authentication and authorization middleware**.
- Environment secrets are stored in `.env` and excluded from version control via `.gitignore`.

---

## 📊 Functional Features

### ✅ User Authentication
- Register a new account with a unique email
- Login with hashed password verification
- Role assignment: `admin` or `user`
- Logout and session destruction

### ✅ Event Management (Admin Only)
- Create new events with title, description, date, category, venue, and capacity
- Edit and update existing event details
- Delete events
- View all events with current capacity status

### ✅ Ticket Booking System
- Browse and search events by date, category, or availability
- Book tickets with automated capacity validation (prevents overbooking)
- Cancel an existing booking

### ✅ Dashboards
- **User Dashboard:** View personal booking history and upcoming events
- **Admin Dashboard:** Total bookings count, most popular events, and capacity usage analytics

### ✅ Contact / Enquiry Management
- Users submit enquiries via a contact form
- Enquiries are stored in MongoDB
- Admins can view and manage all submitted enquiries

---

## 🗄️ Database Schema Overview

### User
```
{ name, email, password (hashed), role: ['admin', 'user'], createdAt }
```

### Event
```
{ title, description, date, category, venue, totalCapacity, bookedCount, isActive, createdBy }
```

### Booking
```
{ user (ref), event (ref), ticketCount, status: ['confirmed', 'cancelled'], bookedAt }
```

### Contact
```
{ name, email, subject, message, isResolved, submittedAt }
```

---

## 🔗 GitHub Repository

**Repository URL:** `https://github.com/[your-org]/smart-event-platform`

All team members have contributed via individual branches, with meaningful commit messages following the format:
```
feat: add event CRUD controller
fix: resolve capacity validation bug
docs: update README setup section
```

---

## 🖼️ Screenshots

> *(Add screenshots of your running application here)*

| Page | Preview |
|---|---|
| Home / Event Listing | *(screenshot)* |
| Login & Register | *(screenshot)* |
| Admin Event Management | *(screenshot)* |
| Booking Dashboard | *(screenshot)* |
| Contact Page | *(screenshot)* |

---

## 💡 Reflection

> *(Optional — complete as a team before submission)*

Building this platform gave us practical experience implementing an industry-standard MVC architecture under real-world constraints. Key learning outcomes included:

- Designing and enforcing role-based middleware in Express.js
- Managing relational-like data structures in a NoSQL MongoDB environment using Mongoose references
- Preventing race conditions in ticket capacity using atomic validation logic
- Collaborating effectively as a team using Git branching strategies and pull requests

Challenges we encountered included handling concurrent booking requests and structuring EJS partials for code reuse. These were resolved through team code reviews and iterative refactoring.

---

## ⚠️ Academic Integrity

This project is the original work of the team members listed above, developed as part of the **WPR381** module at **Belgium Campus ITversity**. All team members can explain and justify every design and implementation decision made in this codebase.

AI-assisted tools were used for learning purposes only. All code has been understood, adapted, and is fully owned by our team.

---

*Smart Event Management & Ticketing Platform — WPR381 Project 2026 | Belgium Campus ITversity*
