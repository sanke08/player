"use client"
import { Heart, Play } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import img from "../../../public/500x500.jpg"
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { loadUser } from '@/redux/actions/user.actions'
import { useSession } from 'next-auth/react'
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
    const [like, setLike] = useState(false)
    const handlePlay = () => {
        dispatch({ type: "PLAYER_LIST", payload: song })
    }
    const handleLike = async () => {
        if (session?.user?._id) {
            setLike(!like)
            await axios.put("/api/file/handle-like", { songId: song._id })
            router.refresh()
        }
    }
    useEffect(() => {
        const Liked = session?.user?.liked?.find((value: any) => value === song._id)
        setLike(Liked)
    }, [song._id, session?.user?.liked])

    return (
        <div className=' group bg-neutral-400/5 rounded-md p-2 w-full flex items-center relative cursor-pointer gap-2 hover:bg-neutral-400/10 transition overflow-hidden'>
            <div onClick={handlePlay} className=' w-12 h-12 relative rounded-lg overflow-hidden'>
                <Image src={img} alt='img' className='' />
            </div>
            <div onClick={handlePlay}>
                <p>
                    {song?.title}
                </p>
                <p className=' opacity-50 text-xs'>
                    by {song?.author}
                </p>
            </div>
            <div className=' absolute right-5 flex gap-1 '>
                {
                    like ?
                        <Heart onClick={handleLike} size={20} className=' fill-green-500 delay-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 sm:translate-x-10 group-hover:translate-x-0' color='' />
                        :
                        <Heart onClick={handleLike} size={20} className='sm:opacity-0 delay-100 group-hover:opacity-100 transition-all duration-300 sm:translate-x-10 group-hover:translate-x-0' />
                }
                <Play onClick={handlePlay} size={20} className='fill-green-500 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 sm:translate-x-10 group-hover:translate-x-0' color='' />
            </div>
        </div>
    )
}

export default LibrarySongCard