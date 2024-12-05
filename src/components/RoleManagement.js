import React, { useState, useEffect } from 'react';
import './Management.css'; // CSS File for Styling
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from 'react-icons/fa'; // Importing icons

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState(['Read', 'Write', 'Delete']); // Default Permissions

  const [roleForm, setRoleForm] = useState({ roleName: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null);
  const [feedback, setFeedback] = useState(''); // For success/failure messages
  const [feedbackType, setFeedbackType] = useState(''); // To determine the feedback color (success or error)
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    setTimeout(() => {
      setRoles([
        { id: 1, roleName: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
        { id: 2, roleName: 'User', permissions: ['Read', 'Write'] },
      ]);
    }, 500);
  };

  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleForm({ ...roleForm, [name]: value });
  };

  const togglePermission = (permission) => {
    setRoleForm((prevForm) => {
      const updatedPermissions = prevForm.permissions.includes(permission)
        ? prevForm.permissions.filter((perm) => perm !== permission)
        : [...prevForm.permissions, permission];
      return { ...prevForm, permissions: updatedPermissions };
    });
  };

  const addRole = () => {
    if (roleForm.roleName && roleForm.permissions.length > 0) {
      setRoles([...roles, { ...roleForm, id: roles.length + 1 }]);
      setRoleForm({ roleName: '', permissions: [] });
      setFeedback('Role added successfully.');
      setFeedbackType('success'); // Success feedback
    } else {
      setFeedback('Please fill in all fields (Role Name and Permissions)');
      setFeedbackType('error'); // Error feedback
    }
  };

  const editRole = (role) => {
    setRoleForm(role);
    setEditingRole(role.id);
    setFeedback('');
  };

  const saveRole = () => {
    setRoles(roles.map((role) => (role.id === editingRole ? roleForm : role)));
    setRoleForm({ roleName: '', permissions: [] });
    setEditingRole(null);
    setFeedback('Role updated successfully.');
    setFeedbackType('success'); // Success feedback
  };

  const deleteRole = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== id));
      setFeedback('Role deleted successfully.');
      setFeedbackType('error'); // Error feedback for delete
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter roles based on the search query
  const filteredRoles = roles.filter(
    (role) =>
      role.roleName.toLowerCase().includes(searchQuery) ||
      role.permissions.some((perm) => perm.toLowerCase().includes(searchQuery))
  );

  return (
    <div className="role-management">
      <h2>Role Management</h2>

      {/* Search Bar with Icon */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by role name or permission"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Feedback message */}
      {feedback && (
        <p className={`feedback-message ${feedbackType}`}>
          {feedback}
        </p>
      )}

      <form>
        {/* Dropdown for Role Name Selection */}
        <select
          name="roleName"
          value={roleForm.roleName}
          onChange={handleRoleInputChange}
          className="role-name-dropdown"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>

        <div className="permissions">
          {permissions.map((permission) => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={roleForm.permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
                disabled={roleForm.roleName === 'User' && permission === 'Delete'} // User cannot have 'Delete' permission
              />
              {permission}
            </label>
          ))}
        </div>

        <button type="button" onClick={editingRole ? saveRole : addRole} className="add-role-btn">
          <FaPlusCircle /> {editingRole ? 'Save Role' : 'Add Role'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id}>
              <td className="role-name">{role.roleName}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button className="edit-btn" onClick={() => editRole(role)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => deleteRole(role.id)}>
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

export default RoleManagement;
