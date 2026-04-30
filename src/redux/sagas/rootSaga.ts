import { fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';
import { contactSaga } from './contactSaga';

export function* rootSaga(): Generator {   
    yield fork(authSaga);
    yield fork(userSaga);
    yield fork(contactSaga);
}

