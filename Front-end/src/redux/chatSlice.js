import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialMessages, initialConversations } from '../data/mockData';

const conversationsAdapter = createEntityAdapter({
  selectId: (conversation) => conversation.id
});

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.id
});

const initialState = {
  conversations: conversationsAdapter.getInitialState(),
  messages: messagesAdapter.getInitialState(),
  activeConversation: null,
  loading: false,
  newMessageLoading: {}
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    createConversation: (state, action) => {
      conversationsAdapter.addOne(state.conversations, action.payload);
    },
    addMessage: (state, action) => {
      const message = action.payload;
      messagesAdapter.addOne(state.messages, message);
      
      // Update conversation lastMessage
      const conversation = state.conversations.entities[message.conversationId];
      if (conversation) {
        conversation.lastMessage = message.message;
        conversation.lastMessageTime = message.timestamp;
        conversation.unreadCount = conversation.unreadCount || 0;
      }
    },
    setMessageLoading: (state, action) => {
      const { conversationId, loading } = action.payload;
      state.newMessageLoading[conversationId] = loading;
    },
    markAsRead: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.entities[conversationId];
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
    clearChat: (state) => {
      conversationsAdapter.removeAll(state.conversations);
      messagesAdapter.removeAll(state.messages);
    }
  }
});

export const {
  setActiveConversation,
  createConversation,
  addMessage,
  setMessageLoading,
  markAsRead,
  clearChat
} = chatSlice.actions;

export const conversationsSelectors = conversationsAdapter.getSelectors();
export const messagesSelectors = messagesAdapter.getSelectors();

export default chatSlice.reducer;

