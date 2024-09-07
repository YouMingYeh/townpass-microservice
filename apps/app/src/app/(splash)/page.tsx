'use client';

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface Report {
  username: string;
  reason: string | null;
  image: string | null;
  location: Location | null;
}

const reports: Report[] = [
  { username: 'User1', reason: 'Spam', image: null, location: { latitude: 25.0270, longitude: 121.5335 } }, // 西邊
  { username: 'User2', reason: 'Harassment', image: null, location: { latitude: 25.0290, longitude: 121.5535 } }, // 東邊
  { username: 'User3', reason: 'Inappropriate Content', image: null, location: { latitude: 25.0210, longitude: 121.5435 } }, // 南邊
  { username: 'User4', reason: 'Violation of Terms', image: null, location: { latitude: 25.0310, longitude: 121.5435 } }, // 北邊
  { username: 'User5', reason: 'Other', image: null, location: { latitude: 25.0260, longitude: 121.5435 } }, // 中心
];


const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-Jcq0ZxIGGHmKkncVs2iJhY3nRYebe7Y',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.error('Error getting location');
      }
    );
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      center={currentLocation || { lat: 25.0330, lng: 121.5654 }}
      zoom={14}
      mapContainerStyle={{ height: '100vh', width: '100vw' }}
    >
      {currentLocation && (
        <Marker
          position={currentLocation}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }}
        />
      )}

      {reports.map((report, index) => (
        report.location && (
          <Marker
            key={index}
            position={{ lat: report.location.latitude, lng: report.location.longitude }}
            onClick={() => setSelectedReport(report)}
          />
        )
      ))}

      {selectedReport && (
        <InfoWindow
          position={{ lat: selectedReport.location?.latitude!, lng: selectedReport.location?.longitude! }}
          onCloseClick={() => setSelectedReport(null)}
        >
          <div style={{ color: '#000', fontSize: '16px' }}>
            <h2 style={{ color: '#333', fontSize: '18px', fontWeight: 'bold' }}>{selectedReport.username}</h2>
            <p>{selectedReport.reason || 'No reason provided'}</p>
            {selectedReport.image && <img src={selectedReport.image} alt="Report" style={{ width: '100%' }} />}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default function Home() {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', width: '100vw' }}>
      <MapComponent />
    </div>
  );
}
