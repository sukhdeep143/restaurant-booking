// import { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import AuthContext from '../utils/AuthContext'

// const ProtectRoute = ({ requiredRole }) => {
//   const { authState } = useContext(AuthContext);

//   if (authState.loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!authState.token || !authState.user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && authState.user.role !== requiredRole) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectRoute;


import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext'; // Named import

const ProtectRoute = ({ requiredRole }) => {
  const { authState } = useContext(AuthContext);

  if (authState.loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!authState.token || !authState.user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && authState.user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;