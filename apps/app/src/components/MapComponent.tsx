'use client';
import { useState, useEffect, Suspense } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  Button,
  Icons,
  buttonVariants,
} from 'ui';
import { Report } from '../app/type';
import { useToast } from 'ui';

const tagsList = [
  '路障',
  '動物',
  '事故',
  '修路',
  '壅塞',
  '天氣',
  '施工',
  '其他',
];

export const MapComponent = ({
  currentLocation,
  setCurrentLocation,
  onSelectReport,
  reports,
}: {
  onSelectReport: (report: Report) => void;
  reports: Report[];
  currentLocation: {
    lat: number;
    lng: number;
  };
  setCurrentLocation: (location: { lat: number; lng: number }) => void;
}) => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-Jcq0ZxIGGHmKkncVs2iJhY3nRYebe7Y',
  });

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position =>
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      error => setLocationError('Error getting location: ' + error.message),
    );
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag],
    );
  };

  const filteredReports = reports.filter(
    report =>
      !selectedTags.length ||
      report.tags?.some(tag => selectedTags.includes(tag)),
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Suspense>
        <Drawer>
          <DrawerTrigger
            style={{
              position: 'absolute',
              top: '60px',
              right: '10px',
              zIndex: 1000,
            }}
          >
            <div className={buttonVariants()}>
              <Icons.SlidersHorizontal />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>篩選條件</DrawerTitle>
            </DrawerHeader>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {tagsList.map(tag => (
                <Button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    backgroundColor: selectedTags.includes(tag)
                      ? '#5AB4C5'
                      : '#e5e5e5',
                    color: selectedTags.includes(tag) ? '#fff' : '#000',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    flex: '0 0 calc(25% - 10px)',
                    textAlign: 'center',
                  }}
                >
                  {tag}
                </Button>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant='outline'>關閉</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Suspense>

      <Button
        size='icon'
        variant='outline'
        onClick={handleGetLocation}
        style={{ zIndex: 1000, top: '120px', right: '10px' }}
        className='bg-background absolute rounded-full'
      >
        <Icons.LocateFixed />
      </Button>

      <GoogleMap
        center={center || { lat: 25.033, lng: 121.5654 }}
        zoom={14}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          scaleControl: false,
          zoomControl: false,
          clickableIcons: false,
        }}
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: '/me.png',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            animation={window.google.maps.Animation.DROP}
          />
        )}
        {filteredReports.map(
          (report, index) =>
            report.location && (
              <Marker
                key={index}
                position={{
                  lat: report.location.lat,
                  lng: report.location.lng,
                }}
                icon={{
                  url: '/marker.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => setSelectedReport(report)}
                animation={window.google.maps.Animation.DROP}
                label={{
                  text: report.emoji || '🙂',
                }}
                title={report.username}
              />
            ),
        )}

        {selectedReport && (
          <InfoWindow
            position={{
              lat: selectedReport.location?.lat!,
              lng: selectedReport.location?.lng!,
            }}
            onCloseClick={() => setSelectedReport(null)}
          >
            <div>
              <p className='mb-2 text-2xl'>{selectedReport.emoji || '🙂'}</p>
              <h2 className='mb-2 font-bold'>{selectedReport.username}</h2>
              <p
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '12px',
                }}
              >
                {selectedReport.content || '沒有內文'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  style={{ fontSize: '12px' }}
                  onClick={() => onSelectReport(selectedReport)}
                >
                  查看詳細資訊 <Icons.ChevronRight />
                </Button>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
    </>
  );
};
