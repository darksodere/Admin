import React, { useState, useEffect } from 'react';
import axios from '../../config/api';

const ManageStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [editingStock, setEditingStock] = useState({});
  const [updateStatus, setUpdateStatus] = useState({});

  const categories = ['All', 'Manga', 'Figures', 'Art Books', 'Clothing', 'Accessories'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.products || response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Empty array if API fails
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.volume && product.volume.toString().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStockEdit = (productId, currentStock) => {
    setEditingStock(prev => ({
      ...prev,
      [productId]: currentStock
    }));
  };

  const handleStockChange = (productId, newStock) => {
    setEditingStock(prev => ({
      ...prev,
      [productId]: parseInt(newStock) || 0
    }));
  };

  const handleStockSave = async (productId) => {
    const newStock = editingStock[productId];
    setUpdateStatus(prev => ({ ...prev, [productId]: 'saving' }));

    try {
      // Make API call to update stock
      const response = await axios.put(`/api/products/${productId}`, { 
        stock: newStock 
      });

      if (response.status === 200) {
        // Update local state
        setProducts(prev => prev.map(product => 
          (product.id || product._id) === productId ? { ...product, stock: newStock } : product
        ));
        
        setUpdateStatus(prev => ({ ...prev, [productId]: 'success' }));
        alert('Stock Updated!');
        
        // Clear editing state
        setEditingStock(prev => {
          const newState = { ...prev };
          delete newState[productId];
          return newState;
        });

        // Clear success status after 2 seconds
        setTimeout(() => {
          setUpdateStatus(prev => {
            const newState = { ...prev };
            delete newState[productId];
            return newState;
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      setUpdateStatus(prev => ({ ...prev, [productId]: 'error' }));
      alert('Error updating stock. Please try again.');
    }
  };

  const handleStockCancel = (productId) => {
    setEditingStock(prev => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
    setUpdateStatus(prev => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-800', label: 'Out of Stock' };
    if (stock < 5) return { color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' };
    if (stock < 10) return { color: 'bg-orange-100 text-orange-800', label: 'Medium Stock' };
    return { color: 'bg-green-100 text-green-800', label: 'In Stock' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Stock</h1>
          <p className="text-gray-600 mt-1">Update inventory levels for your products</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center space-x-2">
            <span>📊</span>
            <span>Stock Report</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all flex items-center space-x-2">
            <span>📦</span>
            <span>Bulk Update</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: products.length, color: 'bg-blue-100 text-blue-800' },
            { label: 'In Stock', value: products.filter(p => p.stock > 5).length, color: 'bg-green-100 text-green-800' },
            { label: 'Low Stock', value: products.filter(p => p.stock > 0 && p.stock <= 5).length, color: 'bg-yellow-100 text-yellow-800' },
            { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, color: 'bg-red-100 text-red-800' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Print Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const productId = product.id || product._id;
                const stockStatus = getStockStatus(product.stock);
                const isEditing = editingStock.hasOwnProperty(productId);
                const status = updateStatus[productId];

                return (
                  <tr key={productId} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-10 rounded-lg object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">৳{product.price}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.volume || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.printType || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          value={editingStock[productId]}
                          onChange={(e) => handleStockChange(productId, e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          autoFocus
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-900">
                          {product.stock} units
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleStockSave(productId)}
                            disabled={status === 'saving'}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50 flex items-center space-x-1"
                          >
                            {status === 'saving' ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                            ) : (
                              <span>✅</span>
                            )}
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => handleStockCancel(productId)}
                            disabled={status === 'saving'}
                            className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleStockEdit(productId, product.stock)}
                            className="text-orange-600 hover:text-orange-900 flex items-center space-x-1"
                          >
                            <span>✏️</span>
                            <span>Edit</span>
                          </button>
                          {status === 'success' && (
                            <span className="text-green-600 text-xs">✅ Updated</span>
                          )}
                          {status === 'error' && (
                            <span className="text-red-600 text-xs">❌ Error</span>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStock;