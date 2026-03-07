import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import prestateurImg from './assets/images/prestateur.png';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-3.8 3.8L11 11.6a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l4.3-4.3 1.5 1.5a1 1 0 0 0 1.4 0l3.8-3.8 1.6 1.6a1 1 0 0 0 1.4-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.6 1.6-3.8-3.8 1.5-1.5a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0L14.7 6.3z" fill="currentColor" />
          </svg>
        </div>
        <span className="logo-text">Job Mate</span>
      </div>
      <div className="navbar-links">
        <a href="#accueil" className="nav-link">Accueil</a>
        <a href="#services" className="nav-link">Services</a>
        <a href="#comment-ca-marche" className="nav-link">Comment ça marche</a>
      </div>
      <div className="navbar-actions">
        <Link to="/login" className="nav-link login-btn">Connexion</Link>
        <Link to="/register">
          <button className="signup-btn">Inscription</button>
        </Link>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        <div className="badge">SOLUTIONS DE CONFIANCE</div>
        <h1 className="hero-title">
          Prestations de <br />
          Services & <span className="text-green">Solutions <br /> de Terrain</span>
        </h1>
        <p className="hero-subtitle">
          Trouvez rapidement l'expert idéal pour tous vos besoins de <br />
          services et interventions sur le terrain. Professionnalisme et <br />
          efficacité garantis.
        </p>
        <div className="search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input type="text" placeholder="Quel service recherchez-vous ? (ex: Plomberie)" />
          </div>
          <button className="search-btn">Trouver un expert</button>
        </div>
      </div>
      <div className="home-image">
        <div className="image-wrapper">
          <img src={prestateurImg} alt="Service Provider" />
          <div className="image-glow"></div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

