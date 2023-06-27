import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider'

import { BiHomeAlt } from 'react-icons/bi'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineAttachMoney, MdFavorite } from 'react-icons/md'
import { isActiveMobileNav, isNotActiveMobileNav } from '../../utils/styles'

const MobileNav = () => {
    const [{user}, dispatch] = useStateValue();
    
    const [isArtist, setUserArtist] = useState(false);

    useEffect(() => {
        if(user?.user?.role === 'artist'){
        setUserArtist(true);
        }
    }, [user])

    const nav = [
        {
            icon: <BiHomeAlt/>,
            text: 'Home',
            path: '/user/home'
        },
        {
            icon: <MdFavorite/>,
            text: 'Favorite',
            path: '/user/favorite'
        },
        {
            icon: <MdOutlineAttachMoney/>,
            text: 'Subscribe',
            path: '/user/subscribe'
        }
    ]
    
  return (
    <div className='absolute bottom-0 flex w-screen justify-evenly bg-neutral-800'>
        {nav.map((item, i) => <NavLink key={i} to={item.path} className={({isActive}) => isActive ? isActiveMobileNav : isNotActiveMobileNav}><i className='text-2xl'>{item.icon}</i><span className='text-sm'>{item.text}</span></NavLink>)}
        {isArtist && <NavLink to='/user/upload' className={({isActive}) => isActive ? isActiveMobileNav : isNotActiveMobileNav}><i className='text-2xl'><AiOutlinePlus/></i><span className='text-sm'>Upload</span></NavLink>}
    </div>
  )
}

export default MobileNav