import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/authSlice';
import { artisans, reviews } from '../data/mockData';
import './Dashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const requests = useSelector((state) => state.requests.requests);
  const allReviews = useSelector((state) => state.artisans.reviews);
  const [activeTab, setActiveTab] = useState('users');
  
  const allArtisans = artisans;
  
  const stats = {
    totalUsers: users.length,
    totalArtisans: users.filter(u => u.typeCompte === 'Artisan').length,
    totalClients: users.filter(u => u.typeCompte === 'Client').length,
    totalRequests: requests.length,
    totalReviews: allReviews.length,
  };
  
  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      dispatch(deleteUser(userId));
    }
  };
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Administration</h1>
          <p>Gérez les utilisateurs et surveillez la plateforme</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-card">
          <div className="admin-card-value">{stats.totalUsers}</div>
          <div className="admin-card-label">Total utilisateurs</div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-value">{stats.totalArtisans}</div>
          <div className="admin-card-label">Artisans</div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-value">{stats.totalClients}</div>
          <div className="admin-card-label">Clients</div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-value">{stats.totalRequests}</div>
          <div className="admin-card-label">Demandes</div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-value">{stats.totalReviews}</div>
          <div className="admin-card-label">Avis</div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Utilisateurs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Demandes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Avis
        </button>
      </div>
      
      {/* Content */}
      <div className="dashboard-content">
        {activeTab === 'users' && (
          <div className="users-section">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Ville</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nomComplet}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-type-badge ${user.typeCompte.toLowerCase()}`}>
                        {user.typeCompte}
                      </span>
                    </td>
                    <td>{user.ville || '-'}</td>
                    <td>
                      <div className="action-btns">
                        <button 
                          className="action-btn-small delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'requests' && (
          <div className="requests-section">
            {requests.length > 0 ? (
              <div className="requests-list">
                {requests.map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.service}</h3>
                      <span className={`status-badge ${request.status}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="request-description">{request.description}</p>
                    <div className="request-meta">
                      <span className="meta-item">Artisan: {request.artisanName}</span>
                      <span className="meta-item">Client: {request.clientName}</span>
                      <span className="meta-item">Ville: {request.ville}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Aucune demande</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <div className="reviews-grid">
              {allReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-item-header">
                    <div className="reviewer-avatar">
                      {review.clientName.charAt(0)}
                    </div>
                    <div className="reviewer-info">
                      <span className="name">{review.clientName}</span>
                      <span className="date">{review.date}</span>
                    </div>
                  </div>
                  <div className="review-item-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        viewBox="0 0 24 24" 
                        fill={i < review.note ? "currentColor" : "none"}
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="review-item-content">{review.commentaire}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

