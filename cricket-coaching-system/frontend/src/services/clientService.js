export const clientService = {
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
  },
  getCoaches: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/coaches`);
    if (!response.ok) throw new Error('Failed to fetch coaches');
    return response.json();
  },

  fetchAppointments: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/client`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
  },

  cancelAppointment: async (appointmentId) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });
    if (!response.ok) throw new Error('Failed to cancel appointment');
    return response.json();
  },

  getCoachProfile: async (coachId) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/coaches/${coachId}`);
    if (!response.ok) throw new Error('Failed to fetch coach profile');
    return response.json();
  },

  createBooking: async (bookingData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(bookingData)
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  }
};
