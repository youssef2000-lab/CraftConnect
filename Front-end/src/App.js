import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArtisansPage from './pages/ArtisansPage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import ClientProfilePage from './pages/ClientProfilePage';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import FavoritesPage from './pages/FavoritesPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.auth);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.typeCompte)) {
    // Redirect to appropriate dashboard based on role
    if (currentUser.typeCompte === 'Artisan') {
      return <Navigate to="/artisan-dashboard" replace />;
    } else if (currentUser.typeCompte === 'Admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/client-dashboard" replace />;
    }
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
          {/* Public Routes */}
          <Route path="/" element={
            <AppLayout>
              <HomePage />
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
          <Route path="/artisans" element={
            <AppLayout>
              <ArtisansPage />
            </AppLayout>
          } />
          <Route path="/artisan/:id" element={
            <AppLayout>
              <ArtisanProfilePage />
            </AppLayout>
          } />
          
          {/* Protected Routes - Client */}
          <Route path="/client-dashboard" element={
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
          <Route path="/messages" element={
            <ProtectedRoute allowedRoles={['Client', 'Artisan']}>
              <AppLayout>
                <MessagesPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/messages/:conversationId" element={
            <ProtectedRoute allowedRoles={['Client', 'Artisan']}>
              <AppLayout>
                <MessagesPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Protected Routes - Artisan */}
          <Route path="/artisan-dashboard" element={
            <ProtectedRoute allowedRoles={['Artisan']}>
              <AppLayout>
                <ArtisanDashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/artisan-profile" element={
            <ProtectedRoute allowedRoles={['Artisan']}>
              <AppLayout>
                <ArtisanProfilePage />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute allowedRoles={['Client', 'Artisan', 'Admin']}>
              <AppLayout>
                <NotificationsPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Protected Routes - Admin */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AppLayout>
                <AdminDashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

