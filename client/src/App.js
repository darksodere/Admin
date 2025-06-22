import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import MangaListPage from './pages/MangaListPage';
import CommunityPage from './pages/CommunityPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUploadProduct from './pages/AdminUploadProduct';
import AdminOrders from './pages/AdminOrders';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ReturnPolicy from './pages/ReturnPolicy';
import FAQ from './pages/FAQ';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileLayout from './components/MobileLayout';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/admin/login';
  const isHomePage = location.pathname === '/';

  return (
    <MobileLayout>
      <div className="min-h-screen">
        {!isAdminPage && !isAuthPage && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/manga-list" element={<MangaListPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path="/admin/upload-product" element={
            <ProtectedRoute>
              <AdminUploadProduct />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          } />
          
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        {!isAdminPage && !isAuthPage && <Footer hideNewsletter={isHomePage} />}
      </div>
    </MobileLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;