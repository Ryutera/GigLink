import React, { useRef } from 'react'
import { GoogleMap, useJsApiLoader,StandaloneSearchBox } from '@react-google-maps/api'

interface LocationInputProps {
  setPlace: (location: string) => void; // 追加
  children: React.ReactNode;
}
const LocationInput:React.FC<LocationInputProps> = ({children,setPlace}) => {
    const inputref = useRef<google.maps.places.SearchBox | null>(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries:["places"]
      })


      const handleOnPlacesChanged = () =>{
        let places = inputref.current?.getPlaces()
       
        if (places && places.length > 0) {
          setPlace(places[0].formatted_address || ""); // 取得した住所を保存
        }
        
       
      }
  return (
    <div>
        {isLoaded &&
<StandaloneSearchBox
onLoad={(ref)=>inputref.current=ref}
onPlacesChanged={handleOnPlacesChanged}
>
{children}
</StandaloneSearchBox>
}
    </div>
        
  )
}

export default LocationInput