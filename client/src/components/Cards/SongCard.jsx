import React, { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { BsTrash } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';

import { removeSong } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { deleteFileObject } from '../supportFunctions';

const SongCard = ({data, index}) => {
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);
  const [{allSongs, isSongPlaying, songIndex, showMusicPlayer}, dispatch] = useStateValue();
  const [isDashboardBranch, setDashboardBranch] = useState('');
  const [isArtist, setIsArtist] = useState('');

  const deleteSong = (songId, songURL, imageURL) => {
    deleteFileObject(songURL)
    .then(()=>{
      deleteFileObject(imageURL)
      .then(()=>{
        removeSong(songId)
        .then((res) => {
          if (res) {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.data
            })
          }
        })
        .catch((error)=>console.error(error))
      })
      .catch((error)=>console.error(error))
    })
    .catch((error)=>console.error(error))
  }

  const addToContext = () => {
    if(!isSongPlaying) {
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      });
    } 

    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index
      })
    }

    if(!showMusicPlayer) {
      dispatch({
        type: actionType.SET_SHOW_MUSICPLAYER,
        showMusicPlayer: true,
      })
    }
  }

  useEffect(()=>{
    setDashboardBranch(window.location.pathname.split("/").some(path => path === "dashboard"));
  }, [])

  useEffect(() => {
    setIsArtist(window.location.pathname.split('/').some(path => path === 'mysongs'))
  }, [])
  
  return (
    <AnimatePresence>
      <div key={index} className="relative flex flex-col items-center col-span-1 gap-2 rounded-md cursor-pointer bg-neutral-900" onClick={addToContext}>
        <div className='flex flex-col gap-2 p-2'> 
          <div className="relative w-full overflow-hidden rounded-md">
            <motion.img
              src={data.imageURL}
              alt="thumbnail"
              className="object-cover w-40 h-40 rounded-md"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <p className="text-base font-medium text-center">
            {data.name.length > 15 ? `${data.name.slice(0, 15)}...` : data.name}
            <span className="block text-sm font-light">
              {data.artist.length > 15
                ? `${data.artist.slice(0, 15)}...`
                : data.artist}
            </span>
          </p>
          { (isArtist || isDashboardBranch) &&
          <div className="relative flex items-center justify-center w-full">
            <motion.i
              whileHover={{ scale: 1.15 }}
              className="p-1 text-xl text-red-500 rounded-md hover:bg-neutral-800"
              onClick={() => {
                setDeleteConfirm(!isDeleteConfirm);
              }}
            >
              <BsTrash />
            </motion.i>
          </div>
          }
          {/* {
            (!isArtist && !isDashboardBranch) &&
            <div className='flex items-center justify-center w-full'>
              <i className='p-2 transition-all duration-200 ease-in-out rounded-md hover:bg-opacity-25 hover:bg-white'><FaPlay/></i>
            </div>
          } */}
        </div>
        <AnimatePresence>
          {isDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 1 }}
                className="absolute z-10 grid items-center justify-center h-full grid-cols-2 grid-rows-2 px-4 pt-2 rounded-lg shadow-md bg-neutral-800"
              >
                <p className="col-span-2 row-span-1 text-center">
                  Are you sure you want to delete?
                </p>
                <div className='grid grid-flow-row col-span-2 grid-rows-2 row-span-1 gap-2'>
                  <span
                    className="row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-green-500 rounded-lg hover:bg-green-600 hover:shadow-md"
                    onClick={() => {
                      deleteSong(data._id, data.songURL, data.imageURL);
                    }}
                  >
                    Yes
                  </span>
                  <span
                    className="row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-red-500 rounded-lg hover:bg-red-600 hover:shadow-md"
                    onClick={() => setDeleteConfirm(false)}
                  >
                    No
                  </span>
                </div>
              
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}

export default SongCard;