import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ username = 'User', onLogout, userType = 'user' }) => {
  const navigate = useNavigate();
  const initial = username ? username[0].toUpperCase() : 'U';

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/', { replace: true });
    }
  };

  const handleProfileClick = () => {
    navigate(userType === 'admin' ? '/admin/profile' : '/user/profile');
  };

  return (
    <nav className="w-full bg-white shadow h-16 flex items-center px-6 justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="" className="h-12 object-contain" onError={e => { e.target.style.display = 'none'; }} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg text-gray-700 font-medium">Welcome {username}</span>
        <button
          onClick={handleProfileClick}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-[#00bba7] text-gr text-xl font-bold focus:outline-none hover:bg-[#115e59] transition"
          title="Profile"
        >
          {initial}
        </button>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
