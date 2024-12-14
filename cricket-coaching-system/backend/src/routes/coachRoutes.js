import express from 'express';
import { coachController } from '../controllers/coachController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Route to get all coaches
// GET /api/coaches - Fetches all the coaches
router.get('/', coachController.getAllCoaches);

// Route to get a coach by ID
// GET /api/coaches/:id - Fetches a specific coach by their ID
router.get('/:id', coachController.getCoachById);

// Route to update coach expertise
// PUT /api/coaches/expertise - Updates the expertise of the coach (auth required)
router.put('/expertise', auth, coachController.updateExpertise);

// Route to get coach profile
// GET /api/coaches/profile - Fetches the authenticated coach's profile (auth required)
router.get('/profile', auth, coachController.getCoachProfile);

// Route to update coach profile
// PUT /api/coaches/profile - Updates the authenticated coach's profile (auth required)
router.put('/profile', auth, coachController.updateCoachProfile);

export default router;
