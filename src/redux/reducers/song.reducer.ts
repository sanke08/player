import { GET_ALL_SONGS } from "../constance"

export const playerSong = (state = {}, action: any) => {
    switch (action.type) {
        case "PLAYER_SONG_SUCCESS":
            return {
                song: action.payload
            }
        default:
            return { ...state }
    }
}

export const playerList = (state = { songs: [] }, action: any) => {
    const newSong = action.payload
    switch (action.type) {
        case "PLAYER_LIST":
            const filtered = state.songs.filter(song =>
                // @ts-ignore
                song._id !== newSong._id
            )
            return {
                songs: [...filtered, newSong]
            }
        default:
            return state
    }
}

export const allSongs = (state = { songs: [] }, action: any) => {
    switch (action.type) {
        case GET_ALL_SONGS:
            return {
                ...state,
                songs: action.payload
            }

        default:
            return { ...state }
    }
}