
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Star, Shield, Award, Gift } from 'lucide-react';

const CommunityLeaderboard = () => {
  const topContributors = [
    {
      rank: 1,
      name: 'Maria Rodriguez',
      points: 1250,
      verified: true,
      badges: ['Top Reporter', 'Verified Neighbor'],
      reportsCount: 45,
      accuracy: 98
    },
    {
      rank: 2,
      name: 'James Chen',
      points: 980,
      verified: true,
      badges: ['Safety Advocate', 'Quick Responder'],
      reportsCount: 32,
      accuracy: 95
    },
    {
      rank: 3,
      name: 'Aisha Johnson',
      points: 875,
      verified: false,
      badges: ['Community Helper'],
      reportsCount: 28,
      accuracy: 92
    },
    {
      rank: 4,
      name: 'David Kim',
      points: 720,
      verified: true,
      badges: ['Night Watch', 'Verified Neighbor'],
      reportsCount: 24,
      accuracy: 89
    },
    {
      rank: 5,
      name: 'Sarah Williams',
      points: 650,
      verified: false,
      badges: ['New Contributor'],
      reportsCount: 18,
      accuracy: 94
    }
  ];

  const rewards = [
    { title: 'Bronx Coffee Co.', discount: '15% off', requirement: '500+ points' },
    { title: 'Local Deli', discount: 'Free sandwich', requirement: '1000+ points' },
    { title: 'Community Center', discount: 'Priority classes', requirement: 'Top 10 monthly' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Award className="h-5 w-5 text-gray-400" />;
      case 3: return <Star className="h-5 w-5 text-orange-500" />;
      default: return <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">{rank}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Community Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContributors.map((contributor) => (
              <div key={contributor.rank} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center mr-4">
                  {getRankIcon(contributor.rank)}
                </div>
                
                <Avatar className="mr-4">
                  <AvatarFallback>
                    {contributor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-gray-900">{contributor.name}</span>
                    {contributor.verified && (
                      <Shield className="h-4 w-4 ml-2 text-blue-600" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {contributor.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span>{contributor.reportsCount} reports</span>
                    <span>{contributor.accuracy}% accuracy</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{contributor.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2 text-green-500" />
            Community Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map((reward, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-2">{reward.title}</h4>
                <div className="text-green-600 font-semibold mb-2">{reward.discount}</div>
                <div className="text-xs text-gray-600">{reward.requirement}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              Earn points by submitting verified reports and helping your community stay safe!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityLeaderboard;
