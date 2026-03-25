import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { selectUnreadCountByUserId } from '../redux/notificationSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Get unread notification count
  const unreadCount = useSelector((state) => 
    currentUser ? selectUnreadCountByUserId(state, currentUser.id) : 0
  );
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    setIsMenuOpen(false);
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
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-3.8 3.8L11 11.6a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l4.3-4.3 1.5 1.5a1 1 0 0 0 1.4 0l3.8-3.8 1.6 1.6a1 1 0 0 0 1.4-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.6 1.6-3.8-3.8 1.5-1.5a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0L14.7 6.3z" fill="currentColor" />
            </svg>
          </div>
          <span className="logo-text">Job Mate</span>
        </Link>

        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link 
            to="/artisans" 
            className={`nav-link ${isActive('/artisans') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Artisans
          </Link>
          {currentUser && (
            <Link 
              to={getDashboardLink()} 
              className={`nav-link ${isActive('/dashboard') || isActive('-dashboard') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tableau de bord
            </Link>
          )}
        </nav>

        <div className="header-actions">
          {currentUser ? (
            <div className="user-menu-container">
              {/* Notifications Icon */}
              <Link 
                to="/notifications" 
                className="notification-icon"
                title="Notifications"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </Link>
              
              {/* Messages Icon */}
              <Link 
                to="/messages" 
                className="message-icon"
                title="Messages"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </Link>
              
              {/* Profile Menu */}
              <button 
                className="user-menu-btn"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="user-avatar">
                  {currentUser.nomComplet?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{currentUser.nomComplet?.split(' ')[0]}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              
              {isProfileMenuOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <span className="dropdown-user-name">{currentUser.nomComplet}</span>
                    <span className="dropdown-user-role">{currentUser.typeCompte}</span>
                  </div>
                  <hr className="dropdown-divider" />
                  <Link 
                    to={getDashboardLink()} 
                    className="dropdown-item"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Tableau de bord
                  </Link>
                  <Link 
                    to={getProfileLink()} 
                    className="dropdown-item"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Mon profil
                  </Link>
                  {currentUser.typeCompte === 'Client' && (
                    <Link 
                      to="/favorites" 
                      className="dropdown-item"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      Mes favoris
                    </Link>
                  )}
                  <Link 
                    to="/messages" 
                    className="dropdown-item"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Messages
                  </Link>
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link login-link">Connexion</Link>
              <Link to="/register" className="signup-btn">Inscription</Link>
            </>
          )}
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

