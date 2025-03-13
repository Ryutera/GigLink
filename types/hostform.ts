export interface EventFormData {
    title: string
    place: string
    detail: string
    date: string
    startTime: string
    endTime: string
    selectedInstruments: string[]
    latitude: number | null
    longitude: number | null
  }
  
  export interface EventCreateResponse {
    success: boolean
    message: string
  }
  