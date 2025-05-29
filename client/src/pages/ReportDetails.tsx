
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, MessageCircle, MapPin, Clock, User, Image, Shield } from 'lucide-react';

const ReportDetails = () => {
  const { id } = useParams();
  const [upvoted, setUpvoted] = useState(false);
  const [comment, setComment] = useState('');
  
  // Mock data - in real app would fetch based on ID
  const report = {
    id: id || '1',
    type: 'Hazard',
    title: 'Large pothole on E 161st St',
    description: 'There is a significant pothole on E 161st Street near River Avenue that poses a danger to vehicles and pedestrians. The hole is approximately 3 feet wide and 6 inches deep. Multiple cars have been damaged, and it needs immediate attention.',
    location: 'E 161st St & River Ave, Bronx, NY',
    timestamp: '2 hours ago',
    status: 'Under Review',
    urgency: 'Medium',
    upvotes: upvoted ? 13 : 12,
    hasImage: true,
    reporter: 'Anonymous'
  };

  const comments = [
    {
      id: 1,
      author: 'Maria Rodriguez',
      content: 'I drive this route daily for work. This pothole damaged my tire last week. Thank you for reporting!',
      time: '1 hour ago',
      verified: true,
      badges: ['Neighborhood Watch', 'Top Reporter']
    },
    {
      id: 2,
      author: 'Officer James Wilson',
      content: 'NYPD has been notified. We\'ve forwarded this to the Department of Transportation for immediate attention.',
      time: '45 minutes ago',
      verified: true,
      badges: ['NYPD Officer', 'Verified Responder']
    },
    {
      id: 3,
      author: 'Community Member',
      content: 'Confirmed - I saw this yesterday. It\'s definitely getting worse with the recent rain.',
      time: '30 minutes ago',
      verified: false,
      badges: []
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

  const handleUpvote = () => {
    setUpvoted(!upvoted);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Would submit comment to backend
      setComment('');
      alert('Comment added successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/map" className="text-gray-600 hover:text-blue-600">
                ← Back to Map
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Report Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
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
                        {report.urgency} Priority
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`ml-2 ${getStatusColor(report.status)}`}
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{report.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {report.timestamp}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {report.reporter}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </h4>
                    <p className="text-gray-700">{report.location}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{report.description}</p>
                  </div>

                  {/* Image */}
                  {report.hasImage && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Image className="h-4 w-4 mr-2" />
                        Photo Evidence
                      </h4>
                      <div className="bg-gray-100 rounded-lg p-8 text-center">
                        <Image className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Image would be displayed here</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Community Engagement */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant={upvoted ? "default" : "outline"}
                    className="w-full"
                    onClick={handleUpvote}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {upvoted ? 'Upvoted' : 'Upvote'} ({report.upvotes})
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    <p className="flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {comments.length} Comments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Share Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="w-full">
                    Report Similar Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comments Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Community Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit}>
                <div className="space-y-3">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment to help your community..."
                    className="min-h-[80px]"
                  />
                  <Button type="submit" disabled={!comment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4 pt-4 border-t">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        {comment.verified && (
                          <Shield className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="text-sm text-gray-500">{comment.time}</span>
                      </div>
                      {comment.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {comment.badges.map((badge, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className={`text-xs ${badge.includes('Officer') || badge.includes('Verified Responder') ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportDetails;
