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
  lat: number;
  lng: number;
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

const API_BASE_URL = 'https://api-gateway-978568328496.asia-east1.run.app';

const MapComponent = ({
  onSelectReport,
  reports,
}: {
  onSelectReport: (report: Report) => void;
  reports: Report[];
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        setLocationError('Error getting location: ' + error.message);
      }
    );
  }, []);

  // flutter web message listener
  useEffect(() => {
    // @ts-ignore
    if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
      // @ts-ignore
      window.flutterObject.onmessage = event => {
        setCurrentLocation({
          lat: Number(JSON.parse(event.data).data.lat),
          lng: Number(JSON.parse(event.data).data.lng),
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
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            }}
          />
        )}
        {/* {reports.map(
          (report, index) =>
            report.location && (
              <Marker
                key={index}
                position={{
                  lat: report.location.lat,
                  lng: report.location.lng,
                }}
                onClick={() => setSelectedReport(report)}
              />
            ),
        )} */}

        {selectedReport && (
          <InfoWindow
            position={{
              lat: selectedReport.location?.lat!,
              lng: selectedReport.location?.lng!,
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
  const [nearbyReports, setNearbyReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [newComment, setNewComment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [newReportContent, setNewReportContent] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setActiveTab('details');

    fetch(`${API_BASE_URL}/report/comments/${report.id}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleCommentSubmit = () => {
    const newCommentData = {
      report_id: selectedReport?.id,
      username: 'Current User',
      timestamp: Math.floor(Date.now() / 1000),
      content: newComment,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
    };

    fetch(`${API_BASE_URL}/report/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommentData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Comment submitted:', data);
        setNewComment('');
        setImageFile(null);
        handleSelectReport(selectedReport!);
      })
      .catch(error => console.error('Error submitting comment:', error));
  };

  const handleCreateReport = () => {
    console.log('@@');
    console.log(newReportContent);
    console.log(currentLocation);
    if (newReportContent && currentLocation) {
      const newReportData = {
        username: 'Current User',
        content: newReportContent,
        timestamp: Math.floor(Date.now() / 1000),
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        location: currentLocation,
      };

      fetch(`${API_BASE_URL}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReportData),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Report submitted:', data);
          setNewReportContent('');
          setImageFile(null);
          setIsFormOpen(false);
        })
        .catch(error => console.error('Error submitting report:', error));
    }
  };

  const getCommentsForReport = (reportId: string) =>
    comments.filter(comment => comment.report_id === reportId);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      error => {
        setLocationError('Error getting location: ' + error.message);
      },
    );
  }, []);
  useEffect(() => {
    if(!currentLocation?.lat || !currentLocation?.lng) return;

    fetch(
      `${API_BASE_URL}/report/search_nearby?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}`,
    )
      .then(
        res => res.json() as Promise<{ report: Report; distance: number }[]>,
      )
      .then(data => setNearbyReports(data.map(d => d.report)))
      .catch(error => console.error('Error fetching nearby reports:', error));
  }, [currentLocation]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="map" className="bg-white border-b-white relative flex-1 rounded-none border-b-4 font-normal shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-[#5AB4C5] text-[#5AB4C5] data-[state=active]:font-bold">地圖</TabsTrigger>
        <TabsTrigger value="details" className="bg-white border-b-white relative flex-1 rounded-none border-b-4 font-normal shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-[#5AB4C5] text-[#5AB4C5] data-[state=active]:font-bold">詳細資訊</TabsTrigger>
      </TabsList>

      <TabsContent value='map'>
        <div style={{ height: '100vh', width: '100%' }}>
          <MapComponent
            onSelectReport={handleSelectReport}
            reports={nearbyReports}
          />
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
              <strong>位置：</strong> ({selectedReport.location?.lat},{' '}
              {selectedReport.location?.lng})
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
          <div>
            <h2>附近報告</h2>
            {nearbyReports.map((report, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3>{report.username}</h3>
                <p>{report.reason || 'No reason provided'}</p>
                <button onClick={() => handleSelectReport(report)}>
                  查看詳細資訊
                </button>
              </div>
            ))}
          </div>
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
