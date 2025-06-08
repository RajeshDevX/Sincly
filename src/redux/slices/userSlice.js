// redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
