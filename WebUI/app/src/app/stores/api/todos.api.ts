import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PUBLIC_API } from '../assets/public-api-url';

export const todosApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: PUBLIC_API }),
  endpoints: builder => ({
    getTodos: builder.query<any, void>({
      query: () => 'todoitem/get',
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
