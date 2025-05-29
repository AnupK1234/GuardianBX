
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MapPin, Filter, Clock } from 'lucide-react';

const Map = () => {
  const [filters, setFilters] = useState({
    hazard: true,
    crime: true,
    environmental: true
  });

  const incidents = [
    {
      id: 1,
      type: 'Hazard',
      title: 'Large pothole on E 161st St',
      location: 'E 161st St & River Ave',
      time: '5 minutes ago',
      urgency: 'Medium',
      coordinates: { lat: 40.8275, lng: -73.9266 }
    },
    {
      id: 2,
      type: 'Crime',
      title: 'Suspicious activity reported',
      location: 'Near Yankee Stadium',
      time: '12 minutes ago',
      urgency: 'High',
      coordinates: { lat: 40.8296, lng: -73.9262 }
    },
    {
      id: 3,
      type: 'Environmental',
      title: 'Broken streetlight',
      location: 'Grand Concourse & E 149th St',
      time: '1 hour ago',
      urgency: 'Low',
      coordinates: { lat: 40.8176, lng: -73.9245 }
    },
    {
      id: 4,
      type: 'Hazard',
      title: 'Fallen tree blocking sidewalk',
      location: 'Bronx Park South',
      time: '2 hours ago',
      urgency: 'High',
      coordinates: { lat: 40.8518, lng: -73.8777 }
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Crime': return 'bg-red-500';
      case 'Hazard': return 'bg-orange-500';
      case 'Environmental': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredIncidents = incidents.filter(incident => 
    filters[incident.type.toLowerCase() as keyof typeof filters]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/home" className="text-gray-600 hover:text-blue-600">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Live Safety Map</h1>
            </div>
            <Link to="/report">
              <Button className="bg-red-600 hover:bg-red-700">
                Report Incident
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <Filter className="h-4 w-4 mr-2" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(filters).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={key} className="capitalize">
                        {key}
                      </Label>
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => 
                          setFilters(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-3">Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">Crime</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <span className="text-sm">Hazard</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Environmental</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Incidents */}
          <div className="lg:col-span-3">
            {/* Mock Map Area */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">Interactive Map View</p>
                      <p className="text-sm">The Bronx, New York</p>
                    </div>
                  </div>
                  
                  {/* Mock incident pins */}
                  {filteredIncidents.map((incident, index) => (
                    <Link 
                      key={incident.id}
                      to={`/report/${incident.id}`}
                      className={`absolute w-4 h-4 rounded-full ${getTypeColor(incident.type)} cursor-pointer hover:scale-125 transition-transform shadow-lg`}
                      style={{
                        left: `${20 + index * 20}%`,
                        top: `${30 + index * 15}%`
                      }}
                      title={incident.title}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Incident List */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Incidents ({filteredIncidents.length})</h3>
              <div className="space-y-3">
                {filteredIncidents.map((incident) => (
                  <Link key={incident.id} to={`/report/${incident.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Badge 
                                variant="secondary" 
                                className={`mr-2 ${getTypeColor(incident.type)} text-white`}
                              >
                                {incident.type}
                              </Badge>
                              <Badge 
                                variant="outline"
                                className={getUrgencyColor(incident.urgency)}
                              >
                                {incident.urgency}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">{incident.title}</h4>
                            <p className="text-sm text-gray-600 mb-1">{incident.location}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {incident.time}
                            </div>
                          </div>
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
