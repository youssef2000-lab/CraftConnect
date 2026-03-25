import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { reviews as mockReviews } from '../data/mockData';

const reviewsAdapter = createEntityAdapter({
  selectId: (review) => review.id
});

const initialState = reviewsAdapter.getInitialState({
  loading: false
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      reviewsAdapter.addOne(state, action.payload);
    },
    updateReview: (state, action) => {
      reviewsAdapter.updateOne(state, action.payload);
    },
    deleteReview: (state, action) => {
      reviewsAdapter.removeOne(state, action.payload);
    },
    setReviewsLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  addReview,
  updateReview,
  deleteReview,
  setReviewsLoading
} = reviewSlice.actions;

export const {
  selectById: selectReviewById,
  selectAll: selectAllReviews,
  selectEntities: selectReviewsEntities
} = reviewsAdapter.getSelectors();

export default reviewSlice.reducer;

