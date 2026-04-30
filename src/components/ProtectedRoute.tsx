import { Navigate } from 'react-router';
import type { JSX } from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated:" + isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children; 
};

export default ProtectedRoute