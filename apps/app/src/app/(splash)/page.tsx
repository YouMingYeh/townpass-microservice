'use client';

import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Tabs, TabsContent, TabsList, TabsTrigger, Input, Button, Textarea } from 'ui';

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
  { id: '1', username: 'User1', reason: 'Spam', image: null, location: { latitude: 25.0270, longitude: 121.5335 } },
  { id: '2', username: 'User2', reason: 'Harassment', image: null, location: { latitude: 25.0290, longitude: 121.5535 } },
];

const comments: Comment[] = [
  { report_id: '1', username: 'Commenter1', time: '2024-09-01 10:00', content: 'This is inappropriate.', image: null },
  { report_id: '1', username: 'Commenter2', time: '2024-09-01 11:00', content: 'Please take action.', image: null },
  { report_id: '2', username: 'Commenter3', time: '2024-09-01 12:00', content: 'This is a spam message.', image: null },
];

const MapComponent = ({ onSelectReport }: { onSelectReport: (report: Report) => void }) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-Jcq0ZxIGGHmKkncVs2iJhY3nRYebe7Y',
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={currentLocation || { lat: 25.0330, lng: 121.5654 }}
      zoom={14}
      mapContainerStyle={{ height: '100vh', width: '100%' }}
    >
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
          <div>
            <h2>{selectedReport.username}</h2>
            <p>{selectedReport.reason || 'No reason provided'}</p>
            <button onClick={() => onSelectReport(selectedReport)}>查看詳細資訊</button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default function Home() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [newComment, setNewComment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const getCommentsForReport = (reportId: string) => comments.filter(comment => comment.report_id === reportId);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList variant='underline' className='w-full'>
        <TabsTrigger value="map">地圖</TabsTrigger>
        <TabsTrigger value="details">詳細資訊</TabsTrigger>
      </TabsList>

      <TabsContent value="map">
        <div style={{ height: '100vh', width: '100%' }}>
          <MapComponent onSelectReport={handleSelectReport} />
        </div>
      </TabsContent>

      <TabsContent value="details">
        {selectedReport ? (
          <div style={{ padding: '20px' }}>
            <h2>報告詳細資訊</h2>
            <p><strong>使用者：</strong> {selectedReport.username}</p>
            <p><strong>原因：</strong> {selectedReport.reason || '無原因'}</p>
            {selectedReport.image && <img src={selectedReport.image} alt="Report" style={{ width: '100%' }} />}
            <p><strong>位置：</strong> ({selectedReport.location?.latitude}, {selectedReport.location?.longitude})</p>
            <h3>留言區</h3>
            {getCommentsForReport(selectedReport.id).map((comment, index) => (
              <div key={index}>
                <p><strong>{comment.username}</strong> ({comment.time}): {comment.content}</p>
                {comment.image && <img src={comment.image} alt="Comment" style={{ width: '100px' }} />}
              </div>
            ))}
            <div style={{ marginTop: '20px' }}>
              <h3>新增留言</h3>
              <Textarea
                placeholder="輸入您的留言..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Input type="file" onChange={handleImageUpload} className="mb-2" />
              <Button onClick={handleCommentSubmit}>送出留言</Button>
            </div>
          </div>
        ) : (
          <p>請選擇一個報告查看詳細資訊。</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
