import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ service, onClick }) => {
  const {
    id,name,description,icon,artisanCount = 0,image,priceRange,rating = 0,popular = false
  } = service;

  const defaultIcons = {
    plumbing: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M2 12h20M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20" />
      </svg>
    ),

    electrical: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),

    painting: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
        <path d="M12 2v4M8 22h8" />
      </svg>
    ),

    default: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-3.8 3.8L11 11.6a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l4.3-4.3 1.5 1.5a1 1 0 0 0 1.4 0l3.8-3.8 1.6 1.6a1 1 0 0 0 1.4-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.6 1.6-3.8-3.8 1.5-1.5a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0L14.7 6.3z" />
      </svg>
    )
  };

  const getIcon = () => {
    if (icon) return icon;

    const iconKey = name?.toLowerCase().includes("plomberie")
      ? "plumbing"
      : name?.toLowerCase().includes("electric")
      ? "electrical"
      : name?.toLowerCase().includes("peinture")
      ? "painting"
      : "default";

    return defaultIcons[iconKey];
  };

  return (
    <div className="service-card" onClick={() => onClick && onClick(id)}>
      {popular && <span className="popular-badge">Populaire</span>}

      <div className="service-icon">{getIcon()}</div>

      <h3 className="service-name">{name}</h3>

      {description && (
        <p className="service-description">{description}</p>
      )}

      <div className="service-info">
        <div className="service-meta">
          <span className="artisan-count">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="16"
              height="16"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {artisanCount} artisans
          </span>

          {rating > 0 && (
            <span className="service-rating">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {rating}
            </span>
          )}
        </div>

        {priceRange && (
          <span className="price-range">{priceRange}</span>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;