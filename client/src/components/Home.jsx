import React, { useEffect } from 'react'

import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer';

import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../../api';

const Home = () => {
  const [{allUsers, allSongs, allArtists, allAlbums}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allUsers){
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }

    if(!allArtists){
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        })
      })
    }

    if(!allAlbums){
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        })
      })
    }

    if(!allSongs){
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }
  },[])

  return (
    <div>
      Home
    </div>
  )
}

export default Home