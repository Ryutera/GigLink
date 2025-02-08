"use server";


import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function ProfileUpdate(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const instruments = formData.getAll("instruments") as string[];
  const bio = formData.get("bio") as string;

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
                date: new Date(hostData.date),  
                startTime:  new Date(`${hostData.date}T${hostData.startTime}:00Z`),
                endTime:new Date(`${hostData.date}T${hostData.endTime}:00Z`),  
                location: hostData.place,
                organizerId: userId,
                instruments: hostData.selectedInstruments,
                latitude: 0.0, // 仮の値
                longitude: 0.0, // 仮の値
            },
        });
        
        revalidatePath("/host");
        return { success: true, message: "イベントが作成されました" };
    } catch (error) {
        console.log("イベントの作成ができません", error);
        return { success: false, message: "イベントの作成中にエラーが発生しました" };
    }
}
