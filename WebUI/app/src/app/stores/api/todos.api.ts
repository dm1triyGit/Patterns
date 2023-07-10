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
  }),
});

export const { useGetTodosQuery } = todosApi;
