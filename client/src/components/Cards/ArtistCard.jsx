import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useStateValue } from '../../context/StateProvider'
import { removeArtist } from '../../api';
import { actionType } from '../../context/reducer';

import { BsTrash } from 'react-icons/bs';

const ArtistCard = ({data, index}) => {
    const [isDeleteConfirm, setDeleteConfirm] = useState(false);
    const[{allArtists}, dispatch] = useStateValue();

    const deleteArtist = (artistId) => {
        removeArtist(artistId).then((res) => {
          if (res) {
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.data,
            });
          }
        });
    }
    
    return (
      <AnimatePresence>
        <motion.div className="relative grid items-center grid-flow-col grid-cols-5 col-span-1 gap-2 p-2 rounded-md shadow-md cursor-pointer bg-neutral-900 lg:col-span-2">
          <div className="relative w-full col-span-2 overflow-hidden rounded-md drop-shadow-lg">
            <motion.img
              src={data.imageURL}
              alt=""
              className="object-cover rounded-md w-52 h-52"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <div className="grid col-span-3 gap-1 px-2 text-sm">
            <span className="col-span-full">{data.name}</span>
            <a href={data.youtube} className="col-span-full">
              {data.youtube.length > 15
                ? `${data.youtube.slice(0, 20)}...`
                : data.youtube}
            </a>
            <a href={data.soundcloud} className="col-span-full">
              {data.soundcloud.length > 15
                ? `${data.soundcloud.slice(0, 20)}...`
                : data.soundcloud}
            </a>
            <div className="flex items-center justify-between">
              {/* <span>1 song</span> */}
              <div
                className="p-2 rounded-lg w-fit hover:bg-neutral-700"
                onClick={() => setDeleteConfirm(!isDeleteConfirm)}
              >
                <BsTrash className="text-xl text-red-500" />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isDeleteConfirm && (
                <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 1 }}
                className="absolute grid items-center w-full h-full grid-cols-2 grid-rows-2 gap-2 p-2 rounded-md bg-neutral-800">
                <p className="col-span-2 row-span-1 text-center">
                    Are you sure you want to delete?
                </p>
                <span
                    className="col-span-1 row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-green-500 rounded-lg hover:bg-green-600"
                    onClick={() => {deleteArtist(data._id)}}
                >
                    Yes
                </span>
                <span
                    className="col-span-1 row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-red-500 rounded-lg hover:bg-red-600"
                    onClick={() => setDeleteConfirm(false)}
                >
                    No
                </span>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    );
}

export default ArtistCard