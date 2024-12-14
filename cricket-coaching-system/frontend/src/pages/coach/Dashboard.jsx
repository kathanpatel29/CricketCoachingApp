import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import { coachService } from '../../services/coachService';
import { appointmentService } from '../../services/appointmentService';

export default function CoachDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState({ date: '', time: '', duration: 60 });
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [appointmentsData, profileData] = await Promise.all([
        appointmentService.fetchAppointments(),
        coachService.fetchProfile()
      ]);
      setAppointments(appointmentsData);
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      toast.success('Appointment status updated');
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update appointment status');
    }
  };

  const createAppointmentSlot = async (e) => {
    e.preventDefault();
    try {
      await appointmentService.createAppointment(newSlot);
      toast.success('New appointment slot created');
      fetchDashboardData();
      setNewSlot({ date: '', time: '', duration: 60 });
    } catch (error) {
      console.error('Error creating appointment slot:', error);
      toast.error('Failed to create appointment slot');
    }
  };

  const handleProfileClick = () => {
    navigate('/coach/profile');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() === today.getTime();
  });

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() > today.getTime();
  });

  return (
    <div className="space-y-8">
      {/* Coach Profile */}
      {profile && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Profile</h2>
            <Button onClick={handleProfileClick}>Edit Profile</Button>
          </div>
          <Card>
            <div className="p-4">
              <h3 className="font-medium">{profile.name}</h3>
              <p className="text-gray-600">{profile.specialization}</p>
              <p className="text-gray-600">Experience: {profile.experience} years</p>
            </div>
          </Card>
        </section>
      )}

      {/* Create New Appointment Slot */}
      <section>
        <h2 className="text-xl font-bold mb-4">Create New Appointment Slot</h2>
        <Card>
          <form onSubmit={createAppointmentSlot} className="p-4 space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                value={newSlot.time}
                onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                id="duration"
                value={newSlot.duration}
                onChange={(e) => setNewSlot({...newSlot, duration: parseInt(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Create Slot
            </button>
          </form>
        </Card>
      </section>

      {/* Today's Appointments */}
      <section>
        <h2 className="text-xl font-bold mb-4">Today's Sessions</h2>
        {todayAppointments.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 py-4">
              No sessions scheduled for today
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {todayAppointments.map(appointment => (
              <Card key={appointment._id}>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-medium">
                      {appointment.client?.name || 'Available Slot'}
                    </h3>
                    <p className="text-gray-600">
                      Time: {appointment.time}
                    </p>
                  </div>
                  <select
                    value={appointment.status}
                    onChange={(e) => updateStatus(appointment._id, e.target.value)}
                    className="border rounded p-2"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Appointments */}
      <section>
        <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
        {upcomingAppointments.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 py-4">
              No upcoming sessions scheduled
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <Card key={appointment._id}>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-medium">
                      {appointment.client?.name || 'Available Slot'}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(appointment.date).toLocaleDateString()} 
                      at {appointment.time}
                    </p>
                  </div>
                  <select
                    value={appointment.status}
                    onChange={(e) => updateStatus(appointment._id, e.target.value)}
                    className="border rounded p-2"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}