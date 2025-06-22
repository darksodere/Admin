import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockItems: 0,
    newCustomers: 0,
    pendingOrders: 0
  });

  const [recentOrders] = useState([]);

  const [topProducts] = useState([]);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      console.log('Fetching admin stats...');
      const response = await axios.get('/api/admin/stats');
      console.log('Admin stats response:', response.data);
      
      if (response.data) {
        setStats({
          totalProducts: response.data.totalProducts || 0,
          totalOrders: response.data.totalOrders || 0,
          totalRevenue: response.data.totalRevenue || 0,
          lowStockItems: response.data.lowStockItems || 0,
          newCustomers: response.data.newCustomers || 0,
          pendingOrders: response.data.pendingOrders || 0
        });
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      // Keep default zero values if API fails
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Quick Action Handlers
  const handleQuickAction = (actionType) => {
    switch (actionType) {
      case 'add-product':
        navigate('/admin/upload-product');
        break;
      case 'update-stock':
        navigate('/admin/products');
        break;
      case 'process-orders':
        navigate('/admin/orders');
        break;
      case 'view-analytics':
        navigate('/admin/analytics');
        break;
      default:
        console.log('Unknown action:', actionType);
    }
  };

  // Header Action Handlers
  const handleExportReport = () => {
    // Create a simple CSV export of the stats
    const csvData = [
      ['Metric', 'Value'],
      ['Total Products', stats.totalProducts],
      ['Total Orders', stats.totalOrders],
      ['Revenue', stats.totalRevenue],
      ['Low Stock Items', stats.lowStockItems],
      ['New Customers', stats.newCustomers],
      ['Pending Orders', stats.pendingOrders]
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleRefreshData = () => {
    fetchAdminStats();
    // Show a brief success message (you could add a toast notification here)
    console.log('Data refreshed successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your store's performance and key metrics</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExportReport}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Export Report</span>
          </button>
          <button 
            onClick={handleRefreshData}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[
          { title: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'from-purple-500 to-purple-600', change: '0%' },
          { title: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: '🛍️', color: 'from-blue-500 to-blue-600', change: '0%' },
          { title: 'Revenue', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'from-green-500 to-green-600', change: '0%' },
          { title: 'Low Stock', value: stats.lowStockItems, icon: '⚠️', color: 'from-red-500 to-red-600', change: '0%' },
          { title: 'New Customers', value: stats.newCustomers, icon: '👥', color: 'from-orange-500 to-orange-600', change: '0%' },
          { title: 'Pending Orders', value: stats.pendingOrders, icon: '⏳', color: 'from-yellow-500 to-yellow-600', change: '0%' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button 
              onClick={() => navigate('/admin/orders')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">৳{order.amount}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-4xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Orders</h3>
                <p className="text-gray-500">Orders will appear here once customers start purchasing.</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Top Products</h2>
            <button 
              onClick={() => navigate('/admin/products')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">৳{product.revenue.toLocaleString()}</p>
                    <span className="text-sm text-green-600 font-medium">{product.trend}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-4xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Top Products</h3>
                <p className="text-gray-500">Popular products will appear here based on sales data.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Add New Product', icon: '➕', color: 'from-green-500 to-green-600', description: 'Upload a new product to your store', action: 'add-product' },
            { title: 'Update Stock', icon: '📦', color: 'from-blue-500 to-blue-600', description: 'Manage inventory levels', action: 'update-stock' },
            { title: 'Process Orders', icon: '📋', color: 'from-purple-500 to-purple-600', description: 'Review and fulfill orders', action: 'process-orders' },
            { title: 'View Analytics', icon: '📊', color: 'from-orange-500 to-orange-600', description: 'Detailed performance reports', action: 'view-analytics' }
          ].map((action, index) => (
            <button 
              key={index} 
              onClick={() => handleQuickAction(action.action)}
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left group hover:shadow-md"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;