import Review from '../models/Review.js';

export const reviewController = {
  async create(req, res) {
    try {
      const { coachId, rating, comment } = req.body;
      const review = await Review.create({
        client: req.user.id,
        coach: coachId,
        rating,
        comment
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getCoachReviews(req, res) {
    try {
      const reviews = await Review.find({ coach: req.params.coachId })
        .populate('client', 'name')
        .sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
