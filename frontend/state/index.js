import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    isLoggedIn: false,
    role: null,
    loading: false,
    isSessionExpired: false, // ✅ Added session expiration state
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = Boolean(action.payload.user);
            state.role = action.payload.user.role;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            state.role = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSessionExpired(state, action) { // ✅ Added action for session expiration
            state.isSessionExpired = action.payload;
        },
    }
});

// Export actions
export const { setMode, setLogin, setLogout, setLoading, setSessionExpired } = authSlice.actions;

// Export reducer
export default authSlice.reducer;