import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { artisans } from '../data/mockData';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  
  const favoriteArtisans = artisans.filter(a => 
    currentUser?.favorites?.includes(a.id)
  );
  
  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1>Mes Artisans Favoris</h1>
        <p>Consultez vos artisans préférés</p>
      </div>
      
      <div className="favorites-content">
        {favoriteArtisans.length > 0 ? (
          <div className="favorites-grid">
            {favoriteArtisans.map((artisan) => (
              <div 
                key={artisan.id} 
                className="favorite-card"
                onClick={() => navigate(`/artisan/${artisan.id}`)}
              >
                <div className="favorite-image">
                  <img src={artisan.photo} alt={artisan.nomComplet} />
                  {artisan.disponible && (
                    <span className="available-badge">Disponible</span>
                  )}
                </div>
                <div className="favorite-info">
                  <h3>{artisan.nomComplet}</h3>
                  <p className="profession">{artisan.profession}</p>
                  <div className="rating">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>{artisan.note}</span>
                    <span className="count">({artisan.nombreAvis} avis)</span>
                  </div>
                  <p className="location">{artisan.ville}</p>
                  <p className="description">{artisan.description?.substring(0, 80)}...</p>
                  <div className="price">
                    <span className="price-value">{artisan.tarifHoraire}€</span>
                    <span className="price-unit">/heure</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3>Aucun favori</h3>
            <p>Vous n'avez pas encore d'artisans favoris</p>
            <button onClick={() => navigate('/artisans')}>Découvrir des artisans</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

