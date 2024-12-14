import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Card>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Cricket Coach
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find and book sessions with professional cricket coaches
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Expert Coaches</h3>
              <p className="text-gray-600">
                Learn from experienced cricket professionals
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book sessions at your convenience
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">All Skill Levels</h3>
              <p className="text-gray-600">
                From beginners to advanced players
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}