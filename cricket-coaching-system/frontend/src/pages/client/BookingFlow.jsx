import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { clientService } from '../../services/clientService';

export default function BookingFlow() {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: ''
  });

  const timeSlots = [
    '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00'
  ];

  useEffect(() => {
    fetchCoachDetails();
  }, [coachId]);

  const fetchCoachDetails = async () => {
    try {
      const data = await clientService.getCoachProfile(coachId);
      setCoach(data);
    } catch (error) {
      setError('Error fetching coach details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.time) {
      setError('Please select both a date and time.');
      return;
    }

    try {
      await clientService.createBooking({ coachId, ...bookingData });
      navigate('/dashboard');
    } catch (error) {
      setError('Booking failed. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!coach) return <div className="text-center py-8">Coach not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        {/* Coach Info */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-bold">{coach.name}</h2>
          <div className="flex gap-2 mt-2">
            {coach.expertise.map(exp => (
              <span 
                key={exp}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBooking} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({ 
                ...bookingData, 
                date: e.target.value 
              })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => (
                <Button
                  key={time}
                  type="button"
                  variant={bookingData.time === time ? 'primary' : 'secondary'}
                  onClick={() => setBookingData({ 
                    ...bookingData, 
                    time 
                  })}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </Card>
    </div>
  );
}
