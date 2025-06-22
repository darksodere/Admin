import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import DashboardOverview from '../components/admin/DashboardOverview';
import UploadProduct from '../components/admin/UploadProduct';
import ManageStock from '../components/admin/ManageStock';
import ChangeHomeBanner from '../components/admin/ChangeHomeBanner';
import ManageMostPopular from '../components/admin/ManageMostPopular';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    logout();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'upload':
        return <UploadProduct />;
      case 'stock':
        return <ManageStock />;
      case 'banner':
        return <ChangeHomeBanner />;
      case 'popular':
        return <ManageMostPopular />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <AdminTopbar adminData={admin} onLogout={handleLogout} />
          
          {/* Page Content */}
          <main className="flex-1 p-6">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default AdminDashboard;