import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
//import Button from './Button';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
 //const user = useSelector(state => state.auth.user);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    setIsProfileMenuOpen(false);
  };
  
  const getDashboardLink = () => {
    if (!currentUser) return '/';
    switch (currentUser.typeCompte) {
      case 'Artisan':
        return '/artisan-dashboard';
      case 'Admin':
        return '/admin-dashboard';
      case 'Client':
      default:
        return '/client-dashboard';
    }
  };
  
  const getProfileLink = () => {
    if (!currentUser) return '/';
    switch (currentUser.typeCompte) {
      case 'Artisan':
        return '/artisan-profile';
      case 'Client':
        return '/client-profile';
      default:
        return '/';
    }
  };
  
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  const userInitial = currentUser?.nomComplet?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-transparent shadow-lg sticky-top">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div className="logo-icon d-flex align-items-center justify-content-center rounded-3">
            <i className="bi bi-tools fs-4 text-white"></i>
          </div>
          <span className="fw-bold fs-4">CraftConnect</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-nav me-auto d-none d-lg-flex gap-3">
          <Link 
            to="/" 
            className={`nav-link fw-medium ${isActive('/') ? 'active' : ''}`}
          >
            <i className="bi bi-house-door me-1"></i>
            Accueil
          </Link>
          <Link 
            to="/services" 
            className={`nav-link fw-medium ${isActive('/services') || isActive('/artisans') ? 'active' : ''}`}
          >
            <i className="bi bi-briefcase me-1"></i>
            Services
          </Link>
          {currentUser && (
            <Link 
              to={getDashboardLink()} 
              className={`nav-link fw-medium ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <i className="bi bi-grid-3x3-gap me-1"></i>
              Dashboard
            </Link>
          )}
        </div>

        {/* Right side actions */}
        <div className="d-flex align-items-center gap-2">
          {currentUser ? (
            <>
              {/* Notifications */}
              <Link to="/notifications" className="btn btn-outline-primary btn-sm position-relative">
                <i className="bi bi-bell"></i>
              </Link>
              
              {/* Messages */}
              <Link to="/messages" className="btn btn-outline-primary btn-sm position-relative">
                <i className="bi bi-chat-dots"></i>
              </Link>
              
              {/* Profile Dropdown */}
              <div className="dropdown">
                <button 
                  className="btn btn-outline-primary d-flex align-items-center gap-2 dropdown-toggle btn-sm"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <div className="avatar-sm rounded-circle d-flex align-items-center justify-content-center bg-primary text-white fw-semibold">
                    {userInitial}
                  </div>
                  <span className="d-none d-md-inline fw-medium">{currentUser.nomComplet?.split(' ')[0]}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0">
                  <li>
                    <div className="dropdown-item-text px-3 py-2">
                      <strong>{currentUser.nomComplet}</strong>
                      <div className="text-muted small">{currentUser.typeCompte}</div>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link to={getDashboardLink()} className="dropdown-item">
                      <i className="bi bi-grid-3x3-gap me-2"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to={getProfileLink()} className="dropdown-item">
                      <i className="bi bi-person me-2"></i>
                      Profil
                    </Link>
                  </li>
                  {currentUser.typeCompte === 'Client' && (
                    <li>
                      <Link to="/favorites" className="dropdown-item">
                        <i className="bi bi-heart me-2"></i>
                        Favoris
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/messages" className="dropdown-item">
                      <i className="bi bi-chat-dots me-2"></i>
                      Messages
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light btn-sm">
                Connexion
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                S'inscrire
              </Link>
            </div>
          )}
          
          {/* Mobile Toggle */}
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

