import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArtisansPage from './pages/ArtisansPage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import ClientDashboard from './pages/ClientDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import OrdersPage from './pages/OrdersPage';
import MessagesPage from './pages/MessagesPage';
import PaymentPage from './pages/PaymentPage';
import ServicesPage from './pages/ServicesPage';
import FavoritesPage from './pages/FavoritesPage';
import NotificationsPage from './pages/NotificationsPage';
import ClientProfilePage from './pages/ClientProfilePage';

// Components
import Header from './components/common/Header';
import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.auth);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.typeCompte)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// App Layout with Header
const AppLayout = ({ children, showFooter = true }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          
          <Route path="/" element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          } />
          <Route path="/services" element={
            <AppLayout>
              <ServicesPage />
            </AppLayout>
          } />
          <Route path="/artisans" element={
            <AppLayout>
              <ArtisansPage />
            </AppLayout>
          } />
          <Route path="/login" element={
            <AppLayout showFooter={false}>
              <LoginPage />
            </AppLayout>
          } />
          <Route path="/register" element={
            <AppLayout showFooter={false}>
              <RegisterPage />
            </AppLayout>
          } />
          <Route path="/artisan/:id" element={
            <AppLayout>
              <ArtisanProfilePage />
            </AppLayout>
          } />
          
          <Route path="/client" element={
            <ProtectedRoute allowedRoles={['Client']}>
              <AppLayout>
                <ClientDashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/client-profile" element={
            <ProtectedRoute allowedRoles={['Client']}>
              <AppLayout>
                <ClientProfilePage />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute allowedRoles={['Client']}>
              <AppLayout>
                <FavoritesPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute allowedRoles={['Client', 'Artisan']}>
              <AppLayout>
                <OrdersPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute allowedRoles={['Client']}>
              <AppLayout>
                <PaymentPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute allowedRoles={['Client', 'Artisan']}>
              <AppLayout>
                <MessagesPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/artisan" element={
            <ProtectedRoute allowedRoles={['Artisan']}>
              <AppLayout>
                <ArtisanDashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          
         
          <Route path="/notifications" element={
            <ProtectedRoute>
              <AppLayout>
                <NotificationsPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
         
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
