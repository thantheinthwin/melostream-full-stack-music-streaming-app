import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { FaHome } from 'react-icons/fa'
import { MdWorkspacePremium, MdFavorite, MdCopyright } from 'react-icons/md'
import { BiCloudUpload } from 'react-icons/bi'

import { isActiveStyle, isNotActiveStyle } from '../utils/styles'
import { useStateValue } from '../context/StateProvider'
import { GoogleAds } from '../assets/img'

const SideBar = () => {
  const [{user}] = useStateValue();

  const [isArtist, setUserArtist] = useState(false);

  useEffect(() => {
    if(user?.user?.role === 'artist'){
      setUserArtist(true);
    }
  }, [user])

  const links = [
    {
      path: '/user/home',
      link: "Home",
      icon: <FaHome/>
    },
    {
      path: '/user/favorite',
      link: "Favourite",
      icon: <MdFavorite/>
    },
    {
      path: '/user/subscribe',
      link: "Subscribe",
      icon: <MdWorkspacePremium/>
    }
  ];

  return (
    <div className="flex flex-col justify-between flex-none w-48 h-screen bg-neutral-900">
      <ul>
        {links.map((link , i) => (
          <li key={i}>
            <NavLink
              to={link.path}
              key={i}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <i className="mr-2 text-2xl">{link.icon}</i>
              {link.link}
            </NavLink>
          </li>
        ))}
        {isArtist && <li>
          <NavLink
            to="/user/upload"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <i className="mr-2 text-2xl">
              <BiCloudUpload />
            </i>
            Upload
          </NavLink>
        </li>}
      </ul>
      <div className="flex items-center h-full text-black border-sky-blue-100">
        {
          !user?.user?.subscription &&
        <div className='flex items-center h-full p-4 bg-white'>
          <img src={GoogleAds} alt="GoogleAds" className='w-full h-fit' />
        </div>
        }
      </div>
      <div className='flex items-center justify-center gap-1 py-3 bg-neutral-800'><i className='text-xl'><MdCopyright/></i> Thant Hein Thwin - 2023</div>
    </div>
  );
}

export default SideBar