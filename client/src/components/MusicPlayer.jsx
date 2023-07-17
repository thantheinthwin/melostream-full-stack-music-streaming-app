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
    <div className="relative flex w-full flex-col items-center gap-2 md:flex-row lg:items-end">
      {/* {console.log(user)} */}
      {/* {console.log(allSongs[songIndex])} */}
      <i
        className="absolute right-0 top-0 m-1 rounded-md bg-white bg-opacity-30 p-2 hover:bg-opacity-40 lg:m-0 lg:bg-opacity-10 lg:p-1"
        onClick={hideMusicPlayer}
      >
        <GrClose />
      </i>
      <img
        src={allSongs[songIndex]?.imageURL}
        className="mt-12 h-64 w-64 rounded-lg object-cover md:mt-0 lg:h-40 lg:w-40"
      />
      <div className="flex w-full flex-col items-center gap-2">
        <p className="text-2xl font-bold">{allSongs[songIndex]?.name}</p>
        <div className="flex w-full justify-between px-4">
          <i
            className="text-accent"
            onMouseEnter={() => setLikeHover(true)}
            onMouseLeave={() => setLikeHover(!isLikeHover)}
          >
            {!isLikeHover && !isLikeClicked ? (
              <AiOutlineHeart className="p-1 text-3xl" />
            ) : (
              <AiFillHeart
                className="cursor-pointer p-1 text-3xl"
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
            <i
              className="text-2xl text-accent cursor-pointer"
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href)
                alert('Link have been saved in you clipboard');
              }}
            >
              <TbShare3 />
            </i>
          ) : (
            <i className="relative">
              <TbShare3 className="peer text-2xl text-zinc-600" />
              <p className="absolute right-0 z-40 hidden w-44 rounded-lg bg-neutral-700 p-1 text-center text-sm transition-all duration-500 ease-in-out peer-hover:flex">
                Subscribe to be able to share your favourite songs
              </p>
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