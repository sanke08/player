"use client"
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import LibrarySongCard from './LibrarySongCard'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const LibraryWrapper = ({ children }: { children: React.ReactNode, }) => {
    const searchParams = useSearchParams()
    const [likedSongs, setLikedSongs] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        const get = async () => {
            // @ts-ignore
            const { data } = await axios.get("/api/file/get-liked", { headers: { "Authorization": session?.user?._id } })
            setLikedSongs(data?.songs)
        }
        get()
    }, [session])
    return (
        <div className=' overflow-y-auto'>
            {
                searchParams.get("liked") ?
                    <div className=' gap-2 mt-1 grid grid-cols-1 w-full'>
                        <Suspense fallback={<p>Loading...</p>}>

                            {
                                likedSongs && likedSongs.map((song: any) => (
                                    <>
                                        <LibrarySongCard key={song._id} song={song} />
                                    </>
                                ))
                            }
                            {
                                likedSongs?.length === 0 &&
                                <div className=' w-full text-center text-neutral-600'>
                                    No Like Found
                                </div>
                            }
                        </Suspense>
                    </div>
                    :
                    <div>
                        {children}
                    </div>
            }
        </div>
    )
}

export default LibraryWrapper