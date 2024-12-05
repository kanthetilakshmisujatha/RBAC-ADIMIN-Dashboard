import axios from 'axios';

const API_URL = 'https://mockapi.io/api/rbac'; // Mock API URL

// User APIs
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    // Ensure the response data is an array
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Expected an array but got:", response.data);
      return []; // Return an empty array if data is not an array
    }
  } catch (error) {
    console.error("Error fetching users", error);
    return []; // Return an empty array in case of an error
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
    return null; // Return null if creation fails
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    return null; // Return null if update fails
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    return null; // Return null if delete fails
  }
};

// Role APIs (similar to User APIs)
export const fetchRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    // Ensure the response data is an array
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Expected an array but got:", response.data);
      return []; // Return an empty array if data is not an array
    }
  } catch (error) {
    console.error("Error fetching roles", error);
    return []; // Return an empty array in case of an error
  }
};
