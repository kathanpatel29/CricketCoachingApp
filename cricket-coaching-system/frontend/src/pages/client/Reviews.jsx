import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { reviewService } from '../../services/reviewService';
import toast from 'react-hot-toast';

export default function Reviews() {
  const { coachId } = useParams();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await reviewService.submitReview(coachId, review);
      setReview({ rating: 5, comment: '' });
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <h2 className="text-xl font-bold">Leave a Review</h2>
        
        <div>
          <label className="block mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setReview({ ...review, rating: num })}
                className={`text-2xl ${
                  num <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">Comment</label>
          <textarea
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            className="w-full border rounded-md p-2"
            rows="4"
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Submit Review'}
        </Button>
      </form>
    </Card>
  );
}
