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
  id: string
  title: string
  description?: string
  date: Date
  startTime: Date
  endTime: Date
  location: string
  latitude: number
  longitude: number
  instruments: string[]
  organizerId: string
  createdAt?: Date
  updatedAt?: Date
  organizer: User
  applications: Application[]
}

