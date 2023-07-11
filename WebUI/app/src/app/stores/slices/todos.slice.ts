import { ITodo } from '@app/shared/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type OpenModalPayload = {
  state: boolean;
  item?: ITodo;
};

export interface TodosState {
  modalOpen: boolean;
  editedItem: ITodo | null;
}

const initialState: TodosState = {
  modalOpen: false,
  editedItem: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleModalState: (state, { payload }: PayloadAction<OpenModalPayload>) => {
      state.modalOpen = payload.state;
      state.editedItem = payload.item ?? null;
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const { toggleModalState } = todosSlice.actions;
