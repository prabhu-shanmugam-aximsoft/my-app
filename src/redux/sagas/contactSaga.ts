import { call, put, takeEvery } from 'redux-saga/effects';
import apiClient from '../../services/apiClient';
import {
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
} from '../slices/contactSlice';

interface FetchContactsPayload {
  params?: Record<string, any>;
}

interface FetchContactPayload {
  id: number;
}

interface CreateContactPayload {
  data: Record<string, any>;
}

interface UpdateContactPayload {
  id: string;
  data: Record<string, any>;
}

interface DeleteContactPayload {
  id: number;
}

// Fetch all contacts saga
function* fetchContactsSaga(action: any): Generator<any, void, any> {
  try {
    const payload: FetchContactsPayload = action.payload;
    const response = yield call(() =>
      apiClient.get('/api/contact', { params: payload.params })
    );
    yield put(fetchContactsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchContactsFailure(error.message || 'Failed to fetch entities'));
  }
}

// Fetch single contact saga
function* fetchContactSaga(action: any): Generator<any, void, any> {
  try {
    const payload: FetchContactPayload = action.payload;
    const response = yield call(() =>
      apiClient.get(`/api/contact/${payload.id}`)
    );
    yield put(fetchContactSuccess(response.data));
  } catch (error: any) {
    yield put(fetchContactFailure(error.message || 'Failed to fetch contact'));
  }
}

// Create contact saga
function* createContactSaga(action: any): Generator<any, void, any> {
  try {
    const payload: CreateContactPayload = action.payload;
    const response = yield call(() =>
      apiClient.post(`/api/contacts`, payload.data)
    );
    yield put(createContactSuccess(response));
  } catch (error: any) {
    yield put(createContactFailure(error.message || 'Failed to create contact'));
  }
}

// Update contact saga
function* updateContactSaga(action: any): Generator<any, void, any> {
  try {
    const payload: UpdateContactPayload = action.payload;
    const response = yield call(() =>
      apiClient.put(`/api/contact/${payload.id}`, payload.data)
    );
    yield put(updateContactSuccess(response));
  } catch (error: any) {
    yield put(updateContactFailure(error.message || 'Failed to update contact'));
  }
}

// Delete contact saga
function* deleteContactSaga(action: any): Generator<any, void, any> {
  try {
    const payload: DeleteContactPayload = action.payload;
   
    yield call(() => apiClient.delete(`/api/contact/${payload.id}`));
    yield put(deleteContactSuccess(payload.id));
  } catch (error: any) {
    yield put(deleteContactFailure(error.message || 'Failed to delete contact'));
  }
}

// Root contact saga
export function* contactSaga(): Generator {
  yield takeEvery(fetchContactsRequest.type, fetchContactsSaga);
  yield takeEvery(fetchContactRequest.type, fetchContactSaga);
  yield takeEvery(createContactRequest.type, createContactSaga);
  yield takeEvery(updateContactRequest.type, updateContactSaga);
  yield takeEvery(deleteContactRequest.type, deleteContactSaga);
}
