import { createSlice } from '@reduxjs/toolkit';
import { initialRequests } from '../data/mockData';

const initialState = {
  requests: initialRequests,
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    createRequest: (state, action) => {
      const { artisanId, artisanName, clientId, clientName, service, description, ville, datePreferee, notes } = action.payload;
      
      const newRequest = {
        id: state.requests.length + 1,
        artisanId,
        artisanName,
        clientId,
        clientName,
        service,
        description,
        ville,
        datePreferee,
        notes,
        status: 'pending',
        dateCreation: new Date().toISOString().split('T')[0],
      };
      
      state.requests.push(newRequest);
    },
    
    acceptRequest: (state, action) => {
      const requestId = action.payload;
      const request = state.requests.find(r => r.id === requestId);
      
      if (request) {
        request.status = 'accepted';
      }
    },
    
    rejectRequest: (state, action) => {
      const requestId = action.payload;
      const request = state.requests.find(r => r.id === requestId);
      
      if (request) {
        request.status = 'rejected';
      }
    },
    
    completeRequest: (state, action) => {
      const requestId = action.payload;
      const request = state.requests.find(r => r.id === requestId);
      
      if (request) {
        request.status = 'completed';
        request.dateCompletion = new Date().toISOString().split('T')[0];
      }
    },
    
    deleteRequest: (state, action) => {
      const requestId = action.payload;
      state.requests = state.requests.filter(r => r.id !== requestId);
    },
  },
});

export const { 
  createRequest, 
  acceptRequest, 
  rejectRequest, 
  completeRequest,
  deleteRequest 
} = requestSlice.actions;

// Selectors
export const selectRequestsByClientId = (state, clientId) => 
  state.requests.requests.filter(r => r.clientId === clientId);

export const selectRequestsByArtisanId = (state, artisanId) => 
  state.requests.requests.filter(r => r.artisanId === artisanId);

export const selectRequestById = (state, requestId) => 
  state.requests.requests.find(r => r.id === requestId);

export default requestSlice.reducer;


