
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface SubscriptionState {
  isSubscribed: boolean;
  planId: number | null;
  isCheckingSubscription: boolean;
}

const initialState: SubscriptionState = {
  isSubscribed: false,
  planId: null,
  isCheckingSubscription: false, 
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    subscribe: (state, action: PayloadAction<number>) => {
      state.isSubscribed = true;
      state.planId = action.payload;
    },
    unsubscribe: state => {
      state.isSubscribed = false;
      state.planId = null;
    },
    setCheckingSubscription: (state, action: PayloadAction<boolean>) => {
      state.isCheckingSubscription = action.payload;
    },
  },
});


export const { subscribe, unsubscribe, setCheckingSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
