import PulseLoader from '@/components/PulseLoader'
import SongCard from '@/components/SongCard'
import { getAuthSession } from '@/lib/auth'
import { File } from '@/lib/models/file'
import { User } from '@/lib/models/user'
import React, { Suspense } from 'react'

const page = async () => {
    const session = await getAuthSession()
    // @ts-ignore
    const user = await User.findById(session?.user?._id).populate({ path: "liked" })
    const songs = await File.find({ _id: { $in: user.liked } })
 
    return (
        <Suspense fallback={<PulseLoader />}>
            <div className='  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[400px]:grid-cols-3 w-full gap-5 px-3 sm:px-10 bg-neutral-900 rounded-xl pt-5'>
                {
                    songs && songs.map((song:any) => (
                        <SongCard key={song._id} song={song} />
                    ))
                }
            </div>
        </Suspense>
    )
}

export default page