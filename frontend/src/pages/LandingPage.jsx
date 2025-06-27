import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fcfb]">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className='flex flex-col justify-center items-center gap-10'>
        <img src={logo} className='h-20' alt="" />
        <h1 className="text-4xl font-bold mb-8 text-black">Welcome to RebelMart</h1>
      </div>
      <div className="flex space-x-6">
        <Link to="/admin/login" className="px-8 py-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded-lg font-semibold text-xl transition">Admin</Link>
        <Link to="/user/login" className="px-8 py-4 bg-[#00bba7] hover:bg-[#115e59] text-white rounded-lg font-semibold text-xl transition">User</Link>
      </div>
    </div>
  );
};

export default LandingPage;
