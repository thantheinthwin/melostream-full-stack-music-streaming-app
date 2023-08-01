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
  const currentMonth = new Date().getMonth()-1;

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
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
  }, []) 

  return (
    <div className='flex flex-col items-center w-full col-span-6 gap-8 p-6 mt-10 lg:col-start-2'>
      <Tabs allUsers={allUsers} allArtists={allArtists} allSongs={allSongs} allAlbums={allAlbums}/>
      <div className='grid w-5/6 grid-cols-1 gap-6 lg:grid-cols-2'>
        <SubscribedUsers allUsers={allUsers}/>
        <MonthlyNewUsers allUsers={allUsers} currentMonth={currentMonth}/>
        <MonthlyUpload allSongs={allSongs} currentMonth={currentMonth}/>
        {allSongs && <MostPlayedSong allSongs={allSongs} currentMonth={currentMonth}/>}
      </div>
    </div>
  );
}

const Tabs = ({allUsers, allArtists, allSongs, allAlbums}) => {
  
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
      className="relative grid items-center w-full grid-flow-row col-span-6 justify-evenly gap-x-3 gap-y-5 lg:col-start-2 lg:grid-flow-col"
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
  )
}

const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="grid w-40 h-auto grid-flow-col grid-rows-2 gap-2 p-4 rounded-md cursor-default bg-neutral-700 rouned-lg bg-sky-blue-50 hover:shadow-lg">
      <i className="text-3xl">{icon}</i>
      <p className="text-xl font-semibold">{name}</p>
      <p className="row-span-2 text-6xl font-semibold text-right">{count}</p>
    </div>
  );
};

const SubscribedUsers = ({allUsers}) => {
  return (
    <div className='flex flex-col items-center justify-center col-span-1 p-2 rounded-md bg-neutral-600'>
      <span className='text-xl font-semibold'>Subscribed users</span>
      <span className='text-6xl font-semibold'>
        {
          allUsers && 
          allUsers.filter(user => user.subscription == true).length
        }
      </span>
    </div>
  )
}

const MonthlyNewUsers = ({allUsers, currentMonth}) => {
  
  return (
    <div className='flex flex-col items-center justify-center col-span-1 p-2 rounded-md bg-neutral-600'>
      <span className='text-xl font-semibold'>Monthly New User</span>
      <span className='text-6xl font-semibold'>
        {
          allUsers &&
          allUsers
          .map(user => user.createdAt)
          .filter(dateString => {
            const date = new Date(dateString);
            return date.getMonth() === currentMonth;
          }).length
        }
      </span>
    </div>
  )
}

const MonthlyUpload = ({allSongs, currentMonth}) => {
   
  return (
    <div className='flex flex-col items-center justify-center col-span-1 p-2 rounded-md bg-neutral-600'>
      <span className='text-xl font-semibold'>Monthly Upload</span>
      <span className='text-6xl font-semibold'>
        {
          allSongs &&
          allSongs
          .map(song => song.createdAt)
          .filter(dateString => {
            const date = new Date(dateString);
            return date.getMonth() === currentMonth;
          }).length
        }
      </span>
    </div>
  )
}

const MostPlayedSong = ({allSongs, currentMonth}) => {
  const favSong = allSongs.filter(song => song.songPlayed == Math.max(...allSongs.map(song => song.songPlayed)))
    
  return (
    <div className='flex flex-col items-center justify-center gap-2 p-2 rounded-md col-span-full bg-neutral-600'>
      <span className='text-4xl font-semibold text-center'>Most Played Song</span>
      {
        allSongs &&
        <div className='grid content-center grid-cols-1 gap-2 p-2 bg-white rounded-md shadow-md justify-items-center bg-opacity-10'>
          <img src={favSong[0].imageURL} referrerPolicy='no-referrer' className='object-cover col-span-1 rounded lg:w-52 lg:h-52'/>
          <div className='flex items-center justify-between w-full col-span-1 gap-1'>
            <div>
              <div className='text-3xl font-semibold'>{favSong[0].name}</div>
              <div className='font-medium'>{favSong[0].artist}</div>
              <div>Total song played : </div>
            </div>
            <div className='font-semibold text-8xl text-end'>{favSong[0].songPlayed}</div>
          </div>
        </div>
      }
    </div>
  )
}

export default DashboardHome