import express from 'express';
import { reviewController } from '../controllers/reviewController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Protect all review routes (authentication required)
router.use(auth);

// Route to create a new review
// POST /api/reviews - Adds a review for a coach (auth required)
router.post('/', reviewController.create);

// Route to get all reviews for a specific coach
// GET /api/reviews/coach/:coachId - Retrieves reviews for a specific coach (auth required)
router.get('/coach/:coachId', reviewController.getCoachReviews);

export default router;
