import React, { useState } from 'react'
import { useStateValue } from '../context/StateProvider'

import { GrClose } from 'react-icons/gr'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { TbShare3 } from 'react-icons/tb'
import { actionType } from '../context/reducer';

import AudioPlayer from 'react-h5-audio-player'

const MusicPlayer = () => {
    const [{allSongs, songIndex, isSongPlaying, showMusicPlayer}, dispatch] = useStateValue();
    const [isLikeHover, setLikeHover] = useState(false);
    const [isLikeClicked, setLikeClicked] = useState(false);

    const hideMusicPlayer = () => {
        if(showMusicPlayer){
            dispatch({
                type: actionType.SET_SHOW_MUSICPLAYER,
                showMusicPlayer: false
            })
        }
    }

  return (
    <div className='relative flex flex-col items-center w-full gap-2 md:flex-row lg:items-end'>
        <i className='absolute top-0 right-0 p-2 m-1 bg-white rounded-md bg-opacity-30 hover:bg-opacity-40 lg:m-0 lg:p-1 lg:bg-opacity-10' onClick={hideMusicPlayer}><GrClose/></i>
        <img src={allSongs[songIndex]?.imageURL} className='w-64 mt-12 rounded-lg md:mt-0 lg:w-40'/>
        <div className='flex flex-col items-center w-full gap-2'>
            <p className='text-2xl font-bold'>{allSongs[songIndex]?.name}</p>
            <div className='flex justify-between w-full px-4'>
                <i className='text-2xl text-accent' onMouseEnter={()=>setLikeHover(true)} onMouseLeave={()=>{setLikeHover(!isLikeHover)}} onClick={()=>setLikeClicked(!isLikeClicked)}>{(!isLikeHover && !isLikeClicked) ? <AiOutlineHeart/> : <AiFillHeart/>}</i>
                <p>{allSongs[songIndex]?.artist} ( {allSongs[songIndex]?.album} )</p>
                <i className='text-2xl text-accent'><TbShare3/></i>
            </div>
            <AudioPlayer 
            src={allSongs[songIndex]?.songURL}
            onPlay={() =>  console.log('is playing')}
            autoPlay={true}
            showSkipControls={true}
            />
            
        </div>
    </div>
  )
}

export default MusicPlayer