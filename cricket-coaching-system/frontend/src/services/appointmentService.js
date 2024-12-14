export const appointmentService = {
    fetchAppointments: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/coach`, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      if (!response.ok) throw new Error('Failed to fetch appointments');
      return response.json();
    },
  
    createAppointment: async (appointmentData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/slots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(appointmentData)
      });
      if (!response.ok) throw new Error('Failed to create appointment');
      return response.json();
    },
  
    updateAppointmentStatus: async (appointmentId, status) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update appointment status');
      return response.json();
    }
  };