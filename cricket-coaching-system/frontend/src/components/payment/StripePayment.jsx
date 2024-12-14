import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function StripePayment({ appointmentId, amount }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create payment session
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ appointmentId, amount })
      });

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error('Failed to create payment session');
      }

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount to Pay:</span>
          <span className="text-xl font-bold">${amount}</span>
        </div>

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Processing...' : 'Pay Securely'}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          Powered by Stripe • Secure Payment
        </p>
      </div>
    </Card>
  );
}