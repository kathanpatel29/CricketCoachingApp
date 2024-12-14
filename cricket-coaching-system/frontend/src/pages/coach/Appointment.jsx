import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { appointmentService } from '../../services/appointmentService';

export default function CoachAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    duration: 60
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.fetchAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };

  const createAppointment = async (e) => {
    e.preventDefault();
    try {
      await appointmentService.createAppointment(newAppointment);
      toast.success('Appointment slot created');
      fetchAppointments();
      setNewAppointment({ date: '', time: '', duration: 60 });
    } catch (error) {
      toast.error('Failed to create appointment slot');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await appointmentService.updateAppointmentStatus(id, status);
      fetchAppointments();
      toast.success('Status updated');
    } catch (error) {
      toast.error('Update failed');
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      {/* Create new appointment form */}
      <form onSubmit={createAppointment} className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Create New Appointment Slot</h2>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-1">Date</label>
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-1">Time</label>
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={newAppointment.duration}
              onChange={(e) => setNewAppointment({...newAppointment, duration: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Appointment Slot
        </button>
      </form>

      {/* List of appointments */}
      <div className="space-y-4">
        {appointments.map(appointment => (
          <div key={appointment._id} className="border rounded p-4">
            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Time: {appointment.time}</p>
            <p>Status: {appointment.status}</p>
            <p>Client: {appointment.client ? appointment.client.name : 'Not booked'}</p>
            <select
              value={appointment.status}
              onChange={(e) => updateStatus(appointment._id, e.target.value)}
              className="mt-2 border rounded p-1"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
        {appointments.length === 0 && (
          <p className="text-center text-gray-500">No appointments yet</p>
        )}
      </div>
    </div>
  );
}
