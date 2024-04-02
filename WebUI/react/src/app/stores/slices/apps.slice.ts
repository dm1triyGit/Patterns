import { IApp } from '@app/shared/types';
import { createSlice } from '@reduxjs/toolkit';

interface AppsState {
  pages: IApp[];
}

const initialState: AppsState = {
  pages: [
    {
      name: 'Todolist',
      url: '/todos',
      icon: 'ListAlt',
      description: 'Тудушка тудушечка. Ну там создавай, удаляй и все такое.',
    },
  ],
};

export const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {},
});

export const appsReducer = appsSlice.reducer;
