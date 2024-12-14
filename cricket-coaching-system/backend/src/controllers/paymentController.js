import Stripe from 'stripe';
import Appointment from '../models/Appointment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentController = {
  async createSession(req, res) {
    try {
      const { appointmentId } = req.body;
      const appointment = await Appointment.findById(appointmentId)
        .populate('coach', 'name hourlyRate');

      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: `Coaching Session with ${appointment.coach.name}` },
            unit_amount: appointment.coach.hourlyRate * 100, // Convert to cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
        metadata: { appointmentId },
      });

      res.json({ sessionId: session.id });
    } catch (error) {
      console.error('Payment session error:', error);
      res.status(500).json({ message: 'Failed to create payment session' });
    }
  },

  async handleWebhook(req, res) {
    const sig = req.headers['stripe-signature'];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === 'checkout.session.completed') {
        const { appointmentId } = event.data.object.metadata;
        await Appointment.findByIdAndUpdate(appointmentId, {
          status: 'confirmed',
          paymentStatus: 'paid',
        });
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  },
};
