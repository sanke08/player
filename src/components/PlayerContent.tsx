import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-ignore
import useSound from "use-sound"
import {  PauseCircle, PlayCircle, StepBack, StepForward } from 'lucide-react'












export default function PlayerContent({ songUrl, song }: { songUrl: string, song: any }) {

    const dispatch = useDispatch()
    const { songs } = useSelector((state: any) => state.playerList)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)

    const forward = async () => {
        if (songs?.length == 0) {
            return
        }
        const index = await songs.findIndex((item: any) => item._id === song?._id);
        if (index < songs?.length - 1) {
            const forwordSong = await songs[index + 1]
            if (forwordSong) {
                await dispatch({ type: "PLAYER_SONG_SUCCESS", payload: forwordSong })
            }
        }

    }
    const backward = async () => {
        if (songs?.length < 1) {
            return
        }
        const index = await songs.findIndex((item: any) => item._id === song._id);
        if (index > 0) {
            const backSong = await songs[index - 1]
            dispatch({ type: "PLAYER_SONG_SUCCESS", payload: backSong })
        }
    }
    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => setIsPlaying(false),
            onpause: () => setIsPlaying(false),
            format: ["mp3"]
        }
    )
    const handlePlay = () => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
        setIsPlaying(!isPlaying)
    }
    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload()
        }
    }, [sound, song])

    return (
        <div className='fixed bottom-0 left-0 bg-neutral-800 w-full rounded-lg h-18 py-3 object-contain overflow-hidden'>
            <div className='w-full flex justify-between items-center px-5 '>
                <div className=' flex gap-4 items-center w-44'>
                    <div className=' relative w-20 object-contain aspect-square'>
                        <Image src={song?.image} alt='' fill className='' />
                    </div>
                    <div className=' w-full'>
                        {song?.title}
                        <p className=' flex text-xs opacity-40'>
                            by {song?.author}
                        </p>
                    </div>
                </div>
                <div className=' h-full flex items-center sm:gap-5 gap-2'>
                    <StepBack size={"full"} onClick={backward} className=' w-7 h-7 cursor-pointer' />
                    <button onClick={handlePlay} className=' cursor-pointer w-7 h-7'>
                        {
                            isPlaying ?
                                <PauseCircle size={"full"} />
                                :
                                <PlayCircle size={"full"} />
                        }
                    </button>
                    <StepForward size={"full"} onClick={forward} className=' w-7 h-7 cursor-pointer' />
                </div>
               
            </div>
        </div>
    )
}
