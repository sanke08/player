import PulseLoader from '@/components/PulseLoader'
import SearchInput from '@/components/SearchInput'
import SongCard from '@/components/SongCard'
import { File } from '@/lib/models/file'
import { Loader2 } from 'lucide-react'
import { cookies } from 'next/headers'
import React, { Suspense } from 'react'

const page = async ({ searchParams }: { searchParams: any }) => {
    const { name } = searchParams
    const keyward = name?.slice("%20") || " "
    const k = keyward.split(" ")
    const reg = new RegExp(k.join("|"), "i")
    const songs = await File.find({
        $or: [
            { title: { $regex: reg } },
            { author: { $regex: reg } },
        ]
    })

    const token = cookies().get("music_auth_token") || ""

    return (
        <Suspense fallback={
            <div className=' w-full flex justify-center mt-10'>
                <div className=' w-[5rem] h-[5rem] border-[5px] rounded-full border-neutral-100 border-t-[5px] border-t-green-600 border-b-green-600 animate-spin' />
            </div>
        }>
            <div className='p-5 pb-5 w-full'>
                <SearchInput />
                {
                    songs.length === 0 &&
                    <div className=' mt-10 w-full flex justify-center'>
                        No match found
                    </div>
                }
                <Suspense fallback={<PulseLoader />}>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 w-full gap-5 bg-neutral-900 rounded-xl pt-5'>
                        {
                            songs && songs.map((song) => (
                                <SongCard key={song._id} song={song} />
                            ))
                        }
                    </div>
                </Suspense>

            </div >
        </Suspense>
    )
}

export default page