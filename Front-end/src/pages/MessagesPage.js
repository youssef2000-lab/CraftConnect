import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { sendMessage, setActiveConversation, selectMessagesByConversationId } from '../store/messageSlice';
import { artisans } from '../data/mockData';
import './MessagesPage.css';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.messages);
  const [message, setMessage] = useState('');
  const [activeConvId, setActiveConvId] = useState(conversationId ? parseInt(conversationId) : null);
  
  // Get user's conversations
  const userConversations = conversations.filter(c => 
    c.participants.includes(currentUser?.id)
  );
  
  // Get current conversation messages
  const currentMessages = useSelector((state) => 
    activeConvId ? selectMessagesByConversationId(state, activeConvId) : []
  );
  
  const activeConversation = conversations.find(c => c.id === activeConvId);
  
  const getOtherParticipant = (conv) => {
    if (!conv) return null;
    const otherId = conv.participants.find(id => id !== currentUser?.id);
    if (currentUser?.typeCompte === 'Client') {
      return artisans.find(a => a.id === otherId);
    }
    return null;
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeConversation) return;
    
    const receiverId = activeConversation.participants.find(id => id !== currentUser?.id);
    const receiverName = currentUser?.typeCompte === 'Client' 
      ? activeConversation.artisanName 
      : activeConversation.clientName;
    
    dispatch(sendMessage({
      conversationId: activeConvId,
      senderId: currentUser?.id,
      senderName: currentUser?.nomComplet,
      receiverId,
      receiverName,
      message: message.trim(),
    }));
    
    setMessage('');
  };
  
  const handleConversationClick = (convId) => {
    setActiveConvId(convId);
    dispatch(setActiveConversation(convId));
    navigate(`/messages/${convId}`);
  };
  
  return (
    <div className="messages-page">
      <div className="messages-sidebar">
        <div className="sidebar-header">
          <h2>Messages</h2>
        </div>
        <div className="conversations-list">
          {userConversations.length > 0 ? (
            userConversations.map((conv) => (
              <div 
                key={conv.id} 
                className={`conversation-item ${activeConvId === conv.id ? 'active' : ''}`}
                onClick={() => handleConversationClick(conv.id)}
              >
                <div className="conversation-avatar">
                  {currentUser?.typeCompte === 'Client' ? conv.artisanName?.charAt(0) : conv.clientName?.charAt(0)}
                </div>
                <div className="conversation-info">
                  <span className="conversation-name">
                    {currentUser?.typeCompte === 'Client' ? conv.artisanName : conv.clientName}
                  </span>
                  <span className="conversation-preview">{conv.lastMessage || 'Aucun message'}</span>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="unread-badge">{conv.unreadCount}</span>
                )}
              </div>
            ))
          ) : (
            <div className="no-conversations">
              <p>Pas encore de conversations</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="messages-main">
        {activeConvId && activeConversation ? (
          <>
            <div className="chat-header">
              <div className="chat-user">
                <div className="chat-avatar">
                  {currentUser?.typeCompte === 'Client' 
                    ? activeConversation.artisanName?.charAt(0) 
                    : activeConversation.clientName?.charAt(0)
                  }
                </div>
                <div className="chat-user-info">
                  <span className="chat-user-name">
                    {currentUser?.typeCompte === 'Client' 
                      ? activeConversation.artisanName 
                      : activeConversation.clientName
                    }
                  </span>
                </div>
              </div>
            </div>
            
            <div className="messages-container">
              {currentMessages.length > 0 ? (
                currentMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.senderId === currentUser?.id ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{msg.message}</p>
                      <span className="message-time">
                        {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-messages">
                  <p>Aucun message. Commencez la conversation!</p>
                </div>
              )}
            </div>
            
            <form className="message-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message..."
              />
              <button type="submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>Sélectionnez une conversation</h3>
            <p>Choisissez une conversation pour commencer à discuter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

