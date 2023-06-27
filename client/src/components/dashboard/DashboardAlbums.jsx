import React, { useEffect, useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { useStateValue } from '../../context/StateProvider';
import { getAllAlbums } from '../../api';
import { actionType } from '../../context/reducer';

import { AlbumCard } from '../Cards';

const DashboardAlbums = () => {
  const [albumFilter, setAlbumFilter] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState(null);

  const [{allAlbums}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allAlbums){
      getAllAlbums().then((data => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        })
      }))
    }
  }, [allAlbums])

  useEffect(() => {
    if (albumFilter.length > 0) {
      const filtered = allAlbums.filter(
        data =>
          data.name.toLowerCase().includes(albumFilter)
      );
      setFilteredAlbums(filtered);
    } else {
      setFilteredAlbums(null);
    }
  }, [albumFilter]);
  
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
            value={albumFilter}
            onChange={(e) => setAlbumFilter(e.target.value.toLowerCase())}
            placeholder="Search for album"
            className="pl-10 bg-transparent border rounded-l-lg border-neutral-800 focus:border-neutral-800 focus:ring-0"
          ></input>
        </div>
        <button
          className="flex items-center justify-center text-white rounded-r-lg bg-neutral-900 hover:bg-neutral-800"
          onClick={() => setAlbumFilter("")}
        >
          <RxCross1 />
        </button>
      </div>

      {/* Main Container */}
      <div className="grid items-center justify-center grid-cols-4 border border-gray-300 rounded-md col-span-full lg:grid-cols-8 max-h-[60vh]">
        <div className="p-2 text-sm text-gray-400 col-span-full">
          You have {filteredAlbums ? filteredAlbums?.length : allAlbums?.length} albums in the database.
        </div>
        <AlbumContainer data={filteredAlbums ? filteredAlbums : allAlbums}/>
      </div>
    </div>
  )
}

export const AlbumContainer = ({data}) => {
  return (
    <div className='grid items-center h-full grid-cols-2 gap-4 p-2 overflow-y-scroll sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 col-span-full justify-evenly'>
      { data && data.map((album, i) =>
        <AlbumCard key={album._id} data={album} index={i} />
      ) }
    </div>
  );
};

export default DashboardAlbums