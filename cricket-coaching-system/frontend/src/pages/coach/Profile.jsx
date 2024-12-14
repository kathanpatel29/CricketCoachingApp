import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import { coachService } from '../../services/coachService';

export default function CoachProfile() {
  const [profile, setProfile] = useState({
    name: '',
    expertise: [],
    hourlyRate: ''
  });

  const expertiseOptions = ['Batting', 'Bowling', 'Fielding', 'Wicket Keeping'];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await coachService.getProfile();
      setProfile(data);
    } catch (error) {
      toast.error('Failed to fetch profile');
    }
  };

  const handleExpertiseChange = (skill) => {
    setProfile(prev => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter(e => e !== skill)
        : [...prev.expertise, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await coachService.updateProfile(profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <h2 className="text-xl font-bold mb-4">Update Profile</h2>
          
          <div>
            <label className="block mb-2">Hourly Rate ($)</label>
            <input
              type="number"
              value={profile.hourlyRate}
              onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-2">Expertise</label>
            {expertiseOptions.map(skill => (
              <label key={skill} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={profile.expertise.includes(skill)}
                  onChange={() => handleExpertiseChange(skill)}
                  className="mr-2"
                />
                {skill}
              </label>
            ))}
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </Card>
    </div>
  );
}