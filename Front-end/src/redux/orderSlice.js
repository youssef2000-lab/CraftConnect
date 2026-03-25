import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialRequests as mockOrders } from '../data/mockData';

const ordersAdapter = createEntityAdapter({
  selectId: (order) => order.id
});

const initialState = ordersAdapter.getInitialState({
  statuses: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
  loading: false
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      ordersAdapter.addOne(state, action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      ordersAdapter.updateOne(state, {
        id,
        changes: { status, updatedAt: new Date().toISOString() }
      });
    },
    acceptOrder: (state, action) => {
      const id = action.payload;
      ordersAdapter.updateOne(state, {
        id,
        changes: { status: 'accepted' }
      });
    },
    rejectOrder: (state, action) => {
      const id = action.payload;
      ordersAdapter.updateOne(state, {
        id,
        changes: { status: 'cancelled' }
      });
    },
    completeOrder: (state, action) => {
      const id = action.payload;
      ordersAdapter.updateOne(state, {
        id,
        changes: { status: 'completed', completedAt: new Date().toISOString() }
      });
    },
    deleteOrder: (state, action) => {
      ordersAdapter.removeOne(state, action.payload);
    },
    setOrdersLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  createOrder,
  updateOrderStatus,
  acceptOrder,
  rejectOrder,
  completeOrder,
  deleteOrder,
  setOrdersLoading
} = orderSlice.actions;

export const {
  selectById: selectOrderById,
  selectAll: selectAllOrders,
  selectEntities: selectOrderEntities
} = ordersAdapter.getSelectors();

export default orderSlice.reducer;

