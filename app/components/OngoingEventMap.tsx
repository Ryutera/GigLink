"use client"
import {AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Pin} from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';

interface Props{
events:any;
userId:string|null
}
const OngoingEventMap = ({events,userId}:Props) => {
 const router = useRouter()
  //ロケーションのサンプル

  console.log(events,"これがイベント配列")
  const locations = events.map((event:any)=> ({key:event.id , location:{lat:event.latitude,lng:event.longitude} , isOrganizer:event.organizerId===userId ,hasApplied:event.applications.some((app:any)=>app.userId===userId) }))

  const onClickEventDetail =  (eventId:string) =>{
    router.push(`event_detail/${eventId}`)
  }


  return (
    
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
      <div className='flex w-screen h-screen '>
   <Map
   
      defaultZoom={13}
      defaultCenter={  { lat: 51.5074, lng: -0.1278 } }
       mapId='EVENTS_MAP'
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>

        {locations.map((location:any)=>(
<AdvancedMarker
key={location.key}
position={location.location}
onClick={()=>onClickEventDetail(location.key)}>
  {/* //ここの条件文は緯度経度無いやつが赤道に表示されるのを防ぐため */}
  {(location.location.lat === 0 && location.location.lng===0)? <></>:
  location.isOrganizer?
  <Pin  background={'green'} glyphColor={'#000'} borderColor={'#000'} /> : 
    location.hasApplied? 
    <Pin  background={'gray'} glyphColor={'#000'} borderColor={'#000'} /> : 
    
    <Pin  background={'blue'} glyphColor={'#000'} borderColor={'#000'} /> 

  }

</AdvancedMarker>
        ))}
        
   </Map>
   </div>
 </APIProvider>

  )
}

export default OngoingEventMap