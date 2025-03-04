"use client"
import {AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Pin} from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';
const OngoingEventMap = ({events}:any) => {
 const router = useRouter()
  //ロケーションのサンプル

  console.log(events,"これがイベント配列")
  const locations = events.map((event:any)=> ({key:event.id , location:{lat:event.latitude,lng:event.latitude}}))

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
<Pin  background={'red'} glyphColor={'#000'} borderColor={'#000'} />
</AdvancedMarker>
        ))}
        
   </Map>
   </div>
 </APIProvider>

  )
}

export default OngoingEventMap