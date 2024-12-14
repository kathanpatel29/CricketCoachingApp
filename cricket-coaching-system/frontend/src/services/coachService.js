export const coachService = {
  fetchProfile: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/coaches/profile`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  },

  updateProfile: async (profileData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/coaches/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  }
};