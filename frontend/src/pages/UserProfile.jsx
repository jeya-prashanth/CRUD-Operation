import React, { useState } from 'react';

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fcfb]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#115e59]">User Profile</h2>
        <div className="mb-6 flex flex-col items-center">
          <label className="mb-2 font-medium">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
          {preview && <img src={preview} alt="Profile Preview" className="h-24 w-24 object-cover rounded-full border" />}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Phone Number</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;

