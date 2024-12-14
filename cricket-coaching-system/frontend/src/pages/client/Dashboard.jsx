import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { clientService } from '../../services/clientService';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  const fetchAppointmentsData = async () => {
    try {
      const data = await clientService.getBookings();
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await clientService.cancelBooking(appointmentId);
      setAppointments(prevAppointments =>
        prevAppointments.filter(appointment => appointment._id !== appointmentId)
      );
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }


  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <Button onClick={() => navigate('/coaches')}>
          Book New Session
        </Button>
      </div>

      {/* Appointments Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Appointments</h2>

        {appointments.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No appointments scheduled</p>
              <Button 
                variant="secondary"
                onClick={() => navigate('/coaches')}
              >
                Find a Coach
              </Button>
            </div>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment._id} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Session with {appointment.coach?.name}</h3>
                <p className="text-gray-600">
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </p>
                <span 
                  className={`inline-block px-2 py-1 rounded-full text-sm
                  ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}
                >
                  {appointment.status}
                </span>
              </div>
              {appointment.status === 'pending' && (
                <Button 
                  variant="danger"
                  onClick={() => handleCancel(appointment._id)}
                >
                  Cancel
                </Button>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
