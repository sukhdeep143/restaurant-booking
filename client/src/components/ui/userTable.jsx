import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisteredUserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/registered-users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching registered users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/registered-users/${id}`);
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Start editing
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
    });
  };

  // Submit update
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/registered-users/${editingUser}`, formData);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registered Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.idNumber}</td>
              <td>
                {editingUser === u._id ? (
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  u.name
                )}
              </td>
              <td>
                {editingUser === u._id ? (
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  u.email
                )}
              </td>
              <td>
                {editingUser === u._id ? (
                  <input
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  />
                ) : (
                  u.mobileNumber
                )}
              </td>
              <td>
                {editingUser === u._id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(u)}>Edit</button>
                    <button onClick={() => handleDelete(u._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUserList;
