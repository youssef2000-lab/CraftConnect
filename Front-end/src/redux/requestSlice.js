import { createSlice, nanoid } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    requests: [],
    currentRequest: null,
    loading: false,
    error: null
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload || [];
    },
    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload || null;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload || null;
    },
    // NEW: Safe defaults, string status
    createRequest: (state, action) => {
      const newRequest = {
        id: nanoid(),
        ...action.payload,
        status: 'pending',
        dateCreation: new Date().toISOString(),
        ... (action.payload.dateCompletion ? {dateCompletion: action.payload.dateCompletion} : {})
      };
      state.requests.unshift(newRequest);
    },
    acceptRequest: (state, action) => {
      const request = state.requests.find(r => r.id === action.payload);
      if (request) request.status = 'accepted';
    },
    rejectRequest: (state, action) => {
      const request = state.requests.find(r => r.id === action.payload);
      if (request) request.status = 'rejected';
    },
    completeRequest: (state, action) => {
      const request = state.requests.find(r => r.id === action.payload);
      if (request) {
        request.status = 'completed';
        request.dateCompletion = new Date().toISOString();
      }
    }
  }
});

export const { 
  setRequests, setCurrentRequest, setLoading, setError,
  createRequest, acceptRequest, rejectRequest, completeRequest 
} = requestSlice.actions;

export default requestSlice.reducer;

