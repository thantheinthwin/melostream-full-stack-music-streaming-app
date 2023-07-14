import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider'

import { GrClose } from 'react-icons/gr'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { TbShare3 } from 'react-icons/tb'
import { actionType } from '../context/reducer';

import AudioPlayer from 'react-h5-audio-player'
import { getAllSongs, likeSong, unLikeSong } from '../api'
import { useNavigate } from 'react-router-dom'

const MusicPlayer = () => {
    const [{user, allSongs, songIndex, isSongPlaying, showMusicPlayer}, dispatch] = useStateValue();
    const [isLikeHover, setLikeHover] = useState(false);
    const [isLikeClicked, setLikeClicked] = useState(false);
    const [isLiked, setLiked] = useState(false);

    const navigate = useNavigate();

    const hideMusicPlayer = () => {
        if(showMusicPlayer){
            dispatch({
                type: actionType.SET_SHOW_MUSICPLAYER,
                showMusicPlayer: false
            })
        }
    }

    useEffect(()=>{
     if(user?.user?.likedSongs.some(songId => songId == allSongs[songIndex]?._id)){
      setLiked(true);
      setLikeClicked(true);
     }
     else{
      setLiked(false);
      setLikeClicked(false);
     }
    },[songIndex])

  return (
    <div className="relative flex flex-col items-center w-full gap-2 md:flex-row lg:items-end">
      {/* {console.log(user)} */}
      {/* {console.log(allSongs[songIndex])} */}
      <i
        className="absolute top-0 right-0 p-2 m-1 bg-white rounded-md bg-opacity-30 hover:bg-opacity-40 lg:m-0 lg:bg-opacity-10 lg:p-1"
        onClick={hideMusicPlayer}
      >
        <GrClose />
      </i>
      <img
        src={allSongs[songIndex]?.imageURL}
        className="object-cover w-64 h-64 mt-12 rounded-lg md:mt-0 lg:w-40"
      />
      <div className="flex flex-col items-center w-full gap-2">
        <p className="text-2xl font-bold">{allSongs[songIndex]?.name}</p>
        <div className="flex justify-between w-full px-4">
          <i
            className="text-accent"
            onMouseEnter={() => setLikeHover(true)}
            onMouseLeave={() => setLikeHover(!isLikeHover)}
          >
            {!isLikeHover && !isLikeClicked ? (
              <AiOutlineHeart className="p-1 text-3xl" />
            ) : (
              <AiFillHeart
                className="p-1 text-3xl cursor-pointer"
                onClick={() => {
                  if (!isLiked) {
                    likeSong(user?.user?.user_id, allSongs[songIndex]?._id);
                  } else {
                    unLikeSong(user?.user?.user_id, allSongs[songIndex]?._id);
                  }
                  navigate(0);
                  setLikeClicked(!isLikeClicked);
                }}
              />
            )}
          </i>
          <p>
            {allSongs[songIndex]?.artist} ( {allSongs[songIndex]?.album} )
          </p>
          {user?.user?.subscription ? (
            <i className="text-2xl text-accent">
              <TbShare3 />
            </i>
          ) : (
            <i className="relative">
              <TbShare3 className='text-2xl peer text-zinc-600'/>
              <p className='absolute right-0 z-40 hidden p-1 text-sm text-center transition-all duration-500 ease-in-out rounded-lg w-44 peer-hover:flex bg-neutral-700'>Subscribe to be able to share your favourite songs</p>
            </i>
          )}
        </div>
        <AudioPlayer
          src={allSongs[songIndex]?.songURL}
          onPlay={() => console.log("is playing")}
          autoPlay={true}
          showSkipControls={true}
        />
      </div>
    </div>
  );
}

export default MusicPlayer