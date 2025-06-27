import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/api/admin/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setError(null);
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/admin/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Product deleted successfully!');
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7fcfb] py-10 px-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#115e59]">Admin Dashboard</h1>
          <Link to="/admin/product/add" className="px-6 py-2 bg-[#115e59] hover:bg-[#10413e] text-white rounded font-semibold">Add Product</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-[#00bba7] text-gray-900">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price (LKR)</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b hover:bg-[#f7fcfb]">
                  <td className="py-2 px-4">
                    <img
                      src={product.image ? `http://localhost:4000/${product.image.replace(/\\/g, '/')}` : 'https://placehold.co/80x80'}
                      alt={product.name}
                      className="h-16 w-16 object-contain rounded"
                    />
                  </td>
                  <td className="py-2 px-4 font-medium">{product.name}</td>
                  <td className="py-2 px-4">{product.price.toLocaleString('en-LK', { style: 'currency', currency: 'LKR' })}</td>
                  <td className="py-2 px-4">{product.quantity}</td>
                  <td className="py-2 px-4 space-x-2">
                    <Link to={`/admin/product/${product._id}/edit`} className="px-3 py-1 bg-[#00bba7] hover:bg-[#115e59] text-white rounded">Edit</Link>
                    <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

