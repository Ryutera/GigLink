export interface User {
  id: string
  name: string
  email?: string
  image?: string | null
}

export interface Application {
  id: string
  userId: string
  eventId: string
  status: "PENDING" | "ACCEPTED" | "REJECTED"
  instrument: string
  message?: string
  createdAt: Date
  updatedAt: Date
  user?: User
  
}

export interface MusicEvent {
  applications: any
  id: string
  title: string
  description: string
  date: Date
  startTime: Date
  endTime: Date
  location: string
  latitude: number
  longitude: number
  instruments: string[]
  organizerId: string
  createdAt: Date 
  updatedAt: Date
  organizer?: {
    id: string;
    name?: string;
    image?: string|null;
  } 
  
}




export interface scheduledProps{
  
  
    id: string
    eventId:string
    userId: string
    instrument: string
    message: string
   status: "PENDING" | "ACCEPTED" | "REJECTED"
    createdAt: Date
    updatedAt: Date
    event: {
      id: string
      title: string
      description: string
      date: Date
      startTime:Date
      endTime: Date
      location: string
      latitude: number
      longitude: number
      organizerId: string
      createdAt: Date
      updatedAt: Date
      instruments: string[]
   
    }
  

  }
