import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import { adminService } from '../../services/adminService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalCoaches: 0,
    totalAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatsData();
  }, []);

  const fetchStatsData = async () => {
    try {
      const data = await fetchStats(); // Use the fetchStats function from adminService.js
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-gray-600">Total Clients</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalClients}</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-gray-600">Total Coaches</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalCoaches}</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-gray-600">Total Appointments</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalAppointments}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
