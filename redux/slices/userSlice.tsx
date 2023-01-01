import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';

// declaring the types for our state
export type User = any;

const initialState: User = {
  info: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
