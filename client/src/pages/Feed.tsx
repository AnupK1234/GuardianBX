
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, MessageCircle, ThumbsUp, TrendingUp } from 'lucide-react';

const Feed = () => {
  const [sortBy, setSortBy] = useState('latest');

  const reports = [
    {
      id: 1,
      type: 'Hazard',
      title: 'Large pothole on E 161st St',
      location: 'E 161st St & River Ave',
      description: 'Significant pothole causing vehicle damage. Needs immediate attention.',
      time: '5 minutes ago',
      urgency: 'Medium',
      upvotes: 12,
      comments: 3,
      status: 'Under Review'
    },
    {
      id: 2,
      type: 'Crime',
      title: 'Suspicious activity near Yankee Stadium',
      location: 'Near Yankee Stadium',
      description: 'Multiple residents reported suspicious individuals loitering in the area after dark.',
      time: '12 minutes ago',
      urgency: 'High',
      upvotes: 8,
      comments: 5,
      status: 'Under Review'
    },
    {
      id: 3,
      type: 'Environmental',
      title: 'Broken streetlight on Grand Concourse',
      location: 'Grand Concourse & E 149th St',
      description: 'Streetlight has been out for several days, creating safety concerns for pedestrians.',
      time: '1 hour ago',
      urgency: 'Low',
      upvotes: 15,
      comments: 2,
      status: 'Pending'
    },
    {
      id: 4,
      type: 'Hazard',
      title: 'Fallen tree blocking sidewalk',
      location: 'Bronx Park South',
      description: 'Large tree fell during recent storm, completely blocking pedestrian access.',
      time: '2 hours ago',
      urgency: 'High',
      upvotes: 24,
      comments: 8,
      status: 'Resolved'
    },
    {
      id: 5,
      type: 'Crime',
      title: 'Break-in attempt reported',
      location: 'Morris Heights',
      description: 'Resident reported attempted break-in. Police have been notified.',
      time: '3 hours ago',
      urgency: 'High',
      upvotes: 6,
      comments: 1,
      status: 'Under Review'
    },
    {
      id: 6,
      type: 'Environmental',
      title: 'Illegal dumping in vacant lot',
      location: 'E 138th St',
      description: 'Large amount of debris and trash dumped in community lot. Health hazard.',
      time: '4 hours ago',
      urgency: 'Medium',
      upvotes: 18,
      comments: 4,
      status: 'Pending'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600 bg-green-50';
      case 'Under Review': return 'text-blue-600 bg-blue-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const sortedReports = [...reports].sort((a, b) => {
    if (sortBy === 'most-urgent') {
      const urgencyOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return urgencyOrder[b.urgency as keyof typeof urgencyOrder] - urgencyOrder[a.urgency as keyof typeof urgencyOrder];
    }
    return 0; // Default to original order for 'latest'
  });

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
              <h1 className="text-2xl font-bold text-gray-900">Community Feed</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/report">
                <Button className="bg-red-600 hover:bg-red-700">
                  Report Incident
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Latest Community Reports</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="most-urgent">Most Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reports Feed */}
        <div className="space-y-4">
          {sortedReports.map((report) => (
            <Link key={report.id} to={`/report/${report.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header badges */}
                      <div className="flex items-center mb-3">
                        <Badge 
                          variant="secondary" 
                          className={`mr-2 ${getTypeColor(report.type)} text-white`}
                        >
                          {report.type}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={getUrgencyColor(report.urgency)}
                        >
                          {report.urgency}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={`ml-2 ${getStatusColor(report.status)}`}
                        >
                          {report.status}
                        </Badge>
                      </div>

                      {/* Title and location */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{report.location}</p>
                      
                      {/* Description */}
                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {report.description}
                      </p>

                      {/* Footer info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {report.time}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {report.upvotes}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {report.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="w-full max-w-md">
            Load More Reports
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Feed;
