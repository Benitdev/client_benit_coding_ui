import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';

// declaring the types for our state
export type Modal = {
  isShowCode: boolean;
  htmlCode: string;
  cssCode: string;
};

const initialState: Modal = {
  isShowCode: false,
  htmlCode: '',
  cssCode: '',
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setIsShowCode: (state, action) => {
      state.isShowCode = action.payload;
    },
    setHtmlCode: (state, action) => {
      state.htmlCode = action.payload;
    },
    setCssCode: (state, action) => {
      state.cssCode = action.payload;
    },
  },
});

export const { setIsShowCode, setHtmlCode, setCssCode } = modalSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value

export default modalSlice.reducer;
