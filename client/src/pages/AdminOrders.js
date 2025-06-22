import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import axios from '../config/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/orders/admin');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  if (loading) {
    return (
      <AdminLayout title="📋 Order Management" subtitle="Loading your orders...">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-bounce">🎌</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading orders from the anime realm...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="📋 Order Management" 
      subtitle="Manage and track all your otaku customers' orders! 🛍️"
    >
      <div className="space-y-6">
        {/* Anime-themed welcome */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl p-6 border-2 border-dashed border-blue-300">
          <div className="text-center">
            <div className="text-4xl mb-3">📋 🎌 📦</div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Order Command Center!</h2>
            <p className="text-blue-600">Keep track of all the amazing anime merchandise orders from your fellow otakus!</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-purple-200 p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            Filter Orders
          </h3>
          <div className="flex flex-wrap gap-3">
            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                  filter === status
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/80 text-purple-700 hover:bg-purple-100 border border-purple-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 px-2 py-1 bg-white/30 rounded-full text-xs">
                  {status === 'all' ? orders.length : orders.filter(o => o.status === status).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-purple-200">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎌</div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">No Orders Found!</h3>
              <p className="text-purple-600">
                {filter === 'all' 
                  ? 'No otaku orders have been placed yet. The anime realm awaits!' 
                  : `No ${filter} orders found in the anime archives.`
                }
              </p>
              <div className="mt-4 text-2xl">📦✨🎯</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order._id?.slice(-8) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerName || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customerEmail || 'No email'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.items?.length || 0} item(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ৳{order.total?.toLocaleString() || '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={order.status || 'pending'}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;