import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../features/auth/authSlice';
import '../styles/auth.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({email: '',password: ''});
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
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
        <h2>Connexion</h2>
        <p>Bienvenue sur Job Mate</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label>Email:</label>
            <input type="email"name="email" value={formData.email} onChange={handleChange} className="auth-input" laceholder="Entrez votre email" equired/>
          </div>
          <div className="auth-form-group">
            <label>Mot de passe:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="auth-input" placeholder="Entrez votre mot de passe" required/>
          </div>
          <button type="submit" className="auth-button">Se connecter</button>
        </form>
        
        <p className="auth-text">Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;

