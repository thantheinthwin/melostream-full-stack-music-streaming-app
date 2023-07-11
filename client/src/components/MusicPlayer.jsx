import React, { useState } from 'react'
import { useStateValue } from '../context/StateProvider'

import { GrClose } from 'react-icons/gr'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { TbShare3 } from 'react-icons/tb'
import { actionType } from '../context/reducer';

import AudioPlayer from 'react-h5-audio-player'
import { likeSong, unLikeSong } from '../api'

const MusicPlayer = () => {
    const [{user, allSongs, songIndex, isSongPlaying, showMusicPlayer}, dispatch] = useStateValue();
    const [isLikeHover, setLikeHover] = useState(false);
    const [isLikeClicked, setLikeClicked] = useState(false);
    const [isLiked, setLiked] = useState(true);

    const hideMusicPlayer = () => {
        if(showMusicPlayer){
            dispatch({
                type: actionType.SET_SHOW_MUSICPLAYER,
                showMusicPlayer: false
            })
        }
    }

  return (
    <div className="relative flex flex-col items-center w-full gap-2 md:flex-row lg:items-end">
        {console.log(user?.user?.user_id)}
      <i
        className="absolute top-0 right-0 p-2 m-1 bg-white rounded-md bg-opacity-30 hover:bg-opacity-40 lg:m-0 lg:bg-opacity-10 lg:p-1"
        onClick={hideMusicPlayer}
      >
        <GrClose />
      </i>
      <img
        src={allSongs[songIndex]?.imageURL}
        className="w-64 mt-12 rounded-lg md:mt-0 lg:w-40"
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
              <AiFillHeart className="p-1 text-3xl" onClick={() => {
                if(!isLiked){
                    likeSong(user?.user?.user_id, allSongs[songIndex]?._id)
                }
                else {
                    unLikeSong(user?.user?.user_id, allSongs[songIndex]?._id)
                }
                
                setLikeClicked(!isLikeClicked)
              }} />
            )}
          </i>
          <p>
            {allSongs[songIndex]?.artist} ( {allSongs[songIndex]?.album} )
          </p>
          <i className="text-2xl text-accent">
            <TbShare3 />
          </i>
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