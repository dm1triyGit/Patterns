import { ITodo } from '@app/shared/types';
import { createSlice } from '@reduxjs/toolkit';

export interface TodosState {
  list: ITodo[];
}

const initialState: TodosState = {
  list: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export const todosReducer = todosSlice.reducer;
