
import React, { useState } from 'react';
import { X, Phone, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  type: 'emergency' | 'local' | 'support';
}

interface EmergencyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyOverlay = ({ isOpen, onClose }: EmergencyOverlayProps) => {
  const [userLocation] = useState('Bronx, NY'); // Mock geolocation

  const emergencyContacts: EmergencyContact[] = [
    { name: '911', number: '911', description: 'Police, Fire, Medical Emergency', type: 'emergency' },
    { name: 'NYPD 40th Precinct', number: '(718) 402-2270', description: 'Non-emergency police', type: 'local' },
    { name: 'FDNY EMS Station 17', number: '(718) 590-2000', description: 'Fire Department', type: 'local' },
    { name: 'BronxCare Crisis', number: '(718) 960-1234', description: 'Mental health crisis', type: 'support' },
    { name: 'Safe Horizon', number: '(212) 577-7777', description: 'Domestic violence hotline', type: 'support' },
    { name: 'Poison Control', number: '1-800-222-1222', description: '24/7 poison emergency', type: 'emergency' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-500 text-white';
      case 'local': return 'bg-blue-500 text-white';
      case 'support': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader className="bg-red-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Emergency Contacts
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-red-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center text-red-100 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {userLocation}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2 p-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-gray-900">{contact.name}</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contact.type)}`}>
                      {contact.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                  <p className="text-sm font-mono text-gray-700">{contact.number}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="ml-3"
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyOverlay;
