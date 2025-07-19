// import React from "react";

// export default function UserProfile() {
//   // Dummy user data (replace with real user context / fetch later)
//   const user = {
//     name: "Sukhdeep Singh",
//     email: "sukhdeep@example.com",
//     phone: "+91 9876543210",
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center py-10 px-4">
//       <div className="max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 User Profile</h2>
        
//         <div className="space-y-4 text-gray-700">
//           <div className="flex justify-between items-center border-b border-gray-200 pb-2">
//             <span className="font-medium">Name:</span>
//             <span>{user.name}</span>
//           </div>
          
//           <div className="flex justify-between items-center border-b border-gray-200 pb-2">
//             <span className="font-medium">Email:</span>
//             <span>{user.email}</span>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <span className="font-medium">Phone:</span>
//             <span>{user.phone}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);

   const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
useEffect(() => {
  const fetchUser = async () => {
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  fetchUser();
}, []);


const handleInputChange = (e) => {
  if (!user) return; // Prevent null error
  setUser({ ...user, [e.target.name]: e.target.value });
};


  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(`/api/user`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put(`/api/user/password`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswordData({ oldPassword: "", newPassword: "" });
      alert("Password updated successfully");
    } catch (err) {
      console.error("Password error:", err);
      alert("Incorrect current password");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Account deleted");
        localStorage.clear();
        window.location.href = "/";
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8 font-sans">
      <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

      {editMode ? (
        <div className="space-y-4">
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="middleName"
            value={user.middleName}
            onChange={handleInputChange}
            placeholder="Middle Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="age"
            value={user.age}
            onChange={handleInputChange}
            placeholder="Age"
            type="number"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <select
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="address"
            value={user.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <div className="flex gap-3">
            <button
              onClick={handleProfileUpdate}
              className="!bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              💾 Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="!bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.firstName} {user.middleName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.countryCode}-{user.phoneNumber}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button
            onClick={() => setEditMode(true)}
            className="!bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-600"
          >
            ✏️ Edit Profile
          </button>
        </div>
      )}

      <h3 className="mt-8 mb-2 font-semibold text-lg">🔐 Change Password</h3>
      {/* <input
        type="password"
        placeholder="Current Password"
        value={passwordData.oldPassword}
        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded mb-2"
      /> */}

       <div className="relative mb-2">
        <input
          type={showOldPassword ? "text" : "password"}
          placeholder="Current Password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, oldPassword: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded pr-10"
        />
        <span
          onClick={() => setShowOldPassword((prev) => !prev)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:scale-110 transition-transform"

        >
          {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>


      {/* <input
        type="password"
        placeholder="New Password"
        value={passwordData.newPassword}
        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded mb-2"
      /> */}

      <div className="relative mb-4">
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded pr-10"
        />
        <span
          onClick={() => setShowNewPassword((prev) => !prev)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500"
        >
          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>


      <button
        onClick={handlePasswordChange}
        className="!bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Update Password
      </button>

      <h3 className="mt-8 mb-2 font-semibold text-lg text-red-600">⚠️ Danger Zone</h3>
      <button
        onClick={handleDelete}
        className="!bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        🗑️ Delete Account
      </button>
    </div>
  );
};

export default ProfileSection;
