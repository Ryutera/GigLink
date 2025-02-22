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
  }): Promise<{ success: boolean; message: string }>{

   
    
    const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }



    if (!hostData || typeof hostData !== 'object') {
        console.error("Invalid hostData:", hostData);
        return { success: false, message: "無効なデータが提供されました" };
    }
    try {
        
  await prisma.event.create({
           
            data: {
                title: hostData.title,
                description: hostData.detail,
                date: new Date(hostData.date),  //渡されたデータはstringだけどprismaschemaの値はDateTimeなので統一するためにこう書く
                startTime:  new Date(`${hostData.date}T${hostData.startTime}:00Z`),//yyyy//mm//ddの形にするためにhost.dataをyyyyに持ってくる
                endTime:new Date(`${hostData.date}T${hostData.endTime}:00Z`),  
                location: hostData.place,
                organizerId: userId,
                instruments: hostData.selectedInstruments,
                latitude: 0.0, // 仮の値
                longitude: 0.0, // 仮の値
            },
        });
        
        revalidatePath("/host");
        
        return { success: true, message: "イベントが作成されました" }
       
    } catch (error) {
        console.log("イベントの作成ができません", error);
        return { success: false, message: "イベントの作成中にエラーが発生しました" };
    }
}


export async function applicationCreate (formData: FormData, eventId: string,) :Promise<{ success: boolean; message: string }>{
    const {userId} = await auth()
  
  if (!userId) {
    throw new Error("Unauthorized");
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
        return { success: true, message: "参加応募に成功しました" };

    } catch (error) {
        console.log("イベントの作成ができません", error);
        return { success: false, message: "参加応募に失敗しました" };
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
    date?: any;// `undefined` の可能性があるので `?` をつける
    startTime: string;
    endTime: string;
    location: string;
  };
}


export async function eventEditAction ({ eventId, editData }:EventEditParams):Promise<{
  message: string;
  success: boolean;
}> {

 console.log(editData)
 console.log(eventId)
 console.log("editData.date:", editData.date);
 console.log("Converted date:", new Date(editData.date));



  try {
    console.log("Start Time String:", `${editData.date}T${editData.startTime}:00`);
console.log("End Time String:", `${editData.date}T${editData.endTime}:00`);
console.log("Parsed Start Time:", new Date(`${editData.date}T${editData.startTime}:00`));
console.log("Parsed End Time:", new Date(`${editData.date}T${editData.endTime}:00`));

    console.log("try中")

    const datePart = editData.date.split("T")[0];
    await prisma.event.update({
      where: { id: eventId },
      data: {
        title: editData.title,
        description: editData.description,
        date:  new Date(editData.date),
        startTime:  new Date(`${datePart}T${editData.startTime}:00Z`).toISOString(),
        endTime: new Date(`${datePart}T${editData.endTime}:00Z`).toISOString(),
        location: editData.location,
        instruments: editData.instruments,
        updatedAt: new Date(),
      }

    })
    revalidatePath("/")
    return {message:"イベント内容を編集しました", success:true}
    

  } catch (error) {
    console.error("エラー:", error)
    return {message:"イベント内容の編集ができませんでした", success:false}
    
  }
}

export async function eventDeleteAction (formData:FormData) {
  return {message:"aaa", success:false}
}