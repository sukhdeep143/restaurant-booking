// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RegisteredUserList = () => {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobileNumber: '',
//   });

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('/api/registered-users');
//       setUsers(res.data);
//     } catch (error) {
//       console.error('Error fetching registered users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Delete user
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/registered-users/${id}`);
//       fetchUsers(); // Refresh list
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Start editing
//   const handleEdit = (user) => {
//     setEditingUser(user._id);
//     setFormData({
//       name: user.name,
//       email: user.email,
//       mobileNumber: user.mobileNumber,
//     });
//   };

//   // Submit update
//   const handleUpdate = async () => {
//     try {
//       await axios.put(`/api/registered-users/${editingUser}`, formData);
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Registered Users</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>ID Number</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id}>
//               <td>{u.idNumber}</td>
//               <td>
//                 {editingUser === u._id ? (
//                   <input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   />
//                 ) : (
//                   u.name
//                 )}
//               </td>
//               <td>
//                 {editingUser === u._id ? (
//                   <input
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   />
//                 ) : (
//                   u.email
//                 )}
//               </td>
//               <td>
//                 {editingUser === u._id ? (
//                   <input
//                     value={formData.mobileNumber}
//                     onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
//                   />
//                 ) : (
//                   u.mobileNumber
//                 )}
//               </td>
//               <td>
//                 {editingUser === u._id ? (
//                   <>
//                     <button onClick={handleUpdate}>Save</button>
//                     <button onClick={() => setEditingUser(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(u)}>Edit</button>
//                     <button onClick={() => handleDelete(u._id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RegisteredUserList;
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/registered-users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
    });
  };

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b">ID Number</th>
              <th className="py-2 px-4 text-left border-b">Name</th>
              <th className="py-2 px-4 text-left border-b">Email</th>
              <th className="py-2 px-4 text-left border-b">Mobile</th>
              <th className="py-2 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{u.idNumber}</td>
                <td className="py-2 px-4">
                  {editingUser === u._id ? (
                    <input
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingUser === u._id ? (
                    <input
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingUser === u._id ? (
                    <input
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={formData.mobileNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobileNumber: e.target.value,
                        })
                      }
                    />
                  ) : (
                    u.mobileNumber
                  )}
                </td>
                <td className="py-2 px-4 space-x-2">
                  {editingUser === u._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="!bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(u)}
                        className="!bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="!bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredUserList;
