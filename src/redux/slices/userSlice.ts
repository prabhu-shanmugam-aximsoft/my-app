import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '../../types';

interface usersState {
    data: User[];
    loading: boolean;
    error: string | null;
    selectedItem: User | null;
}

const initialState: usersState = {
    data: [],
    loading: false,
    error: null,
    selectedItem: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Fetch all users
        fetchUsersRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Fetch single User
        fetchUserRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.selectedItem = action.payload;
        },
        fetchUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create User
        createUserRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        createUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.data.push(action.payload);
        },
        createUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Update User
        updateUserRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            const index = state.data.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        updateUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete User
        deleteUserRequest: (state, _action: PayloadAction<{ id: number }>) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        deleteUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
    clearError,
} = userSlice.actions;

export default userSlice.reducer;
