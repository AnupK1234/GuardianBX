
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Lightbulb, Shield, MapPin } from 'lucide-react';

interface MentorTip {
  icon: React.ElementType;
  title: string;
  content: string;
  category: string;
}

const AIMentor: React.FC = () => {
  const [activeChat, setActiveChat] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'mentor'}>>([]);

  const mentorTips: MentorTip[] = [
    {
      icon: Shield,
      title: "Stay Alert at Night",
      content: "The Bronx sees 23% more incidents after 8PM. Consider traveling in groups or using well-lit main streets.",
      category: "Safety"
    },
    {
      icon: MapPin,
      title: "High-Traffic Areas",
      content: "Subway stations and bus stops show increased activity. Report any suspicious behavior to help the community.",
      category: "Location"
    },
    {
      icon: Lightbulb,
      title: "Community Tip",
      content: "Users who verify their reports with photos get 40% faster response times from local authorities.",
      category: "Engagement"
    }
  ];

  const mentorResponses = [
    "Based on recent data, I recommend avoiding E 161st Street after 9PM due to increased incident reports.",
    "Great question! The safest route to your destination would be via the Grand Concourse - it has better lighting and more foot traffic.",
    "I notice you're reporting from the South Bronx area. Consider joining the local neighborhood watch - they meet every Tuesday at 7PM.",
    "For your safety, I suggest taking the express bus on this route instead of walking. The 6 train also has increased security presence.",
    "The community has reported this as a safe area during daytime hours. Evening hours see a 15% increase in incidents."
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setChatMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Simulate mentor response
    setTimeout(() => {
      const response = mentorResponses[Math.floor(Math.random() * mentorResponses.length)];
      setChatMessages(prev => [...prev, { text: response, sender: 'mentor' }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Bot className="h-5 w-5 mr-2 text-purple-600" />
          AI Safety Mentor
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!activeChat ? (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm mb-4">
              Get personalized safety insights and tips based on community data and your location.
            </p>
            
            <div className="space-y-3">
              {mentorTips.map((tip, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <tip.icon className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{tip.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{tip.content}</p>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-2">
                        {tip.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setActiveChat(true)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Bot className="h-4 w-4 mr-2" />
              Chat with AI Mentor
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 max-h-48 overflow-y-auto border">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-4">
                  <Bot className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  Ask me about safety routes, local incidents, or community tips!
                </div>
              ) : (
                <div className="space-y-2">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`rounded-lg p-2 text-sm max-w-[80%] ${
                        message.sender === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about safety in your area..."
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setActiveChat(false)}
              className="w-full text-sm"
            >
              Back to Tips
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIMentor;
