import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:4000/api/admin/product/${id}`,
          { headers: { Authorization: `Bearer ${token}` }});
        const product = res.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setPreview(product.image ? `http://localhost:4000/${product.image.replace(/\\/g, '/')}` : '');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (image) formData.append('image', image);

      await axios.put(
        `http://localhost:4000/api/admin/product/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      toast.success('Product updated successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fcfb]">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#115e59]">Edit Product</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Product Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Price (LKR)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <label className="block font-medium">Quantity</label>
          <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-[#00bba7]" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
          {preview && <img src={preview} alt="Preview" className="mt-4 h-32 object-contain rounded border" />}
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold">Update Product</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;

