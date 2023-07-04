import React from 'react'
import { useStateValue } from '../context/StateProvider'

import { GrClose } from 'react-icons/gr'
import { actionType } from '../context/reducer';

import AudioPlayer from 'react-h5-audio-player'

const MusicPlayer = () => {
    const [{allSongs, songIndex, isSongPlaying, showMusicPlayer}, dispatch] = useStateValue();

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
        { window.innerWidth < 700 && <i className='absolute top-0 right-0 p-2 m-1 bg-white rounded-md bg-opacity-30 hover:bg-opacity-40' onClick={hideMusicPlayer}><GrClose/></i>}
        <img src={allSongs[songIndex]?.imageURL} className='w-64 mt-12 rounded-lg lg:w-40'/>
        <div className='flex flex-col items-center w-full gap-2'>
            <p className='text-2xl font-bold'>{allSongs[songIndex]?.name} ( {allSongs[songIndex]?.genre} )</p>
            <p>{allSongs[songIndex]?.artist} ( {allSongs[songIndex]?.album} )</p>
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