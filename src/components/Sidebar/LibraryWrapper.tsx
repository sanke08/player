"use client"
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LibrarySongCard from './LibrarySongCard'
import axios from 'axios'

const LibraryWrapper = ({ children, token }: { children: React.ReactNode, token: { name: string, value: any } | null | undefined }) => {
    const searchParams = useSearchParams()
    const { user } = useSelector((state: any) => state.user)
    const [likedSongs, setLikedSongs] = useState([])


    useEffect(() => {
        setLikedSongs(user?.likedSongs)
        const get = async () => {
            const { data } = await axios.get("/api/file/get-liked", { headers: { "Authorization": token?.value } })
            setLikedSongs(data?.songs)
        }
        get()
    }, [user, token])
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