export const actionType = {
    SET_USER : "SET_USER",
    SET_ALL_USERS : "SET_ALL_USERS",
    SET_ALL_ARTISTS : "SET_ALL_ARTISTS",
    SET_ALL_ALBUMS : "SET_ALL_ALBUMS",
    SET_ALL_SONGS : "SET_ALL_SONGS",
    SET_ISSONG_PLAYING : 'SET_ISSONG_PLAYING',
    SET_SHOW_MUSICPLAYER : 'SET_SHOW_MUSICPLAYER',
    SET_SONG_INDEX : 'SET_SONG_INDEX'
};

const reducer = (state, action) => {
    // console.log(action);

    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user : action.user,
            }
        case actionType.SET_ALL_USERS:
            return {
                ...state,
                allUsers : action.allUsers,
            }
        case actionType.SET_ALL_ARTISTS:
            return {
                ...state,
                allArtists : action.allArtists,
            }
        case actionType.SET_ALL_ALBUMS:
            return {
              ...state,
              allAlbums: action.allAlbums,
            }
        case actionType.SET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.allSongs,
            }
        case actionType.SET_ISSONG_PLAYING:
            return {
                ...state,
                isSongPlaying: action.isSongPlaying,
            }
        case actionType.SET_SHOW_MUSICPLAYER: 
            return {
                ...state,
                showMusicPlayer: action.showMusicPlayer,
            }
        case actionType.SET_SONG_INDEX:
            return {
                ...state,
                songIndex: action.songIndex
            }
        default:
            return state;
    }
};

export default reducer;