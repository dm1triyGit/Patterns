import { createSlice } from '@reduxjs/toolkit';

export interface TodosState {
  list: string[];
}

const initialState: TodosState = {
  list: ['todo1', 'todo2'],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export const todosReducer = todosSlice.reducer;
