
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, MapPin, Users, ArrowUp, Eye, MessageCircle, Phone, Star, TrendingUp } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Report Hazards',
      description: 'Quickly report safety concerns in your neighborhood'
    },
    {
      icon: MapPin,
      title: 'Real-Time Alerts',
      description: 'View live incident reports on an interactive map'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join neighbors working together for a safer Bronx'
    }
  ];

  const stats = [
    { number: '500+', label: 'Reports Submitted' },
    { number: '85%', label: 'Issues Resolved' },
    { number: '2,000+', label: 'Community Members' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">GuardianBX</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 2,000+ Bronx residents
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Making The Bronx
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                  Safer Together
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Join your neighbors in creating a safer community. Report incidents, stay informed about local safety concerns, and work together to make The Bronx a better place for everyone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Start Reporting
                    <ArrowUp className="ml-2 h-5 w-5 rotate-45" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
                    <MapPin className="mr-2 h-5 w-5" />
                    View Safety Map
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-green-500" />
                  Secure & Anonymous
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-blue-500" />
                  24/7 Emergency Access
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-purple-500" />
                  Real-time Updates
                </div>
              </div>
            </div>

            {/* Right side - Visual elements */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Main hero image placeholder with gradient overlay */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                  alt="Bronx Community" 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating cards */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Live Alert System</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 z-20">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-bounce" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Active Users</div>
                        <div className="text-lg font-bold text-gray-900">2,000+</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification popup */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-xs animate-pulse">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">New Report</div>
                        <div className="text-xs text-gray-600 mt-1">Pothole reported on E 161st St</div>
                        <div className="text-xs text-blue-600 mt-2">2 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-60 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple tools to help you contribute to community safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Community Impact
            </h2>
            <p className="text-xl text-gray-600">
              Together, we're making a real difference in The Bronx
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Preview */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Recent Community Activity
            </h2>
            <p className="text-xl text-gray-600">
              See how your neighbors are keeping The Bronx safe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    <span className="font-medium">Hazard Reported</span>
                  </div>
                  <span className="text-sm text-gray-500">5m ago</span>
                </div>
                <h3 className="font-semibold mb-2">Pothole on E 161st Street</h3>
                <p className="text-gray-600 text-sm mb-4">Large pothole causing vehicle damage near Yankee Stadium...</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    12 upvotes
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    3 comments
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium">Issue Resolved</span>
                  </div>
                  <span className="text-sm text-gray-500">1h ago</span>
                </div>
                <h3 className="font-semibold mb-2">Broken streetlight fixed</h3>
                <p className="text-gray-600 text-sm mb-4">Community reported streetlight has been repaired by city maintenance...</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    24 upvotes
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    89 views
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/auth">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-semibold">GuardianBX</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering communities to work together for a safer Bronx. 
                Report incidents, stay informed, and make a difference.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/auth" className="block text-gray-300 hover:text-white transition-colors">
                  Get Started
                </Link>
                <Link to="/auth" className="block text-gray-300 hover:text-white transition-colors">
                  Safety Map
                </Link>
                <Link to="/auth" className="block text-gray-300 hover:text-white transition-colors">
                  Community Feed
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  About
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GuardianBX. Made with ❤️ for The Bronx community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
