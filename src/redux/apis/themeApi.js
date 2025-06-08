// redux/apis/taskApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskData) => ({
        url: '/abc',
        method: 'POST',
        body: taskData,
      }),
    }),
  }),
});

export const { useCreateTaskMutation } = taskApi;
