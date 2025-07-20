// // // import { createContext, useContext, useState, useEffect } from 'react';
// // // import { Navigate } from 'react-router-dom';

// // // // Auth Context
// // // const AuthContext = createContext(null);

// // // // Auth Provider
// // // export const AuthProvider = ({ children }) => {
// // //   const [authState, setAuthState] = useState({
// // //     token: localStorage.getItem('token') || null,
// // //     user: null,
// // //     loading: true,
// // //   });

// // //   useEffect(() => {
// // //     // Load and decode token if present
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       try {
// // //         const base64Url = token.split('.')[1];
// // //         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
// // //         const jsonPayload = decodeURIComponent(
// // //           atob(base64)
// // //             .split('')
// // //             .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
// // //             .join('')
// // //         );
// // //         const decoded = JSON.parse(jsonPayload);
// // //         setAuthState({ token, user: { userId: decoded.userId, email: decoded.email, role: decoded.role }, loading: false });
// // //       } catch (error) {
// // //         console.error('Token decode error:', error);
// // //         localStorage.removeItem('token');
// // //         setAuthState({ token: null, user: null, loading: false });
// // //       }
// // //     } else {
// // //       setAuthState({ token: null, user: null, loading: false });
// // //     }
// // //   }, []);

// // //   // Assume login is handled by your existing system
// // //   const login = (token, userData) => {
// // //     localStorage.setItem('token', token);
// // //     setAuthState({ token, user: userData, loading: false });
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem('token');
// // //     setAuthState({ token: null, user: null, loading: false });
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ authState, login, logout }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };


// // import { createContext, useContext, useState, useEffect } from 'react';
// // import { Navigate } from 'react-router-dom';

// // // Create the Auth Context
// // export const AuthContext = createContext(null);

// // // Auth Provider
// // export const AuthProvider = ({ children }) => {
// //   const [authState, setAuthState] = useState({
// //     token: localStorage.getItem('token') || null,
// //     user: null,
// //     loading: true,
// //   });

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       try {
// //         const base64Url = token.split('.')[1];
// //         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
// //         const jsonPayload = decodeURIComponent(
// //           atob(base64)
// //             .split('')
// //             .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
// //             .join('')
// //         );
// //         const decoded = JSON.parse(jsonPayload);
// //         setAuthState({ token, user: { userId: decoded.userId, email: decoded.email, role: decoded.role }, loading: false });
// //       } catch (error) {
// //         console.error('Token decode error:', error);
// //         localStorage.removeItem('token');
// //         setAuthState({ token: null, user: null, loading: false });
// //       }
// //     } else {
// //       setAuthState({ token: null, user: null, loading: false });
// //     }
// //   }, []);

// //   const login = (token, userData) => {
// //     localStorage.setItem('token', token);
// //     setAuthState({ token, user: userData, loading: false });
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     setAuthState({ token: null, user: null, loading: false });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ authState, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // // Optional: Export a custom hook to use the context
// // export const useAuth = () => useContext(AuthContext);

// // utils/AuthContext.jsx
// import { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     loading: true,
//     token: null,
//     user: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');

//     const fetchUserData = async () => {
//       try {
//         if (token && userId) {
//           // Replace with your actual API call to fetch user data
//           const user = { id: userId, role: 'user' }; // Mock user; update with API response
//           setAuthState({
//             loading: false,
//             token,
//             user,
//           });
//         } else {
//           setAuthState({
//             loading: false,
//             token: null,
//             user: null,
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setAuthState({
//           loading: false,
//           token: null,
//           user: null,
//         });
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ authState, setAuthState }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role'); // ✅ Get role from localStorage

    const fetchUserData = async () => {
      try {
        if (token && userId && role) {
          const user = { id: userId, role }; // ✅ Use real role from storage
          setAuthState({
            loading: false,
            token,
            user,
          });
        } else {
          setAuthState({
            loading: false,
            token: null,
            user: null,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAuthState({
          loading: false,
          token: null,
          user: null,
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
