
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [form, setForm] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setForm(res.data); // pre-fill edit form
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      }
    };

    fetchUser();
  }, [token,userId]);

  const handleProfileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const res = await axios.put("/api/user/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
    }
  };

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await axios.put(
        "/api/user/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password changed successfully.");
      setChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error changing password.");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      <div className="space-y-2">
        <div><strong>Full Name:</strong> {user.firstName} {user.lastName}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Gender:</strong> {user.gender}</div>
        <div><strong>Age:</strong> {user.age}</div>
        <div><strong>Role:</strong> {user.role}</div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setEditing(true)}
        >
          Edit Profile
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setChangingPassword(true)}
        >
          Change Password
        </button>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96 space-y-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>
            {["firstName", "lastName", "phone", "gender", "age"].map((field) => (
              <input
                key={field}
                name={field}
                value={form[field] || ""}
                onChange={handleProfileChange}
                placeholder={field}
                className="w-full border p-2 rounded"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>
              <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-600 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {changingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96 space-y-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Change Password</h3>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="w-full border p-2 rounded"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full border p-2 rounded"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="w-full border p-2 rounded"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setChangingPassword(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>
              <button onClick={handlePasswordChange} className="px-4 py-2 bg-green-600 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
