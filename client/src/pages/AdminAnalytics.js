import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import SampleDataGenerator from '../components/admin/SampleDataGenerator';
import axios from '../config/api';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    overview: { totalOrders: 0, totalRevenue: 0 },
    dailySales: [],
    printType: { yellow: 0, white: 0, regular: 0 },
    paymentMethods: { cod: 0, bkash: 0, nagad: 0, rocket: 0 },
    orderStatus: { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 },
    monthlyRevenue: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all analytics data
      const [
        overviewRes,
        dailySalesRes,
        printTypeRes,
        paymentMethodsRes,
        orderStatusRes,
        monthlyRevenueRes,
        topProductsRes
      ] = await Promise.all([
        axios.get('/api/analytics/overview'),
        axios.get('/api/analytics/daily-sales'),
        axios.get('/api/analytics/print-type'),
        axios.get('/api/analytics/payment-methods'),
        axios.get('/api/analytics/order-status'),
        axios.get('/api/analytics/monthly-revenue'),
        axios.get('/api/analytics/top-products')
      ]);

      setAnalytics({
        overview: overviewRes.data,
        dailySales: dailySalesRes.data,
        printType: printTypeRes.data,
        paymentMethods: paymentMethodsRes.data,
        orderStatus: orderStatusRes.data,
        monthlyRevenue: monthlyRevenueRes.data,
        topProducts: topProductsRes.data
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simple chart components using CSS
  const SimpleBarChart = ({ data, dataKey, color = '#f97316' }) => {
    const maxValue = Math.max(...data.map(item => item[dataKey] || 0));
    
    return (
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-16 text-xs text-gray-600 truncate">
              {item.name || item.method || item.date || item.monthName || `Item ${index + 1}`}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
              <div
                className="h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${maxValue > 0 ? (item[dataKey] / maxValue) * 100 : 0}%`,
                  backgroundColor: color
                }}
              />
            </div>
            <div className="w-16 text-xs text-gray-800 font-medium text-right">
              {typeof item[dataKey] === 'number' ? item[dataKey].toLocaleString() : item[dataKey]}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const SimplePieChart = ({ data, colors = ['#f97316', '#06b6d4', '#10b981', '#8b5cf6'] }) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    
    return (
      <div className="space-y-3">
        {Object.entries(data).map(([key, value], index) => {
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm text-gray-700 capitalize">{key}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{value}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="📊 Analytics Dashboard" subtitle="Loading your data...">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-pulse">📊</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-600 font-medium">Analyzing the anime market data...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="📊 Analytics Dashboard" subtitle="Error loading data">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Analytics</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="📊 Analytics Dashboard" 
      subtitle="Detailed insights into your otaku empire! 📈✨"
    >
      <div className="space-y-6">
        {/* Anime-themed welcome */}
        <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-xl p-6 border-2 border-dashed border-green-300">
          <div className="text-center">
            <div className="text-4xl mb-3">📊 🎯 📈</div>
            <h2 className="text-xl font-bold text-green-800 mb-2">Data Dojo Analytics!</h2>
            <p className="text-green-600">Dive deep into your store's performance and discover the power of data!</p>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                💰
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">৳{analytics.overview.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                🛍️
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{analytics.overview.totalOrders.toLocaleString()}</p>
              <p className="text-sm text-purple-600 font-medium">Total Orders</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                📊
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ৳{analytics.overview.totalOrders > 0 ? Math.round(analytics.overview.totalRevenue / analytics.overview.totalOrders) : 0}
              </p>
              <p className="text-sm text-purple-600 font-medium">Avg Order Value</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                📈
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {Object.values(analytics.printType).reduce((sum, val) => sum + val, 0)}
              </p>
              <p className="text-sm text-purple-600 font-medium">Items Sold</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Sales Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📈</span>
              Daily Sales (Last 7 Days)
            </h2>
            {analytics.dailySales.length > 0 ? (
              <SimpleBarChart 
                data={analytics.dailySales} 
                dataKey="total" 
                color="#f97316"
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>No sales data available</p>
              </div>
            )}
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">🏆</span>
              Top Selling Products
            </h2>
            <div className="space-y-4">
              {analytics.topProducts.length > 0 ? (
                analytics.topProducts.slice(0, 5).map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 truncate">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.totalQuantity} sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">৳{product.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🏆</div>
                  <p>No product data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Print Type Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">🎨</span>
              Print Type Breakdown
            </h2>
            <SimplePieChart 
              data={analytics.printType} 
              colors={['#facc15', '#f3f4f6', '#f97316']}
            />
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">💳</span>
              Payment Methods
            </h2>
            <SimplePieChart 
              data={analytics.paymentMethods} 
              colors={['#4ade80', '#06b6d4', '#8b5cf6', '#f59e0b']}
            />
          </div>

          {/* Order Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📦</span>
              Order Status
            </h2>
            <SimplePieChart 
              data={analytics.orderStatus} 
              colors={['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444']}
            />
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        {analytics.monthlyRevenue.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📅</span>
              Monthly Revenue (Last 12 Months)
            </h2>
            <SimpleBarChart 
              data={analytics.monthlyRevenue} 
              dataKey="revenue" 
              color="#10b981"
            />
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center">
          <button
            onClick={fetchAnalytics}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <span className="mr-2">🔄</span>
            Refresh Analytics
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;