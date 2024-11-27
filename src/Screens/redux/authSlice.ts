import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../ScreenSignup/utils/interface';
import {AuthState} from '../../utils/interfaces/types';
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
