"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { instruments } from "../constants/instruments"
import { EventCreate } from "@/lib/action"
import LocationInput from "./LocationInput"
import FormInput from "./form/FormInput"
import InstrumentSelector from "./form/InstrumentSelector"
import FormTextarea from "./form/FormTextarea"
import type { EventFormData } from "@/types/hostform"
import BackButton from "./BackButton"

const HostForm: React.FC = () => {
  const router = useRouter()

  // Manage state with a single object
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    place: "",
    detail: "",
    date: "",
    startTime: "",
    endTime: "",
    selectedInstruments: [],
    latitude: null,
    longitude: null,
  })

  // Generic input handler
  // If id is "place", it updates the place field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Update location coordinates
  const setCoordinates = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
  }

  // Update place (from LocationInput component)
  const setPlace = (place: string) => {
    setFormData((prev) => ({
      ...prev,
      place,
    }))
  }

  // Toggle instrument selection
  const toggleInstrument = (instrument: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedInstruments: prev.selectedInstruments.includes(instrument)
        ? prev.selectedInstruments.filter((i) => i !== instrument)
        : [...prev.selectedInstruments, instrument],
    }))
  }

  // Form submission handler
  const handleSubmit = async (formDataSubmit: FormData) => {
    try {
      const result = await EventCreate({
        ...formData,
        // Not used from FormData object, but needed for type consistency
      })

      if (result.success) {
        alert(result.message)
        console.log("form data is", FormData)
        // Reset form
        setFormData({
          title: "",
          place: "",
          detail: "",
          date: "",
          startTime: "",
          endTime: "",
          selectedInstruments: [],
          latitude: null,
          longitude: null,
        })
        router.push("/host")
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Unable to create event", error)
      alert("An error occurred while creating the event")
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="max-w-2xl mx-auto p-7 shadow-md ">
      <h2 className="text-3xl font-bold mb-6">Create Live Event</h2>
      <form className="space-y-4" action={handleSubmit}>
        <FormInput
          id="title"
          label="Event Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter title"
          required
        />

        <div>
          <label htmlFor="place" className="block mb-1 font-medium">
            Location
          </label>
          <LocationInput setPlace={setPlace} setCoordinates={setCoordinates}>
            <input
              id="place"
              value={formData.place}
              onChange={(e) => setPlace(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="Enter address"
              required
            />
          </LocationInput>
        </div>

        <div className="grid gap-4">
          <FormInput
            id="date"
            label="Date"
            value={formData.date}
            onChange={handleInputChange}
            type="date"
            required
            mintime={today}
          />

          <div className="grid md:grid-cols-2 gap-3">
            <FormInput
              id="startTime"
              label="Start Time"
              value={formData.startTime}
              onChange={handleInputChange}
              type="time"
              step="1800"
              required
            />

            <FormInput
              id="endTime"
              label="End Time"
              value={formData.endTime}
              onChange={handleInputChange}
              type="time"
              step="1800"
              required
            />
          </div>
        </div>

        <InstrumentSelector
          instruments={instruments}
          selectedInstruments={formData.selectedInstruments}
          toggleInstrument={toggleInstrument}
        />

        <FormTextarea
          id="detail"
          label="Event Details"
          value={formData.detail}
          onChange={handleInputChange}
          placeholder="Enter detailed information about the event"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full md:w-auto"
        >
          Create Event
        </button>
      </form>
      <BackButton />
    </div>
  )
}

export default HostForm

