export const adminService = {
  // Function to fetch stats for the admin dashboard
  fetchStats: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });

    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Function to get a list of users
  getUsers: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });

    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // Function to delete a user by ID
  deleteUser: async (userId) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });

    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  }
};