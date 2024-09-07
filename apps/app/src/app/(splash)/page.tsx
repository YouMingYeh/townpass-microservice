'use client';

import { useState, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
  Button,
  Textarea,
  useToast,
} from 'ui';

interface Location {
  latitude: number;
  longitude: number;
}

interface Report {
  id: string;
  username: string;
  reason: string | null;
  image: string | null;
  location: Location | null;
}

interface Comment {
  report_id: string;
  username: string;
  time: string;
  content: string;
  image: string | null;
}

const reports: Report[] = [
  {
    id: '1',
    username: 'User1',
    reason: 'Spam',
    image: null,
    location: { latitude: 25.027, longitude: 121.5335 },
  },
  {
    id: '2',
    username: 'User2',
    reason: 'Harassment',
    image: null,
    location: { latitude: 25.029, longitude: 121.5535 },
  },
];

const comments: Comment[] = [
  {
    report_id: '1',
    username: 'Commenter1',
    time: '2024-09-01 10:00',
    content: 'This is inappropriate.',
    image: null,
  },
  {
    report_id: '1',
    username: 'Commenter2',
    time: '2024-09-01 11:00',
    content: 'Please take action.',
    image: null,
  },
  {
    report_id: '2',
    username: 'Commenter3',
    time: '2024-09-01 12:00',
    content: 'This is a spam message.',
    image: null,
  },
];

const MapComponent = ({
  onSelectReport,
}: {
  onSelectReport: (report: Report) => void;
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-Jcq0ZxIGGHmKkncVs2iJhY3nRYebe7Y',
  });

  const { toast } = useToast();

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setCurrentLocation({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //       setLocationError(null);
  //     },
  //     (error) => {
  //       setLocationError('Error getting location: ' + error.message);
  //     }
  //   );
  // }, []);

  // flutter web message listener
  useEffect(() => {
    // @ts-ignore
    if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
      // @ts-ignore
      window.flutterObject.onmessage = event => {
        setCurrentLocation({
          lat: Number(JSON.parse(event.data).data.latitude),
          lng: Number(JSON.parse(event.data).data.longitude),
        });
      };
    }
  }, []);

  

  useEffect(() => {
    // @ts-ignore
    if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
      // @ts-ignore
      window.flutterObject.postMessage(
        JSON.stringify({ name: 'location', data: 'null' }),
      );
    }
    const updateLocation = setInterval(() => {
      // @ts-ignore
      if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
        // @ts-ignore
        window.flutterObject.postMessage(
          JSON.stringify({ name: 'location', data: 'null' }),
        );
      }
    }, 5000);
    return () => {
      clearInterval(updateLocation);
    };
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        center={currentLocation || { lat: 25.033, lng: 121.5654 }}
        zoom={14}
        mapContainerStyle={{ height: '100vh', width: '100%' }}
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            }}
          />
        )}
        {reports.map(
          (report, index) =>
            report.location && (
              <Marker
                key={index}
                position={{
                  lat: report.location.latitude,
                  lng: report.location.longitude,
                }}
                onClick={() => setSelectedReport(report)}
              />
            ),
        )}

        {selectedReport && (
          <InfoWindow
            position={{
              lat: selectedReport.location?.latitude!,
              lng: selectedReport.location?.longitude!,
            }}
            onCloseClick={() => setSelectedReport(null)}
          >
            <div>
              <h2>{selectedReport.username}</h2>
              <p>{selectedReport.reason || 'No reason provided'}</p>
              <button onClick={() => onSelectReport(selectedReport)}>
                查看詳細資訊
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
    </>
  );
};

export default function Home() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [newComment, setNewComment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [newReportContent, setNewReportContent] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setActiveTab('details');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleCommentSubmit = () => {
    console.log('提交留言:', newComment, imageFile);
    setNewComment('');
    setImageFile(null);
  };

  const getCommentsForReport = (reportId: string) =>
    comments.filter(comment => comment.report_id === reportId);

  const handleCreateReport = () => {
    if (newReportContent && currentLocation) {
      const newReport: Report = {
        id: String(Date.now()),
        username: 'Current User',
        reason: newReportContent,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        location: currentLocation,
      };
      console.log('提交報告:', newReport);
      setNewReportContent('');
      setImageFile(null);
      setIsFormOpen(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList variant='underline' className='w-full'>
        <TabsTrigger value='map'>地圖</TabsTrigger>
        <TabsTrigger value='details'>詳細資訊</TabsTrigger>
      </TabsList>

      <TabsContent value='map'>
        <div style={{ height: '100vh', width: '100%' }}>
          <MapComponent onSelectReport={handleSelectReport} />
        </div>
      </TabsContent>

      <TabsContent value='details'>
        {selectedReport ? (
          <div style={{ padding: '20px' }}>
            <h2>報告詳細資訊</h2>
            <p>
              <strong>使用者：</strong> {selectedReport.username}
            </p>
            <p>
              <strong>原因：</strong> {selectedReport.reason || '無原因'}
            </p>
            {selectedReport.image && (
              <img
                src={selectedReport.image}
                alt='Report'
                style={{ width: '100%' }}
              />
            )}
            <p>
              <strong>位置：</strong> ({selectedReport.location?.latitude},{' '}
              {selectedReport.location?.longitude})
            </p>
            <h3>留言區</h3>
            {getCommentsForReport(selectedReport.id).map((comment, index) => (
              <div key={index}>
                <p>
                  <strong>{comment.username}</strong> ({comment.time}):{' '}
                  {comment.content}
                </p>
                {comment.image && (
                  <img
                    src={comment.image}
                    alt='Comment'
                    style={{ width: '100px' }}
                  />
                )}
              </div>
            ))}
            <div style={{ marginTop: '20px' }}>
              <h3>新增留言</h3>
              <Textarea
                placeholder='輸入您的留言...'
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className='mb-2'
              />
              <Input
                type='file'
                onChange={handleImageUpload}
                className='mb-2'
              />
              <Button onClick={handleCommentSubmit}>送出留言</Button>
            </div>
          </div>
        ) : (
          <p>請選擇一個報告查看詳細資訊。</p>
        )}
      </TabsContent>
      <button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#5AB4C5',
          color: '#fff',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          border: 'none',
          fontSize: '24px',
        }}
        onClick={() => setIsFormOpen(true)}
      >
        +
      </button>

      {isFormOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '300px',
            height: '400px',
          }}
        >
          <h3 className='mb-4'>新增報告</h3>
          <Textarea
            placeholder='輸入報告內容'
            value={newReportContent}
            onChange={e => setNewReportContent(e.target.value)}
            className='mb-4'
            style={{ height: '200px' }}
          />
          <Input type='file' onChange={handleImageUpload} className='mb-4' />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCreateReport}>提交</Button>
            <Button
              onClick={() => setIsFormOpen(false)}
              style={{ marginLeft: '10px' }}
            >
              取消
            </Button>
          </div>
        </div>
      )}
    </Tabs>
  );
}
