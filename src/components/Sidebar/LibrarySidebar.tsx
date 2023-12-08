import React, { Suspense } from 'react'
import LibraryHeader from './LibraryHeader'
import LibrarySongCard from './LibrarySongCard'
import { getSongsByUserId } from '@/lib/services/services'


export default async function Library({ userId }: any) {

    // @ts-ignore
    const songs = await getSongsByUserId(userId)

    return (
        <Suspense fallback={<p>Loading......</p>}>
            <div className=' bg-neutral-900 h-full rounded-xl'>
                <div className=' h-full w-full rounded-xl p-2 flex flex-col gap-2 bg-neutral-900 pb-32'>
                    <LibraryHeader userId={userId} />
                    {
                        // @ts-ignore
                        songs?.length < 1 &&
                        <div className=' w-fit mx-auto mt-5 text-neutral-400'>
                            No song Upload Yet
                        </div>
                    }
                    {
                        songs &&
                        <div className=' gap-2 mt-1 grid grid-cols-1 w-full'>
                            {
                                songs && songs.map((song: any) => (
                                    <LibrarySongCard key={song._id} song={song} />
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </Suspense>
    )
}
