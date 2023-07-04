import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { SongCard } from './Cards';

const Home = () => {
  const [{allUsers, allSongs, allArtists, allAlbums}, dispatch] = useStateValue();
  const [songFilter, setSongFilter] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(null);

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

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        data =>
          data.name.toLowerCase().includes(songFilter) ||
          data.album.toLowerCase().includes(songFilter) ||
          data.artist.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter]);

  return (
    <div className='flex flex-col items-center w-full h-full p-3'>
      {/* Search bar */}
      <div className="relative grid w-full grid-flow-col lg:w-1/3">
        <div className="relative grid grid-flow-col col-span-7">
          <div className="absolute items-center text-lg text-gray-500 pointer-events-none left-4 top-3">
            <AiOutlineSearch />
          </div>
          <input
            type="text"
            value={songFilter}
            onChange={(e) => setSongFilter(e.target.value.toLowerCase())}
            placeholder="Search for songs"
            className="pl-10 bg-transparent border rounded-l-lg border-neutral-800 focus:border-neutral-800 focus:ring-0"
          ></input>
        </div>
        <button
          className="flex items-center justify-center px-2 text-white rounded-r-lg bg-neutral-900 hover:bg-neutral-800"
          onClick={() => setSongFilter("")}
        >
          <RxCross1 />
        </button>
      </div>
      <SongContainer data={filteredSongs ? filteredSongs : allSongs}/>
    </div>
  )
}

const SongContainer = ({data}) => {
  return (
    <div className='grid grid-cols-2 w-full h-fit max-h-[calc(100%-10rem)] gap-2 overflow-y-scroll p-2 lg:grid-cols-6 xl:grid-cols-8'>
      {data && data.map((song, i) => <SongCard key={song._id} data={song} index={i}/>)}
    </div>
  )
}

export default Home