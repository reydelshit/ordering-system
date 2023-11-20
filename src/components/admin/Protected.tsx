import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: any) {
  if (
    localStorage.getItem('type') === 'user' ||
    localStorage.getItem('type') === 'rider'
  ) {
    return <Navigate to="/" />;
  }
  return children;
}
