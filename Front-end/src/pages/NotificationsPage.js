import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead, selectNotificationsByUserId } from '../redux/notificationSlice';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  
  const notifications = useSelector((state) => 
    currentUser ? selectNotificationsByUserId(state, currentUser.id) : []
  );
  
  const unreadCount = notifications.filter(n => !n.lu).length;
  
  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };
  
  const handleMarkAllAsRead = () => {
    if (currentUser) {
      dispatch(markAllAsRead(currentUser.id));
    }
  };
  
  const getNotificationIcon = (type) => {
    const icons = {
      new_request: '📩',
      request_accepted: '✅',
      request_rejected: '❌',
      request_completed: '🎉',
      new_message: '💬',
      new_review: '⭐',
    };
    return icons[type] || '🔔';
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours} h`;
    if (diffDays < 7) return `Il y a ${diffDays} j`;
    return date.toLocaleDateString('fr-FR');
  };
  
  return (
    <div className="notifications-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Notifications</h1>
          <p>Gérez vos notifications</p>
        </div>
        {unreadCount > 0 && (
          <button className="mark-all-btn" onClick={handleMarkAllAsRead}>
            Tout marquer comme lu
          </button>
        )}
      </div>
      
      <div className="notifications-content">
        {notifications.length > 0 ? (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.lu ? 'unread' : ''}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <h3 className="notification-title">{notification.title}</h3>
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{formatTime(notification.date)}</span>
                </div>
                {!notification.lu && <div className="unread-dot"></div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <h3>Aucune notification</h3>
            <p>Vous n'avez pas encore de notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

