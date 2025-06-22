import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import UploadProduct from '../components/admin/UploadProduct';

const AdminUploadProduct = () => {
  return (
    <AdminLayout 
      title="📦 Upload New Product" 
      subtitle="Add amazing anime merchandise to your store! ✨"
    >
      <div className="space-y-6">
        {/* Anime-themed welcome message */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-xl p-6 border-2 border-dashed border-purple-300">
          <div className="text-center">
            <div className="text-4xl mb-3">🎌 📦 🎌</div>
            <h2 className="text-xl font-bold text-purple-800 mb-2">Ready to add some awesome anime gear?</h2>
            <p className="text-purple-600">Fill out the form below to add new products to your otaku paradise!</p>
          </div>
        </div>

        {/* Upload Product Component */}
        <div className="bg-white/50 rounded-xl p-6 border border-purple-200">
          <UploadProduct />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUploadProduct;