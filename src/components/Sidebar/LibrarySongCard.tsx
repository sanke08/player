"use client"
import { Heart, Loader2, Play } from 'lucide-react'
import React, { useEffect, useState } from 'react'
// import img from "../../../public/500x500.jpg"
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { loadUser } from '@/redux/actions/user.actions'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
interface Props {
    song: {
        _id: string,
        title: string,
        author: string,
        image: string
        imagepath: string,
        song: string
        songpath: string,
        user: string,
        __v: number
    }
}


const LibrarySongCard: React.FC<Props> = ({ song }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { data: session } = useSession()
    const handlePlay = () => {
        // @ts-ignore
        if (session?.user?._id) {
            dispatch({ type: "PLAYER_LIST", payload: song })
        } else {
            return toast.error("Please Login")
        }
    }

    return (
        <div onClick={handlePlay} className=' group bg-neutral-400/5 rounded-md p-2 w-full flex items-center relative cursor-pointer gap-2 hover:bg-neutral-400/10 transition overflow-hidden'>
            <div className=' w-12 h-12 relative rounded-lg overflow-hidden'>
                <Image src={song.image} alt='img' className='' fill />
            </div>
            <div>
                <p>
                    {song?.title}
                </p>
                <p className=' opacity-50 text-xs'>
                    by {song?.author}
                </p>
            </div>
            <div className=' absolute right-5 flex gap-1 '>
                <Play size={20} className='fill-green-500 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 sm:translate-x-10 group-hover:translate-x-0' color='' />
            </div>
        </div>
    )
}

export default LibrarySongCard