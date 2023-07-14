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
    deleteStoredTodo: (state, { payload }: PayloadAction<number>) => {
      state.list = state.list.filter(({ id }) => id !== payload);
    },
    editStoredTodo: (state, { payload }: PayloadAction<Partial<ITodo>>) => {
      state.list = state.list.map(item => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }

        return { ...item };
      });
    },
    createNewTodo: (state, { payload }: PayloadAction<ITodo>) => {
      state.list.push(payload);
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const {
  toggleModalState,
  saveTodos,
  deleteStoredTodo,
  editStoredTodo,
  createNewTodo,
} = todosSlice.actions;
