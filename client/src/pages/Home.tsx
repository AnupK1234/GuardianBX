import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, TrendingUp, Clock, Shield, LogOut, Trophy, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmergencyOverlay from '@/components/EmergencyOverlay';
import HistoricalTrends from '@/components/HistoricalTrends';
import CommunityLeaderboard from '@/components/CommunityLeaderboard';

const Home = () => {
  const navigate = useNavigate();
  const [showEmergencyOverlay, setShowEmergencyOverlay] = useState(false);

  const recentAlerts = [
    {
      id: 1,
      type: 'Hazard',
      title: 'Pothole reported on E 161st St',
      time: '5m ago',
      urgency: 'Medium',
      reporter: 'Maria Rodriguez',
      verified: true
    },
    {
      id: 2,
      type: 'Crime',
      title: 'Suspicious activity near Yankee Stadium',
      time: '12m ago',
      urgency: 'High',
      reporter: 'James Chen',
      verified: true
    },
    {
      id: 3,
      type: 'Environmental',
      title: 'Broken streetlight on Grand Concourse',
      time: '1h ago',
      urgency: 'Low',
      reporter: 'Anonymous',
      verified: false
    }
  ];

  const handleLogout = () => {
    // Mock logout API call
    console.log('Logging out user...');
    // Simulate API delay
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Crime': return 'text-red-700 bg-red-100';
      case 'Hazard': return 'text-orange-700 bg-orange-100';
      case 'Environmental': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Safety Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEmergencyOverlay(true)}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                <Shield className="h-4 w-4 mr-2" />
                Emergency
              </Button>
              <nav className="flex space-x-4">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/report">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white">
                <CardContent className="flex items-center p-6">
                  <AlertTriangle className="h-8 w-8 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Report Incident</h3>
                    <p className="text-red-100">Submit a safety concern to help your community</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/map">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="flex items-center p-6">
                  <MapPin className="h-8 w-8 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">View Live Map</h3>
                    <p className="text-blue-100">See real-time incidents in your area</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="leaderboard">Community</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Alerts */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <Card key={alert.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${getTypeColor(alert.type)}`}>
                                {alert.type}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(alert.urgency)}`}>
                                {alert.urgency}
                              </span>
                              {alert.verified && (
                                <Shield className="h-4 w-4 ml-2 text-blue-600" />
                              )}
                            </div>
                            <h3 className="font-medium text-gray-900 mb-1">{alert.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {alert.time}
                              </div>
                              <span>by {alert.reporter}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Stats Widget */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Impact</h2>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">10</div>
                        <div className="text-sm text-gray-600">Incidents Resolved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">24</div>
                        <div className="text-sm text-gray-600">New Reports</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">156</div>
                        <div className="text-sm text-gray-600">Community Votes</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <HistoricalTrends />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <CommunityLeaderboard />
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Detailed Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-sm text-gray-600">Total Reports This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-gray-600">Resolution Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1,234</div>
                    <div className="text-sm text-gray-600">Active Community Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">4.2</div>
                    <div className="text-sm text-gray-600">Average Response Time (hrs)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <EmergencyOverlay 
        isOpen={showEmergencyOverlay} 
        onClose={() => setShowEmergencyOverlay(false)} 
      />
    </div>
  );
};

export default Home;
