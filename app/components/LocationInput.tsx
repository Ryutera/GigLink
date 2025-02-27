import React, { useRef } from 'react'
import { GoogleMap, useJsApiLoader,StandaloneSearchBox } from '@react-google-maps/api'
const LocationInput = () => {
    const inputref = useRef<google.maps.places.SearchBox | null>(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries:["places"]
      })


      const handleOnPlacesChanged = () =>{
        let address = inputref.current?.getPlaces()
      }
  return (
    <div>
        {isLoaded &&
<StandaloneSearchBox
onLoad={(ref)=>inputref.current===ref}
onPlacesChanged={handleOnPlacesChanged}
>
<input type="text" />
</StandaloneSearchBox>
}
    </div>
        
  )
}

export default LocationInput