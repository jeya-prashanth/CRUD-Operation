import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

const UserDashboard = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products');
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
  }
  // Error handled by toastify
  if (error) {
    return null;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="min-h-screen bg-[#f7fcfb] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#115e59] mb-8">Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center hover:scale-110 hover:shadow-2xl transition-all duration-300 ">
                <img src={product.image ? `http://localhost:4000/${product.image.replace(/\\/g, '/')}` : 'https://placehold.co/80x80'} alt={product.name} className="h-24 w-24 object-contain mb-4 rounded " />
                <h2 className="text-xl font-semibold mb-2 text-[#115e59]">{product.name}</h2>
                <p className="mb-2 text-gray-700 italic">{product.description}</p>
                <p className="mb-1 text-[#00bba7] font-medium">{product.price.toLocaleString('en-LK', { style: 'currency', currency: 'LKR' })}</p>
                <p className="mb-2">Quantity: <span className="font-semibold">{product.quantity}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;


