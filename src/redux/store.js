// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import { authApi } from './apis/authApi';
import { taskApi } from './apis/taskApi';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware),
});

export default store;
