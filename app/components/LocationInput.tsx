import React, { useRef } from 'react'
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'

interface LocationInputProps {
  setPlace: (location: string) => void;
  setCoordinates: (lat: number, lng: number) => void;
  children: React.ReactNode;
}

const libraries: "places"[] = ["places"];

const LocationInput: React.FC<LocationInputProps> = ({ children, setPlace, setCoordinates }) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const handleOnPlacesChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place) {
      setPlace(place.formatted_address || "");

      if (place.geometry?.location) {
        setCoordinates(place.geometry.location.lat(), place.geometry.location.lng());
      }
    }
  };

  return (
    <div>
      {isLoaded && (
        <Autocomplete
          onLoad={(ref) => {
            autocompleteRef.current = ref;
          }}
          onPlaceChanged={handleOnPlacesChanged}
          options={{ componentRestrictions: { country: "uk" } }} // UKに制限
        >
          {children}
        </Autocomplete>
      )}
    </div>
  );
};

export default LocationInput;
