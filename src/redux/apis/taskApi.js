// redux/apis/taskApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
