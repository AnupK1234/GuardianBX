
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar, MapPin } from 'lucide-react';

const HistoricalTrends = () => {
  const trends = [
    {
      title: 'Theft Reports',
      trend: 'up',
      percentage: '+15%',
      timeframe: 'vs last month',
      insight: 'Peak activity on Fridays near subway stations',
      hotspots: ['149th St-Grand Concourse', 'Yankee Stadium', 'Fordham Rd']
    },
    {
      title: 'Hazard Reports',
      trend: 'down',
      percentage: '-8%',
      timeframe: 'vs last month',
      insight: 'Improvement in pothole repairs',
      hotspots: ['E 161st St', 'Grand Concourse', 'Fordham Rd']
    },
    {
      title: 'Environmental Issues',
      trend: 'up',
      percentage: '+22%',
      timeframe: 'vs last month',
      insight: 'Increased after recent storms',
      hotspots: ['Bronx River', 'Crotona Park', 'Van Cortlandt Park']
    }
  ];

  const weeklyPattern = [
    { day: 'Mon', incidents: 12 },
    { day: 'Tue', incidents: 8 },
    { day: 'Wed', incidents: 15 },
    { day: 'Thu', incidents: 18 },
    { day: 'Fri', incidents: 25 },
    { day: 'Sat', incidents: 20 },
    { day: 'Sun', incidents: 10 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Safety Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trends.map((trend, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{trend.title}</h4>
                  <div className={`flex items-center ${trend.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                    {trend.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="ml-1 font-semibold">{trend.percentage}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{trend.timeframe}</p>
                <p className="text-sm text-gray-700 mb-3">{trend.insight}</p>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Top Hotspots:</p>
                  <div className="space-y-1">
                    {trend.hotspots.map((hotspot, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {hotspot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Incident Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 mb-4">
            {weeklyPattern.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-blue-500 rounded-t-sm mb-2 min-w-[20px]"
                  style={{ height: `${(day.incidents / 25) * 100}%` }}
                />
                <span className="text-xs text-gray-600">{day.day}</span>
                <span className="text-xs font-semibold text-gray-800">{day.incidents}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Peak incidents occur on weekends, especially Fridays
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalTrends;
