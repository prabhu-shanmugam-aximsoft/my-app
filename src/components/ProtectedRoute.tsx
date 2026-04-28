import { Navigate, useLocation } from 'react-router';
import type { JSX } from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children} : ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken'); // Retrieve your token
  const location = useLocation();

  if (!token) {
    // Redirect to login if token is missing
    // Use 'state' to save the current location so you can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  } 

  return children; // Render protected content if token exists
};

export default ProtectedRoute