import React from 'react';
import './ArtisanCard.css';

const ArtisanCard = ({ artisan }) => {
  const {
    name,
    profession,
    location,
    rating = 0,
    reviewCount = 0,
    image,
    hourlyRate,
    available,
    skills = []
  } = artisan;

  return (
    <div className="artisan-card">
      <div className="artisan-card-header">
        <div className="artisan-avatar">
          {image ? (
            <img src={image} alt={name} className="artisan-avatar-img" />
          ) : (
            <div className="artisan-avatar-placeholder">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="artisan-info">
          <h3 className="artisan-name">{name}</h3>
          <p className="artisan-profession">{profession}</p>
          <p className="artisan-location">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </p>
        </div>
        <div className={`artisan-status ${available ? 'available' : 'unavailable'}`}>
          {available ? 'Disponible' : 'Indisponible'}
        </div>
      </div>

      <div className="artisan-card-body">
        <div className="artisan-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                className="star-icon"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="rating-value">{rating}</span>
          <span className="review-count">({reviewCount} avis)</span>
        </div>

        {skills.length > 0 && (
          <div className="artisan-skills">
            {skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
            {skills.length > 3 && (
              <span className="skill-more">+{skills.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <div className="artisan-card-footer">
        <div className="artisan-price">
          <span className="price-label">À partir de</span>
          <span className="price-value">{hourlyRate}€</span>
          <span className="price-unit">/heure</span>
        </div>
        <button className="contact-btn">Contacter</button>
      </div>
    </div>
  );
};

export default ArtisanCard;

