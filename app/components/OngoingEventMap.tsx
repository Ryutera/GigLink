"use client"
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
const OngoingEventMap = () => {
  return (
    
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
      <div className='flex w-screen h-screen '>
   <Map
   
      defaultZoom={13}
      defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
   </Map>
   </div>
 </APIProvider>

  )
}

export default OngoingEventMap