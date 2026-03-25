import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, clearError } from '../redux/authSlice';
import '../styles/auth.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({nomComplet: '',email: '',motDePasse: '',confirmPassword: '',typeCompte: 'Client'});
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.motDePasse !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.motDePasse.length < 6) {alert('Le mot de passe doit contenir au moins 6 caractères');return;}
    dispatch(registerUser({nomComplet: formData.nomComplet,email: formData.email,motDePasse: formData.motDePasse,typeCompte: formData.typeCompte}));
  };
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.typeCompte === 'Artisan') {
        navigate('/artisan-dashboard');
      } else if (currentUser.typeCompte === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    }
  }, [currentUser, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Créer un compte</h2>
        <p>Rejoignez Job Mate</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label>Nom complet:</label>
            <input
              type="text"
              name="nomComplet"
              value={formData.nomComplet}
              onChange={handleChange}
              className="auth-input"
              placeholder="Entrez votre nom complet"
              required
            />
          </div>
          
          <div className="auth-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="Entrez votre email"
              required
            />
          </div>
          
          <div className="auth-form-group">
            <label>Mot de passe:</label>
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              className="auth-input"
              placeholder="Créez un mot de passe"
              required
            />
          </div>
          
          <div className="auth-form-group">
            <label>Confirmer le mot de passe:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input"
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>
          
          <div className="auth-form-group">
            <label>Type de compte:</label>
            <select
              name="typeCompte"
              value={formData.typeCompte}
              onChange={handleChange}
              className="auth-select"
            >
              <option value="Client">Client</option>
              <option value="Artisan">Artisan</option>
            </select>
          </div>
          
          <button type="submit" className="auth-button">
            S'inscrire
          </button>
        </form>
        
        <p className="auth-text">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

