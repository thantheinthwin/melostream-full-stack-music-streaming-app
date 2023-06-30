import React, { useEffect, useState } from 'react'

import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer';

import { addSong, getAllSongs } from '../api';
import { SongCard } from './Cards';

import { getAuth } from '@firebase/auth';
import { app, storage } from '../config/firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';

import { MdOutlineDelete } from 'react-icons/md'

import { deleteFileObject } from './supportFunctions';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [{user, allSongs}, dispatch] = useStateValue();

  const [image, setImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isImageLoading, setImageLoading] = useState(false);
  
  const [song, setSong] = useState(null);
  const [songUploadProgress, setSongUploadProgress] = useState(0);
  const [isSongLoading, setSongLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    title: '',
    imageURL: '',
    songURL: '',
    album: '',
    artist: '',
    language: '',
    genre: ''
  })
  
  // console.log(userData);
  const navigate = useNavigate();

  var popularGenres = [
    "Pop",
    "Rock",
    "Hip-hop",
    "R&B",
    "Electronic",
    "Country",
    "Jazz",
    "Classical",
    "Alternative",
    "Indie"
  ];

  const handle = (e) => {
    const newData = {...userData}
    newData[e.target.id] = e.target.value
    setUserData(newData)
  }

  const saveSong = () => {
    if (!image || !song){

    } else {
      setImageLoading(true);
      setSongLoading(true);

      const data = {
        name: userData.title,
        imageURL: image,
        songURL: song,
        album: userData.album,
        artist: user?.user?.name,
        language: userData.language,
        genre: userData.genre,
      }

      addSong(data).then((res) => {
        getAllSongs()
        .then((songs) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.song
          })
          navigate('/')
        })
      })

      setSong(null);
      setSongLoading(false);
      setImage(null);
      setImageLoading(false);
    }
  }
  
  useEffect(()=>{
    if(!user){
      dispatch({
        type: actionType.SET_USER,
        user: getAuth(app).currentUser
      })
    }
    
    if(!allSongs){
      getAllSongs()
      .then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }
  },[allSongs])
  
  return (
    <div className='grid w-full grid-flow-row grid-cols-8 gap-2 p-2 h-fit max-h-[calc(100%-7rem)] overflow-y-scroll pb-5'>
      <form className='grid grid-cols-3 gap-4 p-2 rounded-md col-span-full bg-secondary'>
        <p className='font-medium uppercase col-span-full'>Upload</p>
        <div className='flex flex-col gap-5 col-span-full md:col-span-1'>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="title"
              value={userData.title}
              onChange={(e)=>handle(e)}
              required
              className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md md:py-6 md:text-base peer bg-secondary caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
            ></input>
            <label
              htmlFor="title"
              className="absolute p-1 text-sm transition-all md:text-base -top-4 left-2 bg-secondary peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-secondary peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
            >
              Title
            </label>
          </div>
          <div className="relative">
            <input
              id="album"
              name="album"
              type="text"
              placeholder="album"
              value={userData.album}
              onChange={(e)=>handle(e)}
              required
              className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md md:py-6 md:text-base peer bg-secondary caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
            ></input>
            <label
              htmlFor="album"
              className="absolute p-1 text-sm transition-all md:text-base -top-4 left-2 bg-secondary peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-secondary peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
            >
              Album
            </label>
          </div>
          <div className="relative">
            <input
              id="language"
              name="language"
              type="text"
              placeholder="language"
              value={userData.language}
              onChange={(e)=>handle(e)}
              required
              className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md md:py-6 md:text-base peer bg-secondary caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
            ></input>
            <label
              htmlFor="language"
              className="absolute p-1 text-sm transition-all md:text-base -top-4 left-2 bg-secondary peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-secondary peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
            >
              Language
            </label>
          </div>
          <select defaultValue={'Genre'} id='genre' className='text-sm border border-gray-300 rounded-md bg-secondary md:text-base md:py-2' onChange={(e)=>handle(e)}>
            <option>Genre</option>
            {popularGenres.map((genre, i)=>(<option key={i} value={genre}>{genre}</option>))}
          </select>
        </div>
        <div className='grid gap-2 col-span-full md:col-span-2'>
          {/* Thumbnail Upload */}
          {isImageLoading && <FileLoader progress={imageUploadProgress}/>}
          {!isImageLoading && (
            <>
              {!image ? <FileUploader 
              updateState={setImage} 
              setProgress={setImageUploadProgress} 
              isLoading={setImageLoading} 
              isImage={true}
              id={'image'}
            /> : 
            <div className='relative flex flex-col items-center justify-center w-full h-full bg-transparent border-2 border-gray-300 border-dashed rounded-lg cursor-default'>
              <img src={image} className='object-cover w-52 h-52' alt="uploaded-file" />
              <button type='button' className='absolute bottom-0 right-0 p-2 m-3 text-2xl transition-all duration-200 ease-in-out bg-red-600 rounded-full filter hover:bg-red-700' onClick={()=>{setImageLoading(true); deleteFileObject(image).then(()=>{setImage(null); setImageLoading(false)})}}><MdOutlineDelete/></button>
            </div>}</>)}

          {/* Audio Upload */}
          {isSongLoading && <FileLoader progress={songUploadProgress}/>}
          {!isSongLoading && (
            <>
              {!song ? <FileUploader 
              updateState={setSong} 
              setProgress={setSongUploadProgress} 
              isLoading={setSongLoading} 
              isImage={false}
              id={'audio'}
            /> : 
            <div className='relative flex flex-col items-center justify-center w-full h-full py-6 bg-transparent border-2 border-gray-300 border-dashed rounded-lg cursor-default'>
              <audio controls><source src={song} alt="uploaded-file" type='audio/mpeg'/></audio>
              <button type='button' className='absolute bottom-0 right-0 p-2 m-3 text-2xl transition-all duration-200 ease-in-out bg-red-600 rounded-full filter hover:bg-red-700' onClick={()=>{setSongLoading(true); deleteFileObject(song).then(()=>{setSong(null); setSongLoading(false)})}}><MdOutlineDelete/></button>
            </div>}</>)}
        </div>
        <div className='flex flex-row-reverse gap-2 col-span-full'>
          <button className='p-2 text-black rounded-md bg-primary' type='button' onClick={()=>{saveSong()}}>Save</button>
          <button className='p-2 text-black bg-red-600 rounded-md' type='button' onClick={()=>{}}>Reset</button>
        </div>
      </form>
    </div>
  )
}

export const SongContainer = ({song, artist}) => {
  return (
    <div className='grid items-center grid-cols-4 col-span-3 gap-4 p-4 overflow-y-scroll border rounded-lg h-[44rem]'>
      { song && song.filter(song => song.artist === artist).map((song, i) =>
        <SongCard key={song._id} data={song} index={i} />
      ) }
    </div>
  );
};

export const FileLoader = ({ progress }) => {
  return (
    <div className='flex items-center justify-center p-2 border-2 border-gray-300 border-dashed rounded-lg'>
      <div role="status">
          <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
      {Math.round(progress) > 0 && <p className='text-accent'>{Math.round(progress)}% uploaded</p>}
    </div>
  )
}

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
  id
}) => {

  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const filename = uploadFile.name + v4();
    const storageRef = ref(storage, `${isImage ? 'images/song' : 'audios'}/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on('state_changed', 
    (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    }, 
    (error) => {
      console.error(error);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((url) => {
        updateState(url);
        isLoading(false);
      })
    }
    );
    // console.log(uploadedFile);
    // const storageRef = ref(storage, `${isImage ? 'images/song' : 'audios'}/`)
  }

  return (
    <label
      htmlFor={id}
      className="flex flex-col items-center justify-center w-full h-full bg-transparent border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-stone-600 hover:bg-opacity-10"
    >
      <div className="flex flex-col items-center justify-center px-4 py-6 bg-transparent">
        <p className="mb-2 text-xl text-gray-500">{isImage ? 'Thumbnail' : 'Audio'}</p>
        <svg
          className="w-16 h-16 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        { isImage &&
          <p className="text-xs text-gray-500">
            PNG or JPG (MAX. 800x400px)
          </p>
        }
      </div> 
      <input id={id} type="file" className="hidden" accept={isImage ? 'image/*' : 'audio/*'} onChange={(e)=>{uploadFile(e)}}/>
    </label>
  )
}

export default Upload