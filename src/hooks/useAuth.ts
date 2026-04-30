import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import {
  loginRequest,
  logoutRequest,
  fetchProfileRequest,
  clearError,
  updateProfileRequest
} from '../redux/slices/authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const login = (credentials: LoginCredentials) => {
    dispatch(loginRequest(credentials));
  };

  const logout = () => {
    dispatch(logoutRequest());
  };

  const fetchProfile = () => {
    dispatch(fetchProfileRequest());
  };

  const update = (data: Record<string, any>) => {
    dispatch(updateProfileRequest({ data }));
  };


  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    fetchProfile,
    update,
    clearAuthError
  };
};
