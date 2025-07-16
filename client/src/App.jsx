// // import React from "react";
// // import { Routes, Route, BrowserRouter } from "react-router-dom";

// // import LoginPage from "./pages/LoginPage";
// // import SignUpPage from "./pages/SignUpPage";
// // import ForgotPassword from "./pages/ForgetPassword";
// // import ProtectRoute from "./pages/ProtectRoute";
// // import Home from "./pages/Home";
// // import VerifyEmailPage from "./pages/VerifyEmail";
// // import Footer from "./components/Footer";
// // import Header from "./components/Header ";
// // import UserProfile from './components/UserProfile';
// // import UserPanel from "./pages/UserPanel";
// // import AdminDashboard from "./pages/AdminDashboard"



// // const token = localStorage.getItem('token');
// // // console.log(token);

// // const userId = localStorage.getItem('userId');
// // // console.log(userId);


// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Header />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/login" element={<LoginPage />} />
// //         <Route path="/signup" element={<SignUpPage />} />
// //         <Route path="/forgot-password" element={<ForgotPassword />} />
// //         <Route path="/verify-email" element={<VerifyEmailPage />} />
// //         <Route path="/profile" element={<UserProfile />} />
// //         <Route
// //             path="/admin/dashboard"
// //             element={
// //               <ProtectRoute requiredRole="admin">
// //                 <AdminDashboard />
// //               </ProtectRoute>
// //             }
// //             />
// //             <Route
// //               path="/userpanel/profile"
// //               element={
// //                 <ProtectRoute requiredRole="user">
// //                   <UserPanel/>
// //                 </ProtectRoute>
// //               }
// //             />
           
        
        
// //       </Routes>
// //       <Footer />
// //     </BrowserRouter>
// //   );
// // }

// // export default App;




// import React from 'react';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import  AuthProvider  from './utils/AuthContext'; // Import AuthProvider
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
// import ForgotPassword from './pages/ForgetPassword';
// import ProtectRoute from './pages/ProtectRoute';
// import Home from './pages/Home';
// import VerifyEmailPage from './pages/VerifyEmail';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import UserProfile from './components/UserProfile';
// import UserPanel from './pages/UserPanel';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-email" element={<VerifyEmailPage />} />
//           <Route path="/profile" element={<UserProfile />} />
//           <Route
//             path="/admin/dashboard"
//             element={
//               <ProtectRoute requiredRole="admin">
//                 <AdminDashboard />
//               </ProtectRoute>
//             }
//           />
//           <Route
//             path="/userpanel/profile"
//             element={
//               <ProtectRoute requiredRole="user">
//                 <UserPanel />
//               </ProtectRoute>
//             }
//           />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext'; // Correct import
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgetPassword';
import ProtectRoute from './pages/ProtectRoute';
import Home from './pages/Home';
import VerifyEmailPage from './pages/VerifyEmail';
import Footer from './components/Footer';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import UserPanel from './pages/UserPanel';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route element={<ProtectRoute requiredRole="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectRoute requiredRole="user" />}>
            <Route path="/userpanel/profile" element={<UserPanel />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;