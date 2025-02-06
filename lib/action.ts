'use server'

import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function ProfileUpdate(formData: FormData):Promise<void> {
    const { userId } = auth()
   
    if (!userId) {
        throw new Error('Unauthorized')
    }

    const instruments = formData.getAll('instruments') as string[]
    const bio = formData.get('bio') as string

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                instruments: instruments,
                bio: bio
            }
        })
        revalidatePath("/profile")
    } catch (error) {
        console.error('Error updating profile:', error)
        throw new Error('An error occurred while updating the profile')
    }
}