import { call, put, takeLatest } from 'redux-saga/effects';
import apiClient from '../../services/apiClient';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure
} from '../slices/authSlice';

interface LoginPayload {
    email: string;
    password: string;
}

interface UpdateProfilePayload {
    email: string;
    role: string;
    password?: string;
}

// Login Saga
function* handleLogin(action: any): any {
    try {
        const payload: LoginPayload = action.payload;
        const response = yield call(apiClient.post, '/api/login', payload);

        const { token, role } = response.data;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userrole", role);
        // Fetch user profile after successful login
        const profileResponse = yield call(apiClient.get, '/api/profile');

        yield put(
            loginSuccess({ token, user: profileResponse.data, role })
        );
    } catch (error: any) {
        console.log(error);
        console.log(error.response);
        const errorMessage = error.response?.data?.message || 'Login failed';
        yield put(loginFailure(errorMessage));
    }
}

// Logout Saga
function* handleLogout(): any {
    try {
        yield call(apiClient.post, '/api/logout');
        yield put(logoutSuccess());
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Logout failed';
        console.error('Logout error:', errorMessage);
        // Still logout locally even if API call fails
        yield put(logoutSuccess());
    }
}

// Fetch Profile Saga
function* handleFetchProfile(): any {
    try {
        const response = yield call(apiClient.get, '/api/profile');
        yield put(fetchProfileSuccess(response.data));
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
        yield put(fetchProfileFailure(errorMessage));
    }
}

// Update Profile saga
function* updateProfileSaga(action: any): Generator<any, void, any> {
    try {
        const payload: UpdateProfilePayload = action.payload.data;
        const response = yield call(() =>
            apiClient.put(`/api/profile/`, payload)
        );
        yield put(updateProfileSuccess(response.data));
    } catch (error: any) {
        yield put(updateProfileFailure(error.message || 'Failed to update user'));
    }
}

export function* authSaga(): any {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(logoutRequest.type, handleLogout);
    yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
    yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}
