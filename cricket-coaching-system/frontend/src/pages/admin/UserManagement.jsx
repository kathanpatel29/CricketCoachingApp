import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { clientService } from '../../services/clientService'; // Import the service functions

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' or 'coaches'

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(); // Use the service function to fetch users
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteUser(userId); // Use the service function to delete the user
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    activeTab === 'clients' ? user.role === 'client' : user.role === 'coach'
  );

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="flex gap-4">
        <Button
          variant={activeTab === 'clients' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('clients')}
        >
          Clients
        </Button>
        <Button
          variant={activeTab === 'coaches' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('coaches')}
        >
          Coaches
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                {activeTab === 'coaches' && <th className="p-4">Expertise</th>}
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  {activeTab === 'coaches' && (
                    <td className="p-4">
                      {user.expertise?.join(', ') || 'None'}
                    </td>
                  )}
                  <td className="p-4">
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
