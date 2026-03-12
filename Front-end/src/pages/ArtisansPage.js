import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, clearFilters, selectFilteredArtisans } from '../store/artisanSlice';
import { categories } from '../data/mockData';
import './ArtisansPage.css';

const ArtisansPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredArtisans = useSelector(selectFilteredArtisans);
  const { filters } = useSelector((state) => state.artisans);
  
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    profession: filters.profession || '',
    ville: filters.ville || '',
    noteMin: filters.noteMin || 0,
    disponible: filters.disponible !== null ? filters.disponible : '',
  });
  
  // Get unique cities from artisans
  const [cities, setCities] = useState([]);
  const artisans = useSelector((state) => state.artisans.artisans);
  
  useEffect(() => {
    const uniqueCities = [...new Set(artisans.map(a => a.ville).filter(Boolean))];
    setCities(uniqueCities);
  }, [artisans]);
  
  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const applyFilters = () => {
    dispatch(setFilters({
      search: localFilters.search,
      profession: localFilters.profession,
      ville: localFilters.ville,
      noteMin: parseInt(localFilters.noteMin),
      disponible: localFilters.disponible === '' ? null : localFilters.disponible === 'true',
    }));
  };
  
  const handleClearFilters = () => {
    setLocalFilters({
      search: '',
      profession: '',
      ville: '',
      noteMin: 0,
      disponible: '',
    });
    dispatch(clearFilters());
  };
  
  const handleArtisanClick = (artisanId) => {
    navigate(`/artisan/${artisanId}`);
  };

  return (
    <div className="artisans-page">
      <div className="artisans-page-header">
        <h1 className="page-title">Nos Artisans</h1>
        <p className="page-subtitle">Découvrez les meilleurs artisans près de chez vous</p>
      </div>
      
      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-group search-filter">
            <label className="filter-label">Rechercher</label>
            <div className="search-input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Nom, profession, ville..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              />
            </div>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Catégorie</label>
            <select
              value={localFilters.profession}
              onChange={(e) => handleFilterChange('profession', e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Ville</label>
            <select
              value={localFilters.ville}
              onChange={(e) => handleFilterChange('ville', e.target.value)}
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Note minimum</label>
            <select
              value={localFilters.noteMin}
              onChange={(e) => handleFilterChange('noteMin', e.target.value)}
            >
              <option value="0">Toutes les notes</option>
              <option value="5">5 ★ uniquement</option>
              <option value="4">4 ★ et plus</option>
              <option value="3">3 ★ et plus</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Disponibilité</label>
            <select
              value={localFilters.disponible}
              onChange={(e) => handleFilterChange('disponible', e.target.value)}
            >
              <option value="">Tous</option>
              <option value="true">Disponibles</option>
              <option value="false">Indisponibles</option>
            </select>
          </div>
          
          <div className="filter-actions">
            <button className="apply-filters-btn" onClick={applyFilters}>
              Appliquer
            </button>
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="results-section">
        <div className="results-count">
          <span className="count-number">{filteredArtisans.length}</span> artisan{filteredArtisans.length !== 1 ? 's' : ''} trouvé{filteredArtisans.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {/* Artisans Grid */}
      <div className="artisans-grid">
        {filteredArtisans.length > 0 ? (
          filteredArtisans.map((artisan) => (
            <div 
              key={artisan.id} 
              className="artisan-card"
              onClick={() => handleArtisanClick(artisan.id)}
            >
              <div className="artisan-card-image">
                <img src={artisan.photo} alt={artisan.nomComplet} />
                {artisan.disponible && (
                  <span className="available-badge">Disponible</span>
                )}
                {artisan.verifie && (
                  <span className="verified-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="artisan-card-content">
                <div className="artisan-card-header">
                  <h3 className="artisan-card-name">{artisan.nomComplet}</h3>
                  <p className="artisan-card-profession">{artisan.profession}</p>
                </div>
                
                <div className="artisan-card-location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {artisan.ville}
                </div>
                
                <div className="artisan-card-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        viewBox="0 0 24 24" 
                        fill={i < Math.floor(artisan.note) ? "currentColor" : "none"}
                        stroke="currentColor" 
                        strokeWidth="2"
                        className="star"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="rating-value">{artisan.note}</span>
                  <span className="rating-count">({artisan.nombreAvis})</span>
                </div>
                
                <p className="artisan-card-description">
                  {artisan.description?.substring(0, 100)}...
                </p>
                
                <div className="artisan-card-skills">
                  {artisan.competances?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <div className="artisan-card-footer">
                  <div className="artisan-card-price">
                    <span className="price-label">À partir de</span>
                    <span className="price-value">{artisan.tarifHoraire}€</span>
                    <span className="price-unit">/h</span>
                  </div>
                  <button className="view-profile-btn">
                    Voir profil
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <h3>Aucun artisan trouvé</h3>
            <p>Essayez de modifier vos critères de recherche</p>
            <button className="reset-btn" onClick={handleClearFilters}>
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisansPage;

