'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger, toast } from 'ui';
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
  const [userinfo, setUserinfo] = useState<any | null>(null);

  
  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setActiveTab('details');
  };
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/image/upload/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const imageUrl = await response.json();
    return imageUrl;
  };

  const handleCommentSubmit = async () => {
    let imageUrl = null;

    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    console.log('selectedReport:', selectedReport);

    const newCommentData = {
      report_id: selectedReport?.report_id,
      username: userinfo?.username || '匿名',
      timestamp: Math.floor(Date.now() / 1000),
      content: newComment,
      image: imageUrl,
    };
    const newCommentDataForDisplay = {
      report_id: selectedReport!.report_id,
      username: userinfo?.username || '匿名',
      timestamp: Math.floor(Date.now() / 1000),
      content: newComment,
      image: imageUrl,
      comment_id: '123',
    };

    console.log('newCommentData:', newCommentData);

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
        setComments([...comments, newCommentDataForDisplay]);
        setNewComment('');
        setImageFile(null);
        handleSelectReport(selectedReport!);
      })
      .catch(error => console.error('Error submitting comment:', error));
  };
  const handleCreateReport = async ({
    content,
    tags,
    image,
  }: {
    content: string;
    tags: string[];
    image: File | null;
  }) => {
    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await uploadImage(image);
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    if (content && currentLocation) {
      const newReportData = {
        username: userinfo?.username || '匿名',
        content,
        timestamp: Math.floor(Date.now() / 1000),
        image: imageUrl,
        location: {
          lat: currentLocation.lat,
          lng: currentLocation.lng,
        },
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
        .then(data => {
          console.log('Report submitted:', data);

          setSelectedReport({
            report_id: data.report_id,
            username: data.username,
            content: data.content,
            image: data.image,
            location: data.location,
            tags: data.tags,
            emoji: data.emoji,
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
        const data = JSON.parse(event.data);

        if (data.name === 'location') {
          setCurrentLocation({
            lat: data.data.latitude,
            lng: data.data.longitude,
          });
          return;
        }

        if (data.name === 'userinfo') {
          setUserinfo(data.data);
          return;
        }
      };
    }
    return () => {
      // @ts-ignore
      if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
        // @ts-ignore
        window.flutterObject.onmessage = null;
      }
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
      // @ts-ignore
      window.flutterObject.postMessage(
        JSON.stringify({ name: 'userinfo', data: 'null' }),
      );
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
      .then(data => {
        setNearbyReports(data.map(d => d.report));
        console.log('Nearby reports:', data);
      })
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
          {currentLocation && (
            <MapComponent
              onSelectReport={handleSelectReport}
              reports={nearbyReports}
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          )}
        </div>
      </TabsContent>

      <TabsContent value='details'>
        {selectedReport && (
          <ReportDetails
            selectedReport={selectedReport}
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCommentSubmit={handleCommentSubmit}
            reports={nearbyReports}
            setSelectReport={setSelectedReport}
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
        uploadImage={uploadImage}
      />
    </Tabs>
  );
}
