
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Shield } from 'lucide-react';

interface HeaderProps {
  title: string;
  showEmergencyButton?: boolean;
  onEmergencyClick?: () => void;
}

const Header = ({ title, showEmergencyButton = false, onEmergencyClick }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout API call
    console.log('Logging out user...');
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center space-x-4">
            {showEmergencyButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEmergencyClick}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                <Shield className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            )}
            <nav className="flex space-x-4">
              <Link to="/home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/map" className="text-gray-600 hover:text-blue-600 transition-colors">Map</Link>
              <Link to="/feed" className="text-gray-600 hover:text-blue-600 transition-colors">Feed</Link>
              <Link to="/my-reports" className="text-gray-600 hover:text-blue-600 transition-colors">My Reports</Link>
            </nav>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
