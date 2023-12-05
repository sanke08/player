import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { toggleModelReducer } from "./reducers/toggleModels"
import { userReducer } from "./reducers/user.reducer"
import { allSongs, playerList, playerSong } from "./reducers/song.reducer"

const reducer = combineReducers({
    toggle: toggleModelReducer,
    user: userReducer,
    player:playerSong,
    playerList:playerList,
    allSongs:allSongs
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store