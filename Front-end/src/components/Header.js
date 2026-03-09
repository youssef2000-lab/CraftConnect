import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
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
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/artisans" className="nav-link">Artisans</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/comment-ca-marche" className="nav-link">Comment ça marche</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <button 
                className="user-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-item">Tableau de bord</Link>
                  <Link to="/profile" className="dropdown-item">Mon profil</Link>
                  <Link to="/settings" className="dropdown-item">Paramètres</Link>
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout">
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

