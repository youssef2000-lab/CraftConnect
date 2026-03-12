import { createSlice } from '@reduxjs/toolkit';
import { initialMessages, initialConversations } from '../data/mockData';

const initialState = {
  messages: initialMessages,
  conversations: initialConversations,
  activeConversation: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { conversationId, senderId, senderName, receiverId, receiverName, message } = action.payload;
      
      const newMessage = {
        id: state.messages.length + 1,
        conversationId,
        senderId,
        senderName,
        receiverId,
        receiverName,
        message,
        timestamp: new Date().toISOString(),
      };
      
      state.messages.push(newMessage);
      
      // Update conversation
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.lastMessage = message;
        conversation.lastMessageTime = newMessage.timestamp;
        conversation.unreadCount = (conversation.unreadCount || 0) + 1;
      }
    },
    
    createConversation: (state, action) => {
      const { artisanId, artisanName, clientId, clientName } = action.payload;
      
      // Check if conversation already exists
      const existingConversation = state.conversations.find(
        c => (c.artisanId === artisanId && c.clientId === clientId) ||
             (c.artisanId === clientId && c.clientId === artisanId)
      );
      
      if (existingConversation) {
        return existingConversation.id;
      }
      
      const newConversation = {
        id: state.conversations.length + 1,
        participants: [clientId, artisanId],
        artisanId,
        artisanName,
        clientId,
        clientName,
        lastMessage: '',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
      };
      
      state.conversations.push(newConversation);
      return newConversation.id;
    },
    
    setActiveConversation: (state, action) => {
      const conversationId = action.payload;
      state.activeConversation = conversationId;
      
      // Mark messages as read
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
    
    markConversationAsRead: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
  },
});

export const { 
  sendMessage, 
  createConversation, 
  setActiveConversation,
  markConversationAsRead 
} = messageSlice.actions;

// Selectors
export const selectMessagesByConversationId = (state, conversationId) => 
  state.messages.messages
    .filter(m => m.conversationId === conversationId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

export const selectConversationsByUserId = (state, userId) => 
  state.messages.conversations.filter(c => c.participants.includes(userId));

export const selectConversationById = (state, conversationId) => 
  state.messages.conversations.find(c => c.id === conversationId);

export default messageSlice.reducer;


