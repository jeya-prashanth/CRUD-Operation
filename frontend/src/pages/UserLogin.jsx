import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        email,
        password
      });
      // localStorage.setItem('token', res.data.token);
      if (res.data.user && res.data.user.firstname) {
        localStorage.setItem('username', res.data.user.firstname);
      }
      toast.success('Login successful!');
      setTimeout(() => navigate('/user/dashboard'), 1200);
    } catch (err) {
      toast.error('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fcfb]">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#115e59]">User Login</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2 font-medium">Password</label>
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7] pr-10" />
          <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 cursor-pointer select-none mt-1.5">
            {showPassword ? (
              <FaEye className='h-5 w-5 text-[#115e59]' />
            ) : (
              <FaEyeSlash className='h-5 w-5 text-[#115e59]' />
            )}
          </span>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold">Login</button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link to="/user/signup" className="text-[#00bba7] hover:underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;

