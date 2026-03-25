import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/authSlice';
import './ClientProfilePage.css';

const ClientProfilePage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nomComplet: currentUser?.nomComplet || '',
    email: currentUser?.email || '',
    telephone: currentUser?.telephone || '',
    ville: currentUser?.ville || '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setIsEditing(false);
    alert('Profil mis à jour avec succès!');
  };
  
  return (
    <div className="profile-page">
      <div className="profile-header-section">
        <h1>Mon Profil</h1>
        <p>Gérez vos informations personnelles</p>
      </div>
      
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {currentUser?.nomComplet?.charAt(0)}
            </div>
            <div className="profile-info-section">
              <h2>{currentUser?.nomComplet}</h2>
              <p className="profile-type">{currentUser?.typeCompte}</p>
              <p className="profile-email">{currentUser?.email}</p>
            </div>
          </div>
          
          {!isEditing ? (
            <div className="profile-details">
              <div className="detail-item">
                <label>Nom complet</label>
                <span>{currentUser?.nomComplet}</span>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <span>{currentUser?.email}</span>
              </div>
              <div className="detail-item">
                <label>Téléphone</label>
                <span>{currentUser?.telephone || 'Non défini'}</span>
              </div>
              <div className="detail-item">
                <label>Ville</label>
                <span>{currentUser?.ville || 'Non définie'}</span>
              </div>
              <div className="detail-item">
                <label>Membre depuis</label>
                <span>{currentUser?.dateCreation}</span>
              </div>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Modifier le profil
              </button>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="nomComplet"
                  value={formData.nomComplet}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+212 6 12 34 56 78"
                />
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  placeholder="Votre ville"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Enregistrer</button>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;

