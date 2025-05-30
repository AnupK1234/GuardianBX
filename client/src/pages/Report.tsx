import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowUp, Camera, MapPin } from 'lucide-react';

const Report = () => {
  const navigate = useNavigate();
  const [urgency, setUrgency] = useState('Low');
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    description: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('incidentType', formData.incidentType);
    data.append('location', formData.location);
    data.append('description', formData.description);
    data.append('urgency', urgency);
    // data.append('anonymous', anonymous);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const response = await axios.post('/reports', data);
      console.log(response.data);
      alert('Report submitted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Report Incident</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowUp className="h-5 w-5 mr-2 text-blue-600" />
              Submit Safety Report
            </CardTitle>
            <p className="text-gray-600">Help keep The Bronx safe by reporting incidents in your area.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Incident Type */}
              <div className="space-y-2">
                <Label htmlFor="incidentType">Incident Type *</Label>
                <Select required onValueChange={(value) => setFormData({...formData, incidentType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hazard">Hazard</SelectItem>
                    <SelectItem value="crime">Crime</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter address or landmark in The Bronx"
                    className="pl-10"
                    required
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  e.g., "149th St & Grand Concourse" or "Yankee Stadium"
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the incident in detail..."
                  className="min-h-[120px]"
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo">Photo (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="photo" className="cursor-pointer text-blue-600 hover:text-blue-500">
                      Click to upload a photo
                    </label>
                    <input id="photo" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <Label>Urgency Level *</Label>
                <div className="flex space-x-4">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                        urgency === level
                          ? `${getUrgencyColor(level)} text-white border-transparent`
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anonymous Reporting */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous">Report Anonymously</Label>
                  <p className="text-sm text-gray-500">
                    Your identity will not be shared with the public
                  </p>
                </div>
                <Switch
                  id="anonymous"
                  checked={anonymous}
                  onCheckedChange={setAnonymous}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Report;
