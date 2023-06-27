import React, { useEffect, useState } from 'react'

import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../../api';

import { motion } from 'framer-motion'

import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

// Importing react icons
import { AiOutlineUser } from 'react-icons/ai';
import { TbMicrophone2 } from 'react-icons/tb';
import { IoAlbumsOutline } from 'react-icons/io5';
import { HiOutlineMusicalNote } from 'react-icons/hi2';

const DashboardHome = () => {
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

  const tags = [
    {
      id: 1,
      icon: <AiOutlineUser/>,
      name: "Users",
      count: allUsers?.length
    },
    {
      id: 2,
      icon: <TbMicrophone2/>,
      name: "Artists",
      count: allArtists?.length
    },
    {
      id: 3,
      icon: <HiOutlineMusicalNote/>,
      name: "Songs",
      count: allSongs?.length
    },
    {
      id: 4,
      icon: <IoAlbumsOutline/>,
      name: "Albums",
      count: allAlbums?.length
    },
  ];

  // Variants
  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative grid items-center w-full grid-flow-row col-span-6 p-6 mt-20 justify-evenly gap-x-3 gap-y-5 lg:col-start-2 lg:grid-flow-col"
    >
      {tags.map((tag, i) => (
        <motion.div variants={item} key={i}>
          <DashboardCard
            icon={tag.icon}
            name={tag.name}
            count={tag.count > 0 ? tag.count : 0}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="grid w-40 h-auto grid-flow-col grid-rows-2 gap-2 p-4 rounded-md cursor-default bg-neutral-700 rouned-lg bg-sky-blue-50 hover:shadow-lg">
      <i className="text-3xl">{icon}</i>
      <p className="text-xl font-semibold">{name}</p>
      <p className="row-span-2 text-6xl font-semibold text-right">{count}</p>
    </div>
  );
};

export default DashboardHome