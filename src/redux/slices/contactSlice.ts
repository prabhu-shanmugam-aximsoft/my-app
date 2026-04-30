import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Contact } from '../../types';

interface contactsState {
    data: Contact[];
    loading: boolean;
    error: string | null;
    selectedItem: Contact | null;
}

const initialState: contactsState = {
    data: [],
    loading: false,
    error: null,
    selectedItem: null,
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // Fetch all contacts
        fetchContactsRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        fetchContactsSuccess: (state, action: PayloadAction<Contact[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchContactsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Fetch single Contact
        fetchContactRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        fetchContactSuccess: (state, action: PayloadAction<Contact>) => {
            state.loading = false;
            state.selectedItem = action.payload;
        },
        fetchContactFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Create Contact
        createContactRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        createContactSuccess: (state, action: PayloadAction<Contact>) => {
            state.loading = false;
            state.data.push(action.payload);
        },
        createContactFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Update Contact
        updateContactRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
            state.error = null;
        },
        updateContactSuccess: (state, action: PayloadAction<Contact>) => {
            state.loading = false;
            const index = state.data.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        updateContactFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete Contact
        deleteContactRequest: (state, _action: PayloadAction<{ id: number }>) => {
            state.loading = true;
            state.error = null;
        },
        deleteContactSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        deleteContactFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsFailure,
    fetchContactRequest,
    fetchContactSuccess,
    fetchContactFailure,
    createContactRequest,
    createContactSuccess,
    createContactFailure,
    updateContactRequest,
    updateContactSuccess,
    updateContactFailure,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactFailure,
    clearError,
} = contactSlice.actions;

export default contactSlice.reducer;
