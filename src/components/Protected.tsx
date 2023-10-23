import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: any) {
  if (localStorage.getItem('type') === 'user') {
    return <Navigate to="/" />;
  }
  return children;
}
