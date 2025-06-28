// import React, { useState } from 'react';

// const UserProfile = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [phone, setPhone] = useState('');
//   const [dob, setDob] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProfileImage(file);
//     setPreview(file ? URL.createObjectURL(file) : null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fcfb]">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#115e59]">User Profile</h2>
//         <div className="mb-6 flex flex-col items-center">
//           <label className="mb-2 font-medium">Profile Image</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
//           {preview && <img src={preview} alt="Profile Preview" className="h-24 w-24 object-cover rounded-full border" />}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Phone Number</label>
//           <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Date of Birth</label>
//           <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
//         </div>
//         <button type="submit" className="w-full py-2 px-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(true); 
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwtToken'); 
        if (!token) {
          toast.error('Authentication required. Please log in.');
          setLoading(false);
          return;
        }

        // Verify this backend endpoint
        const response = await axios.get('http://localhost:4000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        const userData = response.data.user; 

        setPhone(userData.phone || '');
        setDob(userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '');
        if (userData.avatar) {
          setPreview(userData.avatar.startsWith('http') ? userData.avatar : `http://localhost:4000${userData.avatar}`);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          toast.error('Session expired or unauthorized. Please log in again.');
        } else {
          toast.error('Failed to load profile data: ' + (err.response?.data?.message || err.message || 'Server error'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); 


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); 
    toast.dismiss(); 

    const token = localStorage.getItem('jwtToken'); 

    console.log("Token from localStorage in UserProfile:", localStorage.getItem('jwtToken'));

    if (!token) {
      toast.error('Authentication required. Please log in.');
      setSubmitting(false);
      return; // Stop the function if no token
    }

    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('dob', dob);

    if (profileImage) {
      formData.append('avatar', profileImage);
    }

    try {
      // Verify this backend endpoint
      const response = await axios.put('http://localhost:4000/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${token}`, 
        },
      });

      toast.success(response.data.message || 'Profile updated successfully!');
      console.log('Profile update successful:', response.data);

      if (response.data.user && response.data.user.avatar) {
        setPreview(response.data.user.avatar.startsWith('http') ? response.data.user.avatar : `http://localhost:4000${response.data.user.avatar}`);
      }

    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        toast.error('Session expired or unauthorized. Please log in again.');
      } else {
        toast.error('Failed to update profile: ' + (err.response?.data?.message || err.message || 'Server error'));
      }
    } finally {
      setSubmitting(false); 
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fcfb]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#115e59]">User Profile</h2>
        <div className="mb-6 flex flex-col items-center">
          <label className="mb-2 font-medium">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
          {preview && (
            <img
              src={preview.startsWith('blob:') ? preview : `http://localhost:4000${preview}`}
              alt="Profile Preview"
              className="h-24 w-24 object-cover rounded-full border"
            />
          )}
          {!preview && (
            <div className="h-24 w-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Phone Number</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold"
          disabled={submitting} 
        >
          {submitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;