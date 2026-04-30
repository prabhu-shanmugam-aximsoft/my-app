import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import contactReducer from './slices/contactSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    contact:contactReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;



