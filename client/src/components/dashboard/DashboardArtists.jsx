import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { AiOutlineSearch } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { useStateValue } from '../../context/StateProvider';
import { getAllArtists } from '../../api';
import { actionType } from '../../context/reducer';

import { ArtistCard } from '../Cards';

const DashboardArtists = () => {
  const [artistFilter, setArtistFilter] = useState("");
  const [filteredArtists, setFilteredArtists] = useState(null);

  const [{allArtists}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allArtists){
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        })
      })
    }
  }, [allArtists])

  useEffect(() => {
    if (artistFilter.length > 0) {
      const filtered = allArtists.filter(
        data =>
          data.name.toLowerCase().includes(artistFilter)
      );
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists(null);
    }
  }, [artistFilter]);
  
  return (
    <div className='grid justify-center grid-cols-4 gap-3 p-4 col-span-full lg:grid-cols-8'>
      {/* Search bar */}
      <div className="relative grid grid-flow-col grid-cols-8 col-span-full lg:col-span-4 lg:col-start-3">
        <div className="relative grid grid-flow-col col-span-7">
          <div className="absolute items-center text-lg text-gray-500 pointer-events-none left-4 top-3">
            <AiOutlineSearch />
          </div>
          <input
            type="text"
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value.toLowerCase())}
            placeholder="Search for artist"
            className="pl-10 bg-transparent border rounded-l-lg border-neutral-800 focus:border-neutral-800 focus:ring-0"
          ></input>
        </div>
        <button
          className="flex items-center justify-center text-white rounded-r-lg bg-neutral-900 hover:bg-neutral-800"
          onClick={() => setArtistFilter("")}
        >
          <RxCross1 />
        </button>
      </div>

      {/* Main Container */}
      <div className="grid items-center justify-center grid-cols-4 border border-gray-300 rounded-md col-span-full lg:grid-cols-8 max-h-[60vh]">
        <div className="p-2 text-sm text-gray-400 col-span-full">
          You have {filteredArtists ? filteredArtists?.length : allArtists?.length} artists in the database.
        </div>
        <ArtistContainer data={filteredArtists ? filteredArtists : allArtists} />
      </div>
    </div>
  )
}

export const ArtistContainer = ({data}) => {
  return (
    <div className='grid items-center h-full grid-cols-1 gap-4 p-2 overflow-y-scroll md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 col-span-full justify-evenly'>
      { data && data.map((artist, i) =>
        <ArtistCard key={artist._id} data={artist} index={i} />
      ) }
    </div>
  );
};

export default DashboardArtists