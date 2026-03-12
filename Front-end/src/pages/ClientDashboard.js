import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { artisans } from '../data/mockData';
import './Dashboard.css';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const requests = useSelector((state) => state.requests.requests);
  const [activeTab, setActiveTab] = useState('requests');
  
  // Get user's requests
  const userRequests = requests.filter(r => r.clientId === currentUser?.id);
  
  // Get favorite artisans
  const favoriteArtisans = artisans.filter(a => 
    currentUser?.favorites?.includes(a.id)
  );
  
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'En attente', class: 'pending' },
      accepted: { label: 'Accepté', class: 'accepted' },
      rejected: { label: 'Refusé', class: 'rejected' },
      completed: { label: 'Terminé', class: 'completed' },
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>;
  };
  
  const stats = {
    total: userRequests.length,
    pending: userRequests.filter(r => r.status === 'pending').length,
    accepted: userRequests.filter(r => r.status === 'accepted').length,
    completed: userRequests.filter(r => r.status === 'completed').length,
  };
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Bienvenue, {currentUser?.nomComplet?.split(' ')[0]}!</h1>
          <p>Gérez vos demandes de service et vos artisans favoris</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total demandes</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">En attente</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon accepted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.accepted}</span>
            <span className="stat-label">Acceptées</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Terminées</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Mes demandes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Favoris ({favoriteArtisans.length})
        </button>
      </div>
      
      {/* Content */}
      <div className="dashboard-content">
        {activeTab === 'requests' && (
          <div className="requests-section">
            {userRequests.length > 0 ? (
              <div className="requests-list">
                {userRequests.map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.service}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="request-description">{request.description}</p>
                    <div className="request-meta">
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {request.ville}
                      </span>
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {request.datePreferee || request.dateCreation}
                      </span>
                      <span className="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        {request.artisanName}
                      </span>
                    </div>
                    {request.status === 'completed' && request.dateCompletion && (
                      <div className="request-completion-date">
                        Terminé le: {request.dateCompletion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3>Aucune demande</h3>
                <p>Vous n'avez pas encore de demandes de service</p>
                <button onClick={() => navigate('/artisans')}>
                  Trouver un artisan
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <div className="favorites-section">
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
                    </div>
                    <div className="favorite-info">
                      <h3>{artisan.nomComplet}</h3>
                      <p className="profession">{artisan.profession}</p>
                      <div className="rating">
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span>{artisan.note}</span>
                        <span className="count">({artisan.nombreAvis})</span>
                      </div>
                      <p className="location">{artisan.ville}</p>
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
                <button onClick={() => navigate('/artisans')}>
                  Découvrir des artisans
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;

