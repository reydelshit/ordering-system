import { Navigate } from 'react-router-dom';

export default function ProtectedRouteRider({ children }: any) {
  if (
    localStorage.getItem('type') === 'user' &&
    localStorage.getItem('type') === 'admin'
  ) {
    return <Navigate to="/" />;
  }
  return children;
}
