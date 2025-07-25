import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const ProtectRoute = ({ requiredRole }) => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error('AuthContext is not provided');
    return <Navigate to="/login" replace />;
  }

  const { authState } = context;

  if (authState.loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!authState.token || !authState.user) {
    return <Navigate to="/login" replace />;
  }

  console.log(authState.user.role )
  console.log(authState.user.role )
  console.log(authState.user.role )
  console.log(authState.user.role )

  if (requiredRole && authState.user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;