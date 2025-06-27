# RebelMart MERN Stack Project
A full-stack e-commerce platform for admin and users, built with the MERN stack. Features robust authentication, product management with image uploads, and a modern, user-friendly UI.


## Backend Setup
Express.js, Node.js, API, jsonwebtoken, bcrypt, bcryptjs, multer, dotenv, cors, nodemon

## Fronend Setup
React.js, TailwindCSS, React-dom, React-router-dom, Axios, React-toastify, Axios, React-icons, @tailwindcss/vite

## Database
MongoDB, mongoose

## Features
- Express.js REST API
- MongoDB via Mongoose
- JWT authentication (admin/user)
- Multer for image uploads
- Product CRUD for admin
- Secure password hashing
- Static serving of uploaded images

## Requirements
- Node.js >= 16
- MongoDB (local or Atlas)

## Environment Variables
Create a `.env` file in the `backend/` directory
MONGO_URI=mongodb+srv://jeyaprashanth:jeyaprashanth@cluster0.ovtbato.mongodb.net/auth-app?retryWrites=true&w=majority
JWT_SECRET=c8839c1798cbee932a800e3e8759425d1232aa78bb7d2459b3fae542e859dd2fa191b5e47d695905bcbf26b946f2287b3e4f61c18ad6935f7f2639f4b046ddfd
PORT=4000

## Install & Run
```bash
cd backend
npm install express mongoose jsonwebtoken bcrypt bcryptjs multer dotenv cors
npm install --save-dev nodemon
npm run start

- Backend runs on `http://localhost:4000`

### Features
- React (Vite or CRA)
- Admin & User dashboards
- Product upload/edit with image preview
- JWT-protected routes
- Toast notifications via `react-toastify`
- Axios for API requests
- Responsive UI (Tailwind CSS or similar)

### Install & Run
```bash
cd frontend
npm install react react-dom react-router-dom react-toastify axios react-icons
npm run dev


## Usage
- Visit `/admin/login` or `/user/login` to access dashboards.
- Admin can add/edit/delete products (with image upload).
- Users can view products and manage their profile.
- All notifications are shown as toasts.


## Tips
- Start backend before frontend.
- Uploaded images are stored in `/backend/uploads` and served statically.
- Change admin/user logo in navbar in `frontend/src/components/Navbar.jsx`.
- For environment variable changes, restart backend.


### Backend
- npm run dev — Start backend with nodemon
- npm start — Start backend normally


### Frontend
- npm run dev — Start React dev server
- npm run build — Build for production

