import { ITodo } from '@app/shared/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type OpenModalPayload = {
  state: boolean;
  item?: ITodo;
};

export interface TodosState {
  list: ITodo[];
  modalOpen: boolean;
  editedItem: ITodo | null;
}

const initialState: TodosState = {
  list: [],
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
    saveTodos: (state, { payload }: PayloadAction<ITodo[]>) => {
      const sorted = payload
        .slice()
        .sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime(),
        );
      state.list = sorted;
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const { toggleModalState, saveTodos } = todosSlice.actions;
