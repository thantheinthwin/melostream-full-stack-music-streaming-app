import React, { useState, useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { SongContainer } from './Home';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { AiOutlineSearch } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

const Favorite = () => {
  const [{user, allSongs}, dispatch] = useStateValue();
  const [songFilter, setSongFilter] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);

  useEffect(() => {
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
    setLikedSongs(allSongs.filter(song => user?.user?.likedSongs.includes(song._id)))
  },[])

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = likedSongs.filter(
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

  // console.log(user);
  // console.log(allSongs.filter(song => user?.user?.likedSongs.includes(song._id)));

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
      <SongContainer data={filteredSongs ? filteredSongs : likedSongs}/>
    </div>
  )
}

export default Favorite