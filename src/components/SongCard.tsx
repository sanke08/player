"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HeartIcon, PlayCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { loadUser } from '@/redux/actions/user.actions'
import { useSession } from 'next-auth/react'
import img from "../../public/20210712-1_1080p.mp4 25-12-2022 22_51_59.png"
interface Props {
    song: {
        _id: string,
        title: string,
        author: string,
        image: string
        song: string
        user: string,
        __v: number
    }
}
const SongCard: React.FC<Props> = ({ song }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { data: session } = useSession()
    const [like, setLike] = useState(false)
    const handleLike = async () => {
        // @ts-ignore
        if (session?.user?._id) {
            setLike(!like)
            // @ts-ignore
            await axios.put("/api/file/handle-like", { songId: song._id }, { headers: { "Authorization": session.user._id } })
            router.refresh()
        }
    }
    const handlePlay = () => {
        // @ts-ignore
        if (!session?.user?._id) {
            return toast.error("Please Login")
        }
        dispatch({ type: "PLAYER_LIST", payload: song })
    }
    useEffect(() => {
        // @ts-ignore
        const liked = session?.user?.liked.find((value: any) => value === song._id)
        // const Liked = user?.liked?
        setLike(liked)
    }, [song._id, session])
    return (
        <div className='group relative flex flex-col items-center justify-center rounded-xl overflow-hidden transition gap-x-4 p-2 cursor-pointer bg-neutral-400/5 hover:bg-neutral-400/10  '>
            <div onClick={handlePlay} className=' aspect-square rounded-lg overflow-hidden w-full h-full relative bg-slate-700'>
                {
                    song.image ?
                        <Image src={song.image} alt='image' fill className=' object-cover' />
                        :
                        <Image alt='' src={img} fill className="object-cover" />
                }
            </div>
            <div className=' w-full my-5 mt-5 flex justify-between'>
                <div onClick={handlePlay} className=''>
                    <p className=' text-left text-sm sm:text-xl'>
                        {song.title}
                    </p>
                    <p className='  text-left opacity-50 ' style={{ font: "100 0.6rem normal" }}>
                        by {song.author}
                    </p>
                </div>
                {
                    like ?
                        <HeartIcon color='' onClick={handleLike} className={twMerge(' sm:-translate-y-5 right-4 absolute sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500  ', like && "fill-green-500")} />
                        :
                        <HeartIcon onClick={handleLike} className={twMerge(' sm:-translate-y-5 right-4 absolute sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500  ', like && "fill-green-500")} />
                }
            </div>
            <div onClick={handlePlay} className='absolute w-7 h-7 bg-green-500 rounded-full flex justify-center items-center opacity-0 drop-shadow-md translate translate-y-1/3 overflow-hidden group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110  right-4  bottom-24 transition-all duration-500 '>
                <PlayCircle color='black' />
            </div>
        </div>
    )
}

export default SongCard