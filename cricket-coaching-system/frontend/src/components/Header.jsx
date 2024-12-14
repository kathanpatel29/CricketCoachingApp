import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import Button from './ui/Button';

export default function Header() {
  const navigate = useNavigate();
  const user = storage.get('user');

  const handleLogout = () => {
    storage.clear();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Cricket Coach
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}