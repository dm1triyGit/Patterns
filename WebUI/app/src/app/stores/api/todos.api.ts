import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PUBLIC_API } from '../assets/public-api-url';
import { ITodo } from '@app/shared/types';

export const todosApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: PUBLIC_API }),
  endpoints: builder => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => 'todoitem/get',
    }),
    deleteTodo: builder.mutation<void, number>({
      query: id => ({
        url: 'todoitem/delete',
        params: {
          id,
        },
        method: 'DELETE',
      }),
    }),
    createTodo: builder.mutation<void, Partial<ITodo>>({
      query: todo => ({
        url: 'todoitem/create',
        method: 'POST',
        body: JSON.stringify(todo),
      }),
    }),
    editTodo: builder.mutation<void, Partial<ITodo>>({
      query: todo => ({
        url: 'todoitem/update',
        method: 'PUT',
        body: JSON.stringify(todo),
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
  useEditTodoMutation,
} = todosApi;
