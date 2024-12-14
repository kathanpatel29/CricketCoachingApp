export const reviewService = {
    submitReview: async (coachId, reviewData, token) => {
      const response = await axios.post(
        `${API_URL}/reviews/${coachId}`,
        reviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
  
    getReviews: async (coachId) => {
      const response = await axios.get(`${API_URL}/reviews/${coachId}`);
      return response.data;
    }
  };