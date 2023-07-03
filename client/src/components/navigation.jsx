import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import React, { useEffect, useState } from 'react'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { BiCrown, BiUser } from 'react-icons/bi'
import { GrUserAdmin } from 'react-icons/gr'
import { TfiMicrophone } from 'react-icons/tfi'
import { Turn as Hamburger } from 'hamburger-react'

import { Logo } from '../assets/img';

import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';

import { isActiveDashboardNav, isNotActiveDashboardNav } from '../utils/styles';
import { changeAccount } from '../api';
import { actionType } from '../context/reducer';

const Navigation = (props) => {  
  const {openProfile} = props;
  const [{user}, dispatch] = useStateValue();

  const username = user?.user?.name;
  const subscription = user?.user?.subscription;
  const email = user?.user?.email;
  const role = user?.user?.role;
  const user_id = user?.user?.user_id;

  const defaultImageURL = 'https://firebasestorage.googleapis.com/v0/b/mcc-music-web-project.appspot.com/o/images%2Fdefault%2Fprofile.webp?alt=media&token=97a1ef47-11ea-42ee-b397-3afb9f7aac75';

  let userIcon ;

  // Admin access
  const [isAdmin, setAdmin] = useState(false);

  const [isDashboardBranch, setDashboardBranch] = useState(window.location.pathname.split("/").some(path => path === "dashboard"));

  // const [isUploadPage, setUploadPage] = useState(window.location.pathname.split("/").some(path => path === "upload"));

  useEffect(() => {
    if(role === "admin"){
      setAdmin(true);
    }
  },[user])

  // Conditional Rendering to distinguish between artist and user
  switch(role){
    case "member":
      userIcon = <BiUser className='p-1 text-black bg-white rounded'/>;
      break;
    case "artist":
      userIcon = <TfiMicrophone className='p-1 text-black bg-white rounded'/>;
      break;
    case "admin":
      userIcon = <GrUserAdmin className='p-1 text-black bg-white rounded'/>;
      break;
    default:
      userIcon = <BiUser className='p-1 text-black bg-white rounded'/>;
  }

  const navigate = useNavigate();

  const [isMenu, setIsMenu] = useState(false);
  
  // State for hamburger menu
  const [isOpen, setOpen] = useState(false);

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem("auth", "false");
    }).catch((e) => console.log(e));

    navigate('/login', {replace: true});
  }

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 700);

  const menuItems = [
    {
      link: '/dashboard/home',
      to: 'Home'
    },
    {
      link: '/dashboard/users',
      to: 'Users'
    },
    {
      link: '/dashboard/songs',
      to: 'Songs'
    },
    {
      link: '/dashboard/artists',
      to: 'Artists'
    },
    {
      link: '/dashboard/albums',
      to: 'Albums'
    }
  ]

  // Changing account type
  const changeAccountType = (user_id) => {
    changeAccount(user_id).then((res) => {
      dispatch({
        type: actionType.SET_USER,
        user: res
      })
    }).catch((error) => {
      console.log(error);
    }).then(() => {alert("User Account Changed")})
  }

  return (
    <div className='flex items-center justify-between w-full text-white bg-neutral-900'>     
      {
        (isMobile && isDashboardBranch) && <div className='relative'>
          <div className='p-2'><Hamburger toggled={isOpen} toggle={setOpen} rounded/></div>
          <AnimatePresence>
            {isOpen && <motion.nav 
            initial={{opacity: 0, y: -25}}
            animate={{opacity: 1, y: 0, transition: {type: 'spring', duration: 0.5}}}
            exit={{opacity: 0, y: -25, transition: {type: 'spring', duration: 0.5}}}
            className='absolute z-40 grid w-screen p-4 text-xl font-medium text-center shadow-md bg-neutral-900'>
              { menuItems.map((item, i) => <NavLink key={i} to={item.link} className={({isActive}) => isActive ? isActiveDashboardNav : isNotActiveDashboardNav} onClick={()=>setOpen(false)}>{item.to}</NavLink>)}
            </motion.nav>}
          </AnimatePresence>
        </div>
      }
      <div className='relative flex items-center gap-2 m-2 ml-auto cursor-pointer' onMouseEnter={()=> {setIsMenu(true)}} onMouseLeave={()=> {setIsMenu(false)}}>
        <div className='flex flex-col gap-1'>
          <p>{username}</p>
          <div className='flex flex-row-reverse gap-2 text-xl'>
            {subscription && <BiCrown/>}
            {userIcon}
          </div>     
        </div>     
        <img src={user?.user?.imageURL !== null ? user?.user?.imageURL : defaultImageURL} alt="profile pic" referrerPolicy='no-referrer' className='w-12 min-w-[44px] rounded-lg object-cover shadow-lg filter hover:contrast-75'/>
        {isMenu && (
          <motion.div 
          initial={{opacity : 0, y : -50}} 
          animate={{opacity : 1, y: 0}}
          exit={{opacity : 0, y: -50}}
          className="absolute right-0 z-50 divide-y rounded-md shadow-lg divide-neutral-500 w-aut bg-neutral-800 top-12 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
            <div className="py-1" role="none">
              <p className='block px-4 py-2 text-sm'>Signed in as<br/><span className='font-bold'>{email}</span></p>
            </div>
            {isDashboardBranch && <div className='py-1' role='none'>
              <NavLink to={"/user/home"} className='block px-4 py-2 text-sm transition-all duration-200 ease-in-out hover:bg-neutral-700'>Home</NavLink>
            </div>}
            <div className="py-1" role="none">
              <div className='block px-4 py-2 text-sm transition-all duration-200 ease-in-out select-none hover:bg-neutral-700' onClick={() => {openProfile(); setIsMenu(false)}}>Profile</div>
              {(role === 'member') && <div className='block px-4 py-2 text-sm transition-all duration-200 ease-in-out hover:bg-neutral-700' onClick={() => {changeAccountType(user_id)}}>Change account type</div>}
              {role === 'artist' && <NavLink to={"/user/mysongs"} className='block px-4 py-2 text-sm transition-all duration-200 ease-in-out hover:bg-neutral-700'>My Songs</NavLink>}
            </div>
            {(isAdmin && !isDashboardBranch)  && <div className='py-1' role='none'>
              <NavLink to={"/dashboard/home"} className='block px-4 py-2 text-sm transition-all duration-200 ease-in-out hover:bg-neutral-700'>Dashboard</NavLink>
            </div>}
            <div className="py-1" role="none">
              <button onClick={logOut} type="submit" className="block w-full px-4 py-2 text-sm text-left transition-all duration-200 ease-in-out hover:bg-neutral-700">Sign out</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Navigation