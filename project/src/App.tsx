import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OrdersPage } from './pages/OrdersPage';
import { AccountPage } from './pages/AccountPage';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProducts } from './admin/AdminProducts';
import { AdminCategories } from './admin/AdminCategories';
import { AdminOrders } from './admin/AdminOrders';
import { AdminCustomers } from './admin/AdminCustomers';
import { AdminContent } from './admin/AdminContent';

function AppContent() {
  const { loading, isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>({});

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setPageParams(params || {});
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  const isAdminPage = currentPage.startsWith('admin');

  if (isAdminPage) {
    if (!isAdmin) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
            <button
              onClick={() => handleNavigate('home')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      );
    }

    return (
      <AdminLayout currentPage={currentPage} onNavigate={handleNavigate}>
        {currentPage === 'admin' && <AdminDashboard />}
        {currentPage === 'admin-products' && <AdminProducts />}
        {currentPage === 'admin-categories' && <AdminCategories />}
        {currentPage === 'admin-orders' && <AdminOrders />}
        {currentPage === 'admin-customers' && <AdminCustomers />}
        {currentPage === 'admin-content' && <AdminContent />}
      </AdminLayout>
    );
  }

  const authPages = ['login', 'signup'];
  const showNavbar = !authPages.includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar onNavigate={handleNavigate} currentPage={currentPage} />}

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'products' && (
        <ProductsPage onNavigate={handleNavigate} initialCategoryId={pageParams.category} />
      )}
      {currentPage === 'product' && (
        <ProductDetailPage productId={pageParams.id} onNavigate={handleNavigate} />
      )}
      {currentPage === 'categories' && <CategoriesPage onNavigate={handleNavigate} />}
      {currentPage === 'cart' && <CartPage onNavigate={handleNavigate} />}
      {currentPage === 'checkout' && <CheckoutPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignupPage onNavigate={handleNavigate} />}
      {currentPage === 'orders' && <OrdersPage onNavigate={handleNavigate} />}
      {currentPage === 'account' && <AccountPage />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
