import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardData, HomeState} from '../../Utils/Types';

const initialState: HomeState = {
  data: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<CardData[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchDataRequest, fetchDataSuccess, fetchDataFailure} =
  homeSlice.actions;
export default homeSlice.reducer;
export type HomeActions =
  | ReturnType<typeof fetchDataRequest>
  | ReturnType<typeof fetchDataSuccess>
  | ReturnType<typeof fetchDataFailure>;
