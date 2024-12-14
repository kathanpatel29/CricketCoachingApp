export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with an error
    return error.response.data.message || 'Server error occurred';
  }
  if (error.request) {
    // Request was made but no response
    return 'Network error. Please check your connection.';
  }
  // Something else went wrong
  return 'An unexpected error occurred';
};