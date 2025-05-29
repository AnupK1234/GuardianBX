
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Eye, Plus, FileText } from 'lucide-react';

const MyReports = () => {
  const [filterBy, setFilterBy] = useState('all');

  const userReports = [
    {
      id: 1,
      type: 'Hazard',
      title: 'Large pothole on E 161st St',
      location: 'E 161st St & River Ave',
      submittedDate: '2024-01-15',
      status: 'Under Review',
      urgency: 'Medium',
      views: 45,
      upvotes: 12,
      lastUpdate: '2 days ago'
    },
    {
      id: 2,
      type: 'Environmental',
      title: 'Broken streetlight reported',
      location: 'Grand Concourse & E 149th St',
      submittedDate: '2024-01-10',
      status: 'Resolved',
      urgency: 'Low',
      views: 28,
      upvotes: 15,
      lastUpdate: '1 week ago'
    },
    {
      id: 3,
      type: 'Crime',
      title: 'Vandalism in community center',
      location: 'Bronx Community Center',
      submittedDate: '2024-01-08',
      status: 'Pending',
      urgency: 'Medium',
      views: 63,
      upvotes: 8,
      lastUpdate: '3 days ago'
    },
    {
      id: 4,
      type: 'Hazard',
      title: 'Loose manhole cover',
      location: 'Webster Ave & E 170th St',
      submittedDate: '2024-01-05',
      status: 'Resolved',
      urgency: 'High',
      views: 89,
      upvotes: 24,
      lastUpdate: '2 weeks ago'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600 bg-green-50';
      case 'Under Review': return 'text-blue-600 bg-blue-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
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

  const filteredReports = userReports.filter(report => {
    if (filterBy === 'all') return true;
    return report.status.toLowerCase().replace(' ', '-') === filterBy;
  });

  const stats = {
    total: userReports.length,
    resolved: userReports.filter(r => r.status === 'Resolved').length,
    pending: userReports.filter(r => r.status === 'Pending').length,
    underReview: userReports.filter(r => r.status === 'Under Review').length
  };

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
              <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
            </div>
            <Link to="/report">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.underReview}</div>
              <div className="text-sm text-gray-600">Under Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Your submitted reports</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter by status:</span>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Report History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No reports found for the selected filter.</p>
                </div>
              ) : (
                filteredReports.map((report) => (
                  <Link key={report.id} to={`/report/${report.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {/* Header */}
                            <div className="flex items-center mb-2">
                              <Badge 
                                variant="secondary" 
                                className={`mr-2 ${getTypeColor(report.type)} text-white`}
                              >
                                {report.type}
                              </Badge>
                              <Badge 
                                variant="outline"
                                className={getStatusColor(report.status)}
                              >
                                {report.status}
                              </Badge>
                              <Badge 
                                variant="outline"
                                className={`ml-2 ${getUrgencyColor(report.urgency)}`}
                              >
                                {report.urgency}
                              </Badge>
                            </div>

                            {/* Title and location */}
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {report.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{report.location}</p>

                            {/* Metadata */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500 space-x-4">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Submitted {new Date(report.submittedDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {report.views} views
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                Last updated: {report.lastUpdate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyReports;
