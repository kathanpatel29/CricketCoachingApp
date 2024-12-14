import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { clientService } from '../../services/clientService';
import toast from 'react-hot-toast';

export default function CoachList() {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  const expertiseOptions = ['Batting', 'Bowling', 'Fielding', 'Wicket Keeping'];

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const data = await clientService.getCoaches();
      setCoaches(data);
    } catch (error) {
      toast.error('Failed to load coaches');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading coaches...</div>;
  }

  const filteredCoaches = selectedExpertise === 'all'
    ? coaches
    : coaches.filter(coach => coach.expertise.includes(selectedExpertise));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Find a Coach</h1>

      {/* Filter Section */}
      <div className="flex gap-2 overflow-x-auto py-2">
        <Button
          variant={selectedExpertise === 'all' ? 'primary' : 'secondary'}
          onClick={() => setSelectedExpertise('all')}
        >
          All
        </Button>
        {expertiseOptions.map(expertise => (
          <Button
            key={expertise}
            variant={selectedExpertise === expertise ? 'primary' : 'secondary'}
            onClick={() => setSelectedExpertise(expertise)}
          >
            {expertise}
          </Button>
        ))}
      </div>

      {/* Coaches Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map(coach => (
          <Card key={coach._id}>
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-semibold">{coach.name}</h3>
              <div className="flex flex-wrap gap-2">
                {coach.expertise.map(exp => (
                  <span 
                    key={exp}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {exp}
                  </span>
                ))}
              </div>
              <Button
                className="w-full"
                onClick={() => navigate(`/book/${coach._id}`)}
              >
                Book Session
              </Button>
            </div>
          </Card>
        ))}
        {filteredCoaches.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No coaches found for selected expertise
          </div>
        )}
      </div>
    </div>
  );
}
