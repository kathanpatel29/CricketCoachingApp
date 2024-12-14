import axios from 'axios';

export const authService = {
  async login(email, password) {
    try {
      const response = await axios.post('/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Login error response:', error.response);
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  },

  async adminLogin(email, password) {
    try {
      const response = await axios.post('/api/auth/admin-login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Admin login error response:', error.response);
      throw new Error(error.response?.data?.message || 'Invalid admin credentials');
    }
  },

  async register(data) {
    try {
      const response = await axios.post('/api/auth/register', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Registration error response:', error.response);
      console.error('Registration error message:', error.message);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
};
