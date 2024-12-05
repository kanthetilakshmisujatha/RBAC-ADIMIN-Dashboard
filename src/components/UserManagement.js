// import React, { useState } from 'react';
// import './UserManagement.css';
// import { FaEdit, FaTrashAlt, FaPlusCircle, FaPowerOff } from 'react-icons/fa';

// function UserManagement() {
//   const [users, setUsers] = useState([
//     { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
//     { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
//   ]);

//   const [userForm, setUserForm] = useState({ name: '', role: '', status: 'Active' });
//   const [editingUser, setEditingUser] = useState(null);
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserForm({
//       ...userForm,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     if (!userForm.name || !userForm.role) {
//       setError('All fields are required.');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const addUser = () => {
//     if (validateForm()) {
//       setUsers([...users, { ...userForm, id: Date.now() }]);
//       setUserForm({ name: '', role: '', status: 'Active' });
//     }
//   };

//   const editUser = (user) => {
//     setUserForm(user);
//     setEditingUser(user.id);
//   };

//   const saveUser = () => {
//     if (validateForm()) {
//       setUsers(users.map((user) => (user.id === editingUser ? userForm : user)));
//       setUserForm({ name: '', role: '', status: 'Active' });
//       setEditingUser(null);
//     }
//   };

//   const deleteUser = (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(users.filter((user) => user.id !== id));
//     }
//   };

//   const toggleStatus = (id) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
//       )
//     );
//   };

//   return (
//     <div className="user-management">
//       <h2>User Management</h2>
//       <form>
//         {error && <p className="error-message">{error}</p>}
//         <input
//           type="text"
//           name="name"
//           placeholder="User Name"
//           value={userForm.name}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="role"
//           placeholder="User Role"
//           value={userForm.role}
//           onChange={handleInputChange}
//         />
//         <select name="status" value={userForm.status} onChange={handleInputChange}>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//         <button type="button" onClick={editingUser ? saveUser : addUser}>
//           <FaPlusCircle /> {editingUser ? 'Save User' : 'Add User'}
//         </button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.role}</td>
//               <td>{user.status}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => editUser(user)}>
//                   <FaEdit /> Edit
//                 </button>
//                 <button className="toggle-btn" onClick={() => toggleStatus(user.id)}>
//                   <FaPowerOff /> {user.status === 'Active' ? 'Deactivate' : 'Activate'}
//                 </button>
//                 <button className="delete-btn" onClick={() => deleteUser(user.id)}>
//                   <FaTrashAlt /> Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UserManagement;
import React, { useState } from 'react';
import './UserManagement.css';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaPowerOff, FaSearch } from 'react-icons/fa'; // Import FaSearch

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Alice Johnson', role: 'Editor', status: 'Active' },
    { id: 4, name: 'Bob Brown', role: 'User', status: 'Inactive' }
  ]);
  const [roles] = useState(['Admin', 'Editor', 'User']);
  const [userForm, setUserForm] = useState({ name: '', role: '', status: 'Active' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!userForm.name || !userForm.role) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  // Simulating an API call to add a user
  const mockApiCreateUser = (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user); // Simulating success response from API
      }, 1000); // Simulating a 1-second delay
    });
  };

  // Simulating an API call to update user
  const mockApiUpdateUser = (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user); // Simulating success response from API
      }, 1000); // Simulating a 1-second delay
    });
  };

  // Simulating an API call to delete user
  const mockApiDeleteUser = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userId); // Simulating success response from API
      }, 1000); // Simulating a 1-second delay
    });
  };

  // Simulating an API call to toggle user status
  const mockApiToggleStatus = (userId, newStatus) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: userId, status: newStatus }); // Simulating success response from API
      }, 1000); // Simulating a 1-second delay
    });
  };

  const addUser = () => {
    if (validateForm()) {
      const newNameLower = userForm.name.toLowerCase();
      const isDuplicate = users.some((user) => user.name.toLowerCase() === newNameLower);
      if (isDuplicate) {
        setError('A user with this name already exists.');
        return;
      }

      mockApiCreateUser(userForm).then((newUser) => {
        setUsers([...users, { ...newUser, id: Date.now() }]);
        setUserForm({ name: '', role: '', status: 'Active' });
        setFeedback('User added successfully.');
        setFeedbackType('success');
      });
    }
  };

  const editUser = (user) => {
    setUserForm(user);
    setEditingUser(user.id);
    setFeedback('');
  };

  const saveUser = () => {
    if (validateForm()) {
      mockApiUpdateUser(userForm).then((updatedUser) => {
        setUsers(users.map((user) => (user.id === editingUser ? updatedUser : user)));
        setUserForm({ name: '', role: '', status: 'Active' });
        setEditingUser(null);
        setFeedback('User details updated successfully.');
        setFeedbackType('success');
      });
    }
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      mockApiDeleteUser(id).then((deletedId) => {
        setUsers(users.filter((user) => user.id !== deletedId));
        setFeedback('User deleted successfully.');
        setFeedbackType('error');
      });
    }
  };

  const toggleStatus = (id) => {
    const user = users.find((user) => user.id === id);
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    mockApiToggleStatus(id, newStatus).then((updatedUser) => {
      setUsers(
        users.map((user) =>
          user.id === updatedUser.id ? { ...user, status: updatedUser.status } : user
        )
      );
      setFeedback('User status updated.');
      setFeedbackType('success');
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.role.toLowerCase().includes(searchQuery)
  );

  // Calculate the counts of Active and Inactive users
  const activeCount = users.filter((user) => user.status === 'Active').length;
  const inactiveCount = users.filter((user) => user.status === 'Inactive').length;

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {/* Display Active and Inactive User Count */}
      <div className="user-counts">
        <p className="active"><strong>Active Users:</strong> {activeCount}</p>
        <p className="inactive"><strong>Inactive Users:</strong> {inactiveCount}</p>
      </div>

      {/* Search Bar with Icon */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or role"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FaSearch className="search-icon" /> {/* Search Icon inside the input field */}
      </div>

      {/* Feedback message */}
      {feedback && (
        <p className={`feedback-message ${feedbackType}`}>
          {feedback}
        </p>
      )}

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* User Form */}
      <form>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={userForm.name}
            onChange={handleInputChange}
          />
          <select name="role" value={userForm.role} onChange={handleInputChange}>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select name="status" value={userForm.status} onChange={handleInputChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="button" onClick={editingUser ? saveUser : addUser}>
          <FaPlusCircle /> {editingUser ? 'Save User' : 'Add User'}
        </button>
      </form>

      {/* User Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button className="edit-btn" onClick={() => editUser(user)}>
                  <FaEdit /> Edit
                </button>
                <button className="toggle-btn" onClick={() => toggleStatus(user.id)}>
                  <FaPowerOff /> {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
