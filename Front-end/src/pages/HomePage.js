import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../store/artisanSlice';
import { categories, artisans } from '../data/mockData';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get top rated artisans
  const topArtisans = [...artisans]
    .sort((a, b) => b.note - a.note)
    .slice(0, 4);
  
  // Get available artisans
  const availableArtisans = artisans.filter(a => a.disponible).slice(0, 4);
  
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm, profession: selectedCategory }));
    navigate('/artisans');
  };
  
  const handleCategoryClick = (categoryName) => {
    dispatch(setFilters({ profession: categoryName, search: '' }));
    navigate('/artisans');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-decoration"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">★</span>
            Solutions de Confiance
          </div>
          <h1 className="hero-title">
            Trouvez le meilleur <br />
            <span className="text-green">Artisan</span> pour votre projet
          </h1>
          <p className="hero-subtitle">
            Connectez-vous avec des artisans qualifiés et expérimentés près de chez vous. 
            Découvrez des professionnels de confiance pour tous vos travaux.
          </p>
          
          <form className="hero-search" onSubmit={handleSearch}>
            <div className="search-input-group">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input 
                type="text" 
                placeholder="Quel service recherchez-vous ?" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-select-group">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="search-button">
              Rechercher
            </button>
          </form>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{artisans.length}+</span>
              <span className="stat-label">Artisans qualifiés</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Catégories</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4.7</span>
              <span className="stat-label">Note moyenne</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600" 
              alt="Artisan professionnel" 
              className="hero-image"
            />
          </div>
          <div className="hero-image-card card-1">
            <div className="card-icon">✓</div>
            <div className="card-text">
              <span className="card-title">100%</span>
              <span className="card-subtitle">Vérifié</span>
            </div>
          </div>
          <div className="hero-image-card card-2">
            <div className="card-icon">★</div>
            <div className="card-text">
              <span className="card-title">4.9</span>
              <span className="card-subtitle">Note moyenne</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Catégories d'artisans</h2>
          <p className="section-subtitle">Parcourez nos différentes catégories de services</p>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <div className="category-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Artisans Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Artisans vedettes</h2>
          <p className="section-subtitle">Les artisans les mieux notés de notre plateforme</p>
        </div>
        <div className="artisans-grid">
          {topArtisans.map((artisan) => (
            <div 
              key={artisan.id} 
              className="artisan-card"
              onClick={() => navigate(`/artisan/${artisan.id}`)}
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
                <h3 className="artisan-card-name">{artisan.nomComplet}</h3>
                <p className="artisan-card-profession">{artisan.profession}</p>
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
                  <span className="rating-count">({artisan.nombreAvis} avis)</span>
                </div>
                <div className="artisan-card-price">
                  <span className="price-label">À partir de</span>
                  <span className="price-value">{artisan.tarifHoraire}€</span>
                  <span className="price-unit">/heure</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/artisans" className="view-all-btn">
            Voir tous les artisans
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Available Now Section */}
      <section className="available-section">
        <div className="section-header">
          <h2 className="section-title">Disponibles maintenant</h2>
          <p className="section-subtitle">Artisans prêts à intervenir immédiatement</p>
        </div>
        <div className="artisans-grid">
          {availableArtisans.map((artisan) => (
            <div 
              key={artisan.id} 
              className="artisan-card"
              onClick={() => navigate(`/artisan/${artisan.id}`)}
            >
              <div className="artisan-card-image">
                <img src={artisan.photo} alt={artisan.nomComplet} />
                <span className="available-badge now">Disponible</span>
              </div>
              <div className="artisan-card-content">
                <h3 className="artisan-card-name">{artisan.nomComplet}</h3>
                <p className="artisan-card-profession">{artisan.profession}</p>
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
                </div>
                <div className="artisan-card-price">
                  <span className="price-value">{artisan.tarifHoraire}€</span>
                  <span className="price-unit">/heure</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">Comment ça marche</h2>
          <p className="section-subtitle">Trouvez votre artisan en quelques étapes simples</p>
        </div>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <h3 className="step-title">Recherchez</h3>
            <p className="step-description">
              Parcourez notre annuaire d'artisans qualifiés ou utilisez la recherche pour trouver le professionnel adapté à vos besoins.
            </p>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
            </div>
            <h3 className="step-title">Contactez</h3>
            <p className="step-description">
              Envoyez une demande de service en décrivant votre projet. L'artisan recevra votre demande et pourra l'accepter.
            </p>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="step-title">Confirmez</h3>
            <p className="step-description">
              Une fois l'artisan disponible, validez ensemble les détails du prestations et planifiez l'intervention.
            </p>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="step-title">Évaluez</h3>
            <p className="step-description">
              Après l'intervention, laissez un avis pour aider les autres clients et remercier l'artisan pour son travail.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Vous êtes artisan ?</h2>
          <p className="cta-subtitle">
            Rejoignez notre plateforme et développez votre activité. 
            Gérez vos demandes et vos clients facilement.
          </p>
          <Link to="/register" className="cta-button">
            Créer un compte artisan
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

