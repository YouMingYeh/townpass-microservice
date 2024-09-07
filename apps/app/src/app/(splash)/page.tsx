'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui';
import { MapComponent } from '../../components/MapComponent';
import { ReportDetails } from '../../components/ReportDetails';
import { ReportForm } from '../../components/ReportForm';
import { Report, Comment } from '../type';

const API_BASE_URL = 'https://api-gateway-978568328496.asia-east1.run.app';

export default function Home() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [nearbyReports, setNearbyReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [newComment, setNewComment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [newReportContent, setNewReportContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setActiveTab('details');
  };

  const handleCreateReport = ({
    content,
    tags,
    image,
  }: {
    content: string;
    tags: string[];
    image: File | null;
  }) => {
    if (content && currentLocation) {
      const newReportData = {
        username: 'Current User',
        content,
        timestamp: Math.floor(Date.now() / 1000),
        image: image ? URL.createObjectURL(image) : null,
        location: currentLocation,
        tags,
      };

      fetch(`${API_BASE_URL}/report/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReportData),
      })
        .then(res => res.json())
        .then(reportId => {
          console.log('Report submitted:', reportId);
          setSelectedReport({
            id: reportId,
            username: 'Current User',
            reason: content,
            image: image ? URL.createObjectURL(image) : null,
            location: currentLocation,
            tags,
          });
          setNewReportContent('');
          setImageFile(null);
          setIsFormOpen(false);
          setSelectedTags([]);
          setActiveTab('details');
        })
        .catch(error => console.error('Error submitting report:', error));
    }
  };
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
  useEffect(() => {
    if (!currentLocation?.lat || !currentLocation?.lng) return;

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
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger
          value='map'
          className='relative flex-1 rounded-none border-b-4 border-b-white bg-white font-normal text-[#5AB4C5] shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-[#5AB4C5] data-[state=active]:font-bold'
        >
          地圖
        </TabsTrigger>
        <TabsTrigger
          value='details'
          className='relative flex-1 rounded-none border-b-4 border-b-white bg-white font-normal text-[#5AB4C5] shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-[#5AB4C5] data-[state=active]:font-bold'
        >
          詳細資訊
        </TabsTrigger>
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
        {selectedReport && (
          <ReportDetails
            selectedReport={selectedReport}
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCommentSubmit={() => {}}
            handleImageUpload={() => {}}
          />
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
      <ReportForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        handleCreateReport={handleCreateReport}
      />
    </Tabs>
  );
}
