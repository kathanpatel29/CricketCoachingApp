import express from 'express';
import { paymentController } from '../controllers/paymentController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Route to create a payment session
// POST /api/payments/create-session - Creates a new Stripe payment session (auth required)
router.post('/create-session', auth, paymentController.createSession);

// Route to handle Stripe webhook events
// POST /api/payments/webhook - Receives Stripe webhook events (no authentication required)
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

export default router;
