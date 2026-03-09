import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ user, isOpen, onClose }) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;

  const clientMenuItems = [
    { path: "/dashboard", label: "Tableau de bord", icon: "dashboard" },
    { path: "/appointments", label: "Mes rendez-vous", icon: "calendar" },
    { path: "/messages", label: "Messages", icon: "message" },
    { path: "/favorites", label: "Favoris", icon: "heart" },
    { path: "/reviews", label: "Avis", icon: "star" },
    { path: "/settings", label: "Paramètres", icon: "settings" }
  ];

  const artisanMenuItems = [
    { path: "/artisan/dashboard", label: "Tableau de bord", icon: "dashboard" },
    { path: "/artisan/appointments", label: "Rendez-vous", icon: "calendar" },
    { path: "/artisan/services", label: "Mes services", icon: "briefcase" },
    { path: "/artisan/reviews", label: "Avis clients", icon: "star" },
    { path: "/artisan/earnings", label: "Revenus", icon: "wallet" },
    { path: "/artisan/settings", label: "Paramètres", icon: "settings" }
  ];

  const adminMenuItems = [
    { path: "/admin/dashboard", label: "Tableau de bord", icon: "dashboard" },
    { path: "/admin/users", label: "Utilisateurs", icon: "users" },
    { path: "/admin/artisans", label: "Artisans", icon: "briefcase" },
    { path: "/admin/services", label: "Services", icon: "grid" },
    { path: "/admin/reports", label: "Signalements", icon: "alert" },
    { path: "/admin/settings", label: "Paramètres", icon: "settings" }
  ];

  const getMenuItems = () => {
    if (!user) return [];
    if (user.role === "admin") return adminMenuItems;
    if (user.role === "artisan") return artisanMenuItems;
    return clientMenuItems;
  };

  const getIcon = (iconName) => {
    const icons = {
      dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      calendar: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      message: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      heart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      star: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      settings: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      briefcase: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        </svg>
      ),
      wallet: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        </svg>
      ),
      users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
      grid: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
        </svg>
      ),
      alert: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
    };

    return icons[iconName] || icons.dashboard;
  };

  const menuItems = getMenuItems();

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="logo-text">Job Mate</span>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        {user && (
          <div className="sidebar-user">
            <div className="user-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">
                {user.role === "artisan"
                  ? "Artisan"
                  : user.role === "admin"
                  ? "Administrateur"
                  : "Client"}
              </span>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? "active" : ""}`}
                  onClick={onClose}
                >
                  <span className="nav-icon">{getIcon(item.icon)}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;