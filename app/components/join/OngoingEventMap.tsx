"use client"

import {AdvancedMarker, APIProvider, InfoWindow, Map, MapCameraChangedEvent, Pin} from '@vis.gl/react-google-maps';
import Link from 'next/link';


import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props{
events:any;
userId:string|null
}
const OngoingEventMap = ({events,userId}:Props) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  console.log(selectedEvent,"pin clicked")

  //ロケーションのサンプル


  
  const locations = events.map((event: any) => ({
    key: event.id,
    location: { lat: event.latitude, lng: event.longitude },
    isOrganizer: event.organizerId === userId,
    hasApplied: event.applications.some((app: any) => app.userId === userId),
    title: event.title,
    date: event.date,
    location_name: event.location,
    event: event,
  }))
  const handleMarkerClick = (location: any) => {
    setSelectedEvent(location)
  }



  const handleClose = () => setSelectedEvent(null);


  return (
    
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
      <div className='flex w-screen h-screen '>
   <Map
   
      defaultZoom={10}
      defaultCenter={  { lat: 51.5074, lng: -0.1278 } }
       mapId='EVENTS_MAP'
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>

        {locations.map((location:any)=>(
<AdvancedMarker
key={location.key}
position={location.location}
onClick={()=>handleMarkerClick(location
)}>
  {/* //ここの条件文は緯度経度無いやつが赤道に表示されるのを防ぐため */}
  {(location.location.lat === 0 && location.location.lng===0)? <></>:
  location.isOrganizer?
  <Pin  background={'green'} glyphColor={'#000'} borderColor={'#000'} /> : 
    location.hasApplied? 
    <Pin  background={'gray'} glyphColor={'#000'} borderColor={'#000'} /> : 
    
    <Pin  background={'blue'} glyphColor={'#000'} borderColor={'#000'} /> 

  }

</AdvancedMarker>
        )) }

{selectedEvent!==null && (
        <InfoWindow onCloseClick={handleClose} position={selectedEvent.location} >
          <div className="p-2 max-w-xs ">
                <h3 className="font-bold text-lg mb-1">{selectedEvent.title}</h3>
                <p className="text-sm mb-1">
                  <span className="font-medium">日時:</span> {new Date(selectedEvent.event.date).toLocaleDateString()}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">場所:</span> {selectedEvent.location_name}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-medium">ステータス:</span>{" "}
                  {selectedEvent.isOrganizer ? "主催者" : selectedEvent.hasApplied ? "応募済み" : "未応募"}
                </p>
                <Link
                  href={`/event_detail/${selectedEvent.key}`}
                  className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm mt-2"
                >
                  <p>詳細を見る</p>
                </Link>
              </div>
        </InfoWindow>
      )}
        
        
   </Map>
   </div>
 </APIProvider>

  )
}

export default OngoingEventMap