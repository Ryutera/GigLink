"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function ProfileUpdate(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  console.log(formData)

  
  const bio = formData.get("bio") as string;
  const instrumentsJson = formData.get("instruments") as string
  const instruments = JSON.parse(instrumentsJson)


  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        instruments: instruments,
        bio: bio,
      },
    });
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("An error occurred while updating the profile");
  }
}




export async function EventCreate(hostData: {
    title: string
    place: string
    detail: string
    date: string
    startTime: string
    endTime: string
    selectedInstruments: string[]
    latitude: number | null
    longitude: number | null
  }): Promise<{ success: boolean; message: string }> {

    
    
    const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }



    if (!hostData || typeof hostData !== 'object') {
        console.error("Invalid hostData:", hostData);
        return { success: false, message: "Invalid data provided" };
    }
    try {
        
  await prisma.event.create({
           
            data: {
                title: hostData.title,
                description: hostData.detail,
                date: new Date(hostData.date),  // The provided data is a string but the prisma schema expects DateTime, so we convert it
                startTime:  new Date(`${hostData.date}T${hostData.startTime}:00Z`), // Combine date and time strings into ISO format
                endTime:new Date(`${hostData.date}T${hostData.endTime}:00Z`),  
                location: hostData.place,
                organizerId: userId,
                instruments: hostData.selectedInstruments,
                latitude:  hostData.latitude || 0,
                longitude: hostData.longitude || 0
            },
        });
        
        
        
        return { success: true, message: "Event successfully created" }
       
    } catch (error) {
        console.log("Failed to create event", error);
        return { success: false, message: "An error occurred while creating the event" };
    }
}


export async function applicationCreate (formData: FormData, eventId: string,) :Promise<{ success: boolean; message: string }>{
    const {userId} = await auth()
  
  if (!userId) {
    return { success: false, message: "You must be signed in to apply." };
  }
    
    try {
   
    
        
        await prisma.application.create({
            data:{
               
                eventId:eventId,
                userId:userId,
                message:formData.get("message") as string,
                instrument:formData.get("instrument") as string,
                
            }
        
        })
        revalidatePath(`/join/${eventId}`);
        return { success: true, message: "Application submitted successfully" };

    } catch (error) {
        console.log("Failed to create application", error);
        return { success: false, message: "Application submission failed" };
    }
}

export async function applicationApprove (application:any){
  try {
    await prisma.application.updateMany({
      where:{
          eventId:application.eventId,
          userId:application.userId
      },
      data:{
          status:"ACCEPTED"
      }
  })
  revalidatePath("/")
  
  } catch (error) {
   console.log(error)
  }
 
}

export async function applicationReject (application:any){
  try {
    await prisma.application.updateMany({
      where:{
          eventId:application.eventId,
          userId:application.userId
      },
      data:{
          status:"REJECTED"
      }
  })
  revalidatePath("/")
  
  } catch (error) {
   console.log(error)
  }
 
}



interface EventEditParams {
  eventId: string;
  editData: {
    title: string;
    description: string;
    instruments: string[];
    date:Date;
    startTime: string;
    endTime: string;
    location: string;
    latitude:number | null;
    longitude:number | null;
  };
}


export async function eventEditAction ({ eventId, editData }:EventEditParams):Promise<{
  message: string;
  success: boolean;
}> {

  
  try {


const datePart = editData.date ? editData.date.toISOString().split("T")[0] : null;

    await prisma.event.update({
      where: { id: eventId },
      data: {
        title: editData.title,
        description: editData.description || "",
        date:  new Date(editData.date),
        startTime:  new Date(`${datePart}T${editData.startTime}:00Z`).toISOString(),
        endTime: new Date(`${datePart}T${editData.endTime}:00Z`).toISOString(),
        location: editData.location,
        instruments: editData.instruments,
        updatedAt: new Date(),
        latitude :   editData.latitude ?? 0,  
  longitude:  editData.longitude ?? 0,  
      }

    }
  )
revalidatePath("/")

  console.log("✅ revalidatePath executed");
 
 
    return {message:"Event updated successfully", success:true}
    

  } catch (error) {
    console.error("Error", error)
    return {message:"Failed to update event", success:false}
    
  }
  
}

export async function eventDeleteAction (eventId:string) {
  try {
 await prisma.event.delete({
  where:{id:eventId}
 })

    return {message:"Event deleted successfully", success:true}

  } catch (error) {
    
    return {message:"Failed to delete event", success:false}
  }
  
}

export async function deleteApplication  (eventId:string, userId:string) {
try {
  await prisma.application.deleteMany({
    where:{
      eventId:eventId,
      userId:userId}
  })
  revalidatePath("/")

  return {message:"Application withdrawal successful",success:true}
 
} catch (error) {
  console.log(error)
  return {message:"Application withdrawal failed", success:false}
}

}
