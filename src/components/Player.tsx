"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlayerContent from './PlayerContent'


export default function Player() {
    const dispatch = useDispatch()
    const { song } = useSelector((state: any) => state.player)
    const { songs } = useSelector((state: any) => state.playerList)
    const [currsong, ssetCurrSong] = useState({})

    useEffect(() => {
        ssetCurrSong(song)
    }, [song])
    useEffect(() => {
        if (songs.length > 0) {
            dispatch({ type: "PLAYER_SONG_SUCCESS", payload: songs[songs.length - 1] })
        }
    }, [dispatch, songs])

    if (!song?._id) return
    // @ts-ignore
    return (
        <div>
            <PlayerContent key={currsong?.song} songUrl={currsong?.song} song={currsong} />
        </div>
    )
}


