import { call, put, takeEvery } from 'redux-saga/effects';
import apiClient from '../../services/apiClient';
import {
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
} from '../slices/userSlice';

interface FetchUsersPayload {
  params?: Record<string, any>;
}

interface FetchUserPayload {
  id: number;
}

interface CreateUserPayload {
  data: Record<string, any>;
}

interface UpdateUserPayload {
  id: string;
  data: Record<string, any>;
}

interface DeleteUserPayload {
  id: number;
}

// Fetch all users saga
function* fetchUsersSaga(action: any): Generator<any, void, any> {
  try {
    const payload: FetchUsersPayload = action.payload;
    const response = yield call(() =>
      apiClient.get('/api/users', { params: payload.params })
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message || 'Failed to fetch entities'));
  }
}

// Fetch single user saga
function* fetchUserSaga(action: any): Generator<any, void, any> {
  try {
    const payload: FetchUserPayload = action.payload;
    const response = yield call(() =>
      apiClient.get(`/api/users/${payload.id}`)
    );
    
    yield put(fetchUserSuccess(response.data));
  } catch (error: any) {
    yield put(fetchUserFailure(error.message || 'Failed to fetch user'));
  }
}

// Create user saga
function* createUserSaga(action: any): Generator<any, void, any> {
  try {
    const payload: CreateUserPayload = action.payload;
    const response = yield call(() =>
      apiClient.post(`/api/users`, payload.data)
    );
    yield put(createUserSuccess(response));
  } catch (error: any) {
    yield put(createUserFailure(error.message || 'Failed to create user'));
  }
}

// Update user saga
function* updateUserSaga(action: any): Generator<any, void, any> {
  try {
    const payload: UpdateUserPayload = action.payload;
    const response = yield call(() =>
      apiClient.put(`/api/users/${payload.id}`, payload.data)
    );
    yield put(updateUserSuccess(response));
  } catch (error: any) {
    yield put(updateUserFailure(error.message || 'Failed to update user'));
  }
}

// Delete user saga
function* deleteUserSaga(action: any): Generator<any, void, any> {
  try {
    const payload: DeleteUserPayload = action.payload;
   
    yield call(() => apiClient.delete(`/api/users/${payload.id}`));
    yield put(deleteUserSuccess(payload.id));
  } catch (error: any) {
    yield put(deleteUserFailure(error.message || 'Failed to delete user'));
  }
}

// Root users saga
export function* userSaga(): Generator {
  yield takeEvery(fetchUsersRequest.type, fetchUsersSaga);
  yield takeEvery(fetchUserRequest.type, fetchUserSaga);
  yield takeEvery(createUserRequest.type, createUserSaga);
  yield takeEvery(updateUserRequest.type, updateUserSaga);
  yield takeEvery(deleteUserRequest.type, deleteUserSaga);
}
