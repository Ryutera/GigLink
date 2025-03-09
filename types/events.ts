export interface User {
    id: string
    name: string
  }
  
  export interface Application {
    id: string
    userId: string
    eventId: string
    status: "PENDING" | "ACCEPTED" | "REJECTED"
    instrument: string
    message: string
    user: User
  }
  
  export interface Event {
    id: string
    title: string
    location: string
    date: Date
    startTime: Date
    endTime: Date
    instruments: string[]
    organizerId: string
    applications: Application[]
  }
  
  