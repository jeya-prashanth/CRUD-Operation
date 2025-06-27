import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !quantity || !imageFile) {
      toast.error('All fields including image are required.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Not authenticated');
        return;
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', Number(price));
      formData.append('quantity', Number(quantity));
      formData.append('image', imageFile);

      const response = await fetch('http://localhost:4000/api/admin/product', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        toast.error('Server error: invalid JSON response');
        console.error('Invalid JSON:', parseErr);
        return;
      }
      if (!response.ok) {
        toast.error(data.message || 'Add product failed');
        console.error('Backend error:', data);
        return;
      }
      toast.success('Product added successfully!');
      setName(''); setDescription(''); setPrice(''); setQuantity(''); setImageFile(null);
      setTimeout(() => navigate('/admin/dashboard'), 1200);
    } catch (err) {
      window.alert('Network or unknown error');
      console.error('Unknown error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fcfb]">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#115e59]">Add New Product</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Product Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" rows={3} />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Price (LKR)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Quantity</label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"

            onChange={e => setImageFile(e.target.files[0])}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
