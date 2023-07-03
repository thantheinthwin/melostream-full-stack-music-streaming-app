import React, { useEffect, useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { useStateValue } from '../../context/StateProvider';
import { getAllSongs } from '../../api';
import { actionType } from '../../context/reducer';

import { SongCard } from '../Cards';

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(null);

  const [{allSongs}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allSongs){
      getAllSongs().then((data => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      }))
    }
  }, [allSongs])

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        data =>
          data.name.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter]);

  return (
    <div className="grid justify-center grid-cols-4 gap-3 p-4 col-span-full lg:grid-cols-8">
      {/* Search bar */}
      <div className="relative grid grid-flow-col grid-cols-8 col-span-full lg:col-span-4 lg:col-start-3">
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
          className="flex items-center justify-center text-white rounded-r-lg bg-neutral-900 hover:bg-neutral-800"
          onClick={() => setSongFilter("")}
        >
          <RxCross1 />
        </button>
      </div>

      {/* Main Container */}
      <div className="grid items-center justify-center grid-cols-4 border border-gray-300 rounded-md col-span-full lg:grid-cols-8 max-h-[75vh]">
        <div className="p-2 text-sm text-gray-400 col-span-full">
          You have {filteredSongs ? filteredSongs?.length : allSongs?.length} songs in the database.
        </div>
        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
}

export const SongContainer = ({data}) => {
  return (
    <div className='grid items-center h-full max-h[calc(100%-5rem)] grid-cols-2 gap-4 p-2 overflow-y-scroll scrollbar-hide sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 col-span-full justify-evenly'>
      { data && data.map((song, i) =>
        <SongCard key={song._id} data={song} index={i} />
      ) }
    </div>
  );
};



export default DashboardSongs