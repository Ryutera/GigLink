"use client"

import type { MusicEvent } from "@/types/events"
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  type MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps"
import Link from "next/link"

import { useState } from "react"

interface Props {
  events: MusicEvent[]
  userId: string | null
}
interface LocationProps {
  key: string
  location: { lat: number; lng: number }
  isOrganizer: boolean
  hasApplied: boolean
  title: string
  date: Date
  location_name: string
  event: MusicEvent
}

const OngoingEventMap = ({ events, userId }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<LocationProps | null>(null)
  console.log(selectedEvent, "pin clicked")

  // Sample locations

  const locations = events.map((event) => ({
    key: event.id,
    location: { lat: event.latitude, lng: event.longitude },
    isOrganizer: event.organizerId === userId,
    hasApplied: event.applications.some((app: any) => app.userId === userId),
    title: event.title,
    date: event.date,
    location_name: event.location,
    event: event,
  }))

  const handleMarkerClick = (location: LocationProps) => {
    setSelectedEvent(location)
  }

  const handleClose = () => setSelectedEvent(null)

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div className="flex w-screen h-screen ">
        <Map
          defaultZoom={10}
          defaultCenter={{ lat: 51.5074, lng: -0.1278 }}
          mapId="EVENTS_MAP"
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
          }
        >
          {locations.map((location: LocationProps) => (
            <AdvancedMarker key={location.key} position={location.location} onClick={() => handleMarkerClick(location)}>
              {/* This condition prevents events with no coordinates from displaying at the equator */}
              {location.location.lat === 0 && location.location.lng === 0 ? (
                <></>
              ) : location.isOrganizer ? (
                <Pin background={"green"} glyphColor={"#000"} borderColor={"#000"} />
              ) : location.hasApplied ? (
                <Pin background={"gray"} glyphColor={"#000"} borderColor={"#000"} />
              ) : (
                <Pin background={"blue"} glyphColor={"#000"} borderColor={"#000"} />
              )}
            </AdvancedMarker>
          ))}

          {selectedEvent !== null && (
            <InfoWindow onCloseClick={handleClose} position={selectedEvent.location}>
              <div className="p-2 max-w-xs ">
                <h3 className="font-bold text-lg mb-1">{selectedEvent.title}</h3>
                <p className="text-sm mb-1">
                  <span className="font-medium">Date:</span> {new Date(selectedEvent.event.date).toLocaleDateString()}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Location:</span> {selectedEvent.location_name}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-medium">Status:</span>{" "}
                  {selectedEvent.isOrganizer ? "Organizer" : selectedEvent.hasApplied ? "Applied" : "Not Applied"}
                </p>
                <Link
                  href={`/event_detail/${selectedEvent.key}`}
                  className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm mt-2"
                >
                  <p>View Details</p>
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

