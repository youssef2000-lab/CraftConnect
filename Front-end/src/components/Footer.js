import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <div className="footer-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-3.8 3.8L11 11.6a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l4.3-4.3 1.5 1.5a1 1 0 0 0 1.4 0l3.8-3.8 1.6 1.6a1 1 0 0 0 1.4-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.6 1.6-3.8-3.8 1.5-1.5a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0L14.7 6.3z" fill="currentColor" />
              </svg>
            </div>
            <span className="logo-text">Job Mate</span>
          </div>
          <p className="footer-description">
            La plateforme qui connecte les clients avec des artisans qualifiés et expérimentés.
          </p>
        </div>
        
        <div className="footer-section links">
          <h4>Liens rapides</h4>
          <Link to="/">Accueil</Link>
          <Link to="/artisans">Artisans</Link>
          <Link to="/register">Inscription</Link>
          <Link to="/login">Connexion</Link>
        </div>
        
        <div className="footer-section links">
          <h4>Catégories</h4>
          <Link to="/artisans">Électricité</Link>
          <Link to="/artisans">Plomberie</Link>
          <Link to="/artisans">Menuiserie</Link>
          <Link to="/artisans">Peinture</Link>
        </div>
        
        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: contact@jobmate.com</p>
          <p>Téléphone: +212 6 00 00 00 00</p>
          <p>Casablanca, Maroc</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Job Mate. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;

