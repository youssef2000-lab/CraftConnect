import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({ review }) => {
  const { author, authorImage, rating = 0, date, comment, helpful = 0, serviceType } = review;

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <div className="review-author">
          {authorImage ? (
            <img src={authorImage} alt={author} className="author-avatar" />
          ) : (
            <div className="author-avatar-placeholder">
              {author?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="author-info">
            <h4 className="author-name">{author}</h4>
            <span className="review-date">{formatDate(date)}</span>
          </div>
        </div>
        {serviceType && (<span className="service-type-badge">{serviceType}</span>)}
      </div>

      <div className="review-rating">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" fill={i < Math.floor(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="star-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="rating-value">{rating}</span>
      </div>

      <p className="review-comment">{comment}</p>

      <div className="review-footer">
        <button className="helpful-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          Utile ({helpful})
        </button>
        <button className="report-btn">
          Signaler
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
