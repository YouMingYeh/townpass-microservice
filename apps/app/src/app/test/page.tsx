import { useEffect, useState } from 'react';
import { Separator, useToast } from 'ui';


interface Location {
  latitude: number;
  longitude: number;
}
 

export default function Page() {

  const [location, setLocation] = useState<Location>({
    latitude:125.0270, longitude: 121.5335
  });
  const { toast } = useToast();

  // flutter web message listener
  useEffect(() => {
    // @ts-ignore
    if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
      // @ts-ignore
      window.flutterObject.listen('location', (message: Location) => {
        setLocation(message);
      }
      );
    }
  }, []);
  useEffect(() => { 
    const updateLocation = setInterval(() => {
      // @ts-ignore
      if (typeof window.flutterObject !== 'undefined' && window.flutterObject) {
        // @ts-ignore
        window.flutterObject.postMessage('location');
      }
      toast({
        title: 'Location',
        description: `Latitude: ${location.latitude}, Longitude: ${location.longitude}`,
      });

    }, 5000);
    return () => {
      clearInterval(updateLocation);
    }
  }, []);
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center overflow-visible py-8 pb-24 md:pb-24'>
      <h1>Welcome to the Page</h1>
      <Separator />
    </div>
  );
}