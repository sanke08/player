import Button from '@/components/Button'
import PulseLoader from '@/components/PulseLoader'
import SongCard from '@/components/SongCard'
import { getAuthSession } from '@/lib/auth'
import { File } from '@/lib/models/file'
import { User } from '@/lib/models/user'
import { Metadata } from 'next'
import { signIn } from 'next-auth/react'
import React, { Suspense } from 'react'


export const metadata: Metadata = {
    title: 'Liked',
    description: 'Generated by SG',
}


const page = async () => {
    const session = await getAuthSession()
    if (!session?.user) {
        return (
            <div className=' w-max mx-auto text-neutral-400 mt-10'>
                Please Login
            </div>
        )
    }
    // @ts-ignore
    const user = await User.findById(session?.user?._id).populate({ path: "liked" })
    const songs = await File.find({ _id: { $in: user.liked } })

    return (
        <Suspense fallback={<PulseLoader />}>
            <div className='  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[400px]:grid-cols-3 w-full gap-5 px-3 sm:px-10 bg-neutral-900 rounded-xl pt-5'>
                {
                    songs && songs.map(async (song: any) => {
                        const isliked = user.liked.find((item: any) => item._id.toString() === song._id.toString());
                        return <SongCard key={song._id} song={song} isLiked={!!isliked} userId={user._id} />
                    })
                }
            </div>
        </Suspense>
    )
}

export default page