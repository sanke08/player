import React, { Suspense } from 'react'
import LibraryHeader from './LibraryHeader'
import LibrarySongCard from './LibrarySongCard'
import { getSongsByUserId } from '@/lib/services/services'
import LibraryWrapper from './LibraryWrapper'

export default async function Library({ user }: { user: { email: string | undefined | null, name: string | undefined | null, _id?: string | undefined | null } | null | undefined }) {

    // @ts-ignore
    const songs = await getSongsByUserId(user._id)
    // if (!songs) return

    return (
        <div className=' bg-neutral-900 h-full rounded-xl'>
            <Suspense fallback={<p>Loading......</p>}>
                <div className=' h-full w-full rounded-xl p-2 flex flex-col gap-2 bg-neutral-900 pb-32'>
                    <LibraryHeader />
                    {/*  @ts-ignore */}
                    <LibraryWrapper user={user}>
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
                    </LibraryWrapper>
                </div>
            </Suspense>
        </div>
    )
}
