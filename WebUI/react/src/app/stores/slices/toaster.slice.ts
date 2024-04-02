import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Toaster } from '@app/shared/types';

interface ToasterState {
  toastersList: Toaster[];
}

const initialState: ToasterState = {
  toastersList: [],
};

export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    setToaster: (state, { payload }: PayloadAction<Toaster>) => {
      state.toastersList = [...state.toastersList, payload];
    },
    removeToaster: state => {
      state.toastersList = state.toastersList.slice(1);
    },
  },
});

export const { setToaster, removeToaster } = toasterSlice.actions;
export const toasterReducer = toasterSlice.reducer;
