import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    expertise: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const expertiseOptions = ['Batting', 'Bowling', 'Fielding', 'Wicket Keeping'];
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isCoach = user?.role === 'coach';

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/profile`,
        profile,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>

        <Input
          label="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          required
        />

        <Input
          label="Email"
          type="email"
          value={profile.email}
          disabled
        />

        {isCoach && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expertise
            </label>
            <div className="grid grid-cols-2 gap-2">
              {expertiseOptions.map(exp => (
                <label key={exp} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={profile.expertise.includes(exp)}
                    onChange={(e) => {
                      const expertise = e.target.checked
                        ? [...profile.expertise, exp]
                        : profile.expertise.filter(x => x !== exp);
                      setProfile({ ...profile, expertise });
                    }}
                    className="mr-2"
                  />
                  {exp}
                </label>
              ))}
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Card>
  );
}
