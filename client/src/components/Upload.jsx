import React, { useEffect, useState } from 'react'

import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer';

import { getAllSongs } from '../api';
import { SongCard } from './Cards';
import { getAuth } from '@firebase/auth';
import { app } from '../config/firebase.config';

const Upload = () => {
  const [{user, allSongs}, dispatch] = useStateValue();
  var popularGenres = [
    "Pop",
    "Rock",
    "Hip-hop",
    "R&B",
    "Electronic",
    "Country",
    "Jazz",
    "Classical",
    "Alternative",
    "Indie"
  ];
  
  useEffect(()=>{
    if(!user){
      dispatch({
        type: actionType.SET_USER,
        user: getAuth(app).currentUser
      })
    }
    
    if(!allSongs){
      getAllSongs()
      .then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }
  },[allSongs])
  
  return (
    <div className='grid w-full grid-flow-row grid-cols-8 gap-2 p-2'>
      {(allSongs && user) && <div className='p-2 text-sm font-semibold text-gray-400 border rounded-md col-span-full'>
        You have uploaded {allSongs.filter(song => song.artist === user.user?.name).length} songs.
      </div>}
      <form className='grid grid-cols-1 gap-4 p-2 rounded-md col-span-full bg-secondary'>
        <p className='font-medium uppercase col-span-full'>Upload</p>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md peer bg-secondary caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
          ></input>
          <label
            htmlFor="password"
            className="absolute p-1 text-sm transition-all -top-4 left-2 bg-secondary peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-secondary peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
          >
            Title
          </label>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md peer bg-secondary caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
          ></input>
          <label
            htmlFor="password"
            className="absolute p-1 text-sm transition-all -top-4 left-2 bg-secondary peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-secondary peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
          >
            Album
          </label>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md peer bg-secondary caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
          ></input>
          <label
            htmlFor="password"
            className="absolute p-1 text-sm transition-all -top-4 left-2 bg-secondary peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-secondary peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
          >
            Language
          </label>
        </div>
        <select defaultValue={'Genre'} className='text-sm border border-gray-300 rounded-md bg-secondary'>
          <option>Genre</option>
          {popularGenres.map((genre)=>(<option>{genre}</option>))}
        </select>
        
      </form>
    </div>
  )
}

export const SongContainer = ({song, artist}) => {
  return (
    <div className='grid items-center grid-cols-4 col-span-3 gap-4 p-4 overflow-y-scroll border rounded-lg h-[44rem]'>
      { song && song.filter(song => song.artist === artist).map((song, i) =>
        <SongCard key={song._id} data={song} index={i} />
      ) }
    </div>
  );
};

export default Upload