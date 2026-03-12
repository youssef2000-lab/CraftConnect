import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectArtisanById, selectReviewsByArtisanId, addReview } from '../store/artisanSlice';
import { createRequest } from '../store/requestSlice';
import { addNotification } from '../store/notificationSlice';
import { selectConversationsByUserId, createConversation } from '../store/messageSlice';
import { addToFavorites, removeFromFavorites } from '../store/authSlice';
import './ArtisanProfilePage.css';

const ArtisanProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const artisan = useSelector((state) => selectArtisanById(state, id));
  const reviews = useSelector((state) => selectReviewsByArtisanId(state, id));
  const { currentUser } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('about');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    service: '',
    description: '',
    ville: '',
    datePreferee: '',
    notes: '',
  });
  const [reviewForm, setReviewForm] = useState({
    note: 5,
    commentaire: '',
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [completedRequestId, setCompletedRequestId] = useState(null);
  
  const isFavorite = currentUser?.favorites?.includes(parseInt(id));
  const isOwnProfile = currentUser?.id === parseInt(id);
  const isClient = currentUser?.typeCompte === 'Client';
  
  // Check if there are completed requests for this artisan by current user
  const userRequests = useSelector((state) => state.requests.requests);
  const completedRequest = userRequests.find(
    r => r.artisanId === parseInt(id) && 
         r.clientId === currentUser?.id && 
         r.status === 'completed'
  );
  
  if (!artisan) {
    return (
      <div className="profile-not-found">
        <h2>Artisan non trouvé</h2>
        <p>L'artisan que vous recherchez n'existe pas.</p>
        <button onClick={() => navigate('/artisans')}>Retour aux artisans</button>
      </div>
    );
  }
  
  const handleFavoriteToggle = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (isFavorite) {
      dispatch(removeFromFavorites(parseInt(id)));
    } else {
      dispatch(addToFavorites(parseInt(id)));
    }
  };
  
  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    const newRequest = {
      artisanId: artisan.id,
      artisanName: artisan.nomComplet,
      clientId: currentUser.id,
      clientName: currentUser.nomComplet,
      service: requestForm.service,
      description: requestForm.description,
      ville: requestForm.ville,
      datePreferee: requestForm.datePreferee,
      notes: requestForm.notes,
    };
    
    dispatch(createRequest(newRequest));
    
    // Add notification for artisan
    dispatch(addNotification({
      userId: artisan.id,
      type: 'new_request',
      title: 'Nouvelle demande de service',
      message: `${currentUser.nomComplet} demande vos services pour: ${requestForm.service}`,
    }));
    
    setShowRequestModal(false);
    setRequestForm({
      service: '',
      description: '',
      ville: '',
      datePreferee: '',
      notes: '',
    });
    
    alert('Demande de service envoyée avec succès!');
  };
  
  const handleSendReview = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    const newReview = {
      artisanId: artisan.id,
      clientId: currentUser.id,
      clientName: currentUser.nomComplet,
      note: reviewForm.note,
      commentaire: reviewForm.commentaire,
    };
    
    dispatch(addReview(newReview));
    setShowReviewModal(false);
    setReviewForm({ note: 5, commentaire: '' });
    
    // Notify artisan
    dispatch(addNotification({
      userId: artisan.id,
      type: 'new_review',
      title: 'Nouvel avis',
      message: `${currentUser.nomComplet} a laissé un avis sur votre profil`,
    }));
    
    alert('Avis envoyé avec succès!');
  };
  
  const handleContact = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Create or find conversation
    dispatch(createConversation({
      artisanId: artisan.id,
      artisanName: artisan.nomComplet,
      clientId: currentUser.id,
      clientName: currentUser.nomComplet,
    }));
    
    navigate('/messages');
  };
  
  return (
    <div className="artisan-profile-page">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="profile-hero-bg"></div>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-image">
              <img src={artisan.photo} alt={artisan.nomComplet} />
              {artisan.disponible && (
                <span className="status-badge available">Disponible</span>
              )}
            </div>
            
            <div className="profile-info">
              <div className="profile-name-row">
                <h1 className="profile-name">{artisan.nomComplet}</h1>
                {artisan.verifie && (
                  <span className="verified-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Vérifié
                  </span>
                )}
              </div>
              
              <p className="profile-profession">{artisan.profession}</p>
              
              <div className="profile-meta">
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {artisan.ville}
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {artisan.anneesExperience} ans d'expérience
                </div>
              </div>
              
              <div className="profile-rating">
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
              
              <div className="profile-price">
                <span className="price-label">Tarif horaire</span>
                <span className="price-value">{artisan.tarifHoraire}€</span>
                <span className="price-unit">/heure</span>
              </div>
            </div>
            
            <div className="profile-actions">
              {isClient && !isOwnProfile && (
                <>
                  <button 
                    className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteToggle}
                  >
                    <svg viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  </button>
                  <button 
                    className="action-btn primary"
                    onClick={() => setShowRequestModal(true)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    Demander un service
                  </button>
                  <button className="action-btn secondary" onClick={handleContact}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Envoyer un message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="profile-tabs">
        <div className="profile-container">
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            À propos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Avis ({reviews.length})
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="profile-content">
        <div className="profile-container">
          {activeTab === 'about' && (
            <div className="about-section">
              <div className="content-card">
                <h3>Description</h3>
                <p>{artisan.description}</p>
              </div>
              
              <div className="content-card">
                <h3>Compétences</h3>
                <div className="skills-grid">
                  {artisan.competances?.map((skill, index) => (
                    <span key={index} className="skill-item">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="content-card">
                <h3>Informations de contact</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{artisan.telephone}</span>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{artisan.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <div className="portfolio-section">
              {artisan.portfolio && artisan.portfolio.length > 0 ? (
                <div className="portfolio-grid">
                  {artisan.portfolio.map((image, index) => (
                    <div key={index} className="portfolio-item">
                      <img src={image} alt={`Portfolio ${index + 1}`} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-portfolio">
                  <p>Ce professionnel n'a pas encore de portfolio.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <div className="reviews-summary">
                <div className="average-rating">
                  <span className="rating-number">{artisan.note}</span>
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
                  <span className="total-reviews">Basé sur {artisan.nombreAvis} avis</span>
                </div>
                
                {completedRequest && !isOwnProfile && (
                  <button 
                    className="write-review-btn"
                    onClick={() => setShowReviewModal(true)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Écrire un avis
                  </button>
                )}
              </div>
              
              <div className="reviews-list">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-avatar">
                          {review.clientName.charAt(0)}
                        </div>
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.clientName}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              viewBox="0 0 24 24" 
                              fill={i < review.note ? "currentColor" : "none"}
                              stroke="currentColor" 
                              strokeWidth="2"
                              className="star"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="review-comment">{review.commentaire}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>Aucun avis pour le moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Request Modal */}
      {showRequestModal && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRequestModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            
            <h2>Demande de service</h2>
            <p className="modal-subtitle">Contactez {artisan.nomComplet} pour votre projet</p>
            
            <form onSubmit={handleSendRequest} className="request-form">
              <div className="form-group">
                <label>Service souhaité *</label>
                <input
                  type="text"
                  value={requestForm.service}
                  onChange={(e) => setRequestForm({...requestForm, service: e.target.value})}
                  placeholder="Ex: Réparation électrique"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description du problème *</label>
                <textarea
                  value={requestForm.description}
                  onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                  placeholder="Décrivez votre projet en détail..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Ville *</label>
                  <input
                    type="text"
                    value={requestForm.ville}
                    onChange={(e) => setRequestForm({...requestForm, ville: e.target.value})}
                    placeholder="Votre ville"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Date préférée</label>
                  <input
                    type="date"
                    value={requestForm.datePreferee}
                    onChange={(e) => setRequestForm({...requestForm, datePreferee: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Notes supplémentaires</label>
                <textarea
                  value={requestForm.notes}
                  onChange={(e) => setRequestForm({...requestForm, notes: e.target.value})}
                  placeholder="Informations complémentaires..."
                  rows={2}
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Envoyer la demande
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowReviewModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            
            <h2>Laisser un avis</h2>
            <p className="modal-subtitle">Évaluez votre expérience avec {artisan.nomComplet}</p>
            
            <form onSubmit={handleSendReview} className="review-form">
              <div className="form-group">
                <label>Note</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${reviewForm.note >= star ? 'active' : ''}`}
                      onClick={() => setReviewForm({...reviewForm, note: star})}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Votre avis</label>
                <textarea
                  value={reviewForm.commentaire}
                  onChange={(e) => setReviewForm({...reviewForm, commentaire: e.target.value})}
                  placeholder="Partagez votre expérience..."
                  rows={4}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Envoyer l'avis
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanProfilePage;

