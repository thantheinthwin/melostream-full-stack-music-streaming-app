import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { MdWorkspacePremium, MdFavorite } from 'react-icons/md'
import { BiCloudUpload } from 'react-icons/bi'

import { isActiveStyle, isNotActiveStyle } from '../utils/styles'
import { useStateValue } from '../context/StateProvider'

const SideBar = () => {
  const [{user}, dispatch] = useStateValue();

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
      <div className="overflow-y-auto border-sky-blue-100">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis
        quam semper, lobortis enim vel, auctor elit. Integer molestie placerat
        augue id aliquet. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Nam consectetur quis arcu interdum
        bibendum. Etiam ut lacus mi. Morbi faucibus porttitor venenatis.
        Maecenas ultrices mi nec imperdiet maximus. Curabitur molestie nec
        tortor non efficitur. Maecenas tincidunt ut mauris ut vestibulum. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse velit
        nulla, aliquet eu aliquam non, suscipit eget purus. Pellentesque erat
        erat, porttitor vitae lectus id, vulputate varius nisi. Vestibulum at
        nulla feugiat, aliquam lorem nec, sodales sem. Aenean bibendum euismod
        fermentum. Nullam ut aliquam arcu. In non nulla quis tortor tincidunt
        pellentesque id id purus. Aliquam quis mauris at elit dignissim
        facilisis. Suspendisse in ipsum lorem. Donec vitae placerat sem, nec
        mollis eros. Nulla imperdiet lectus tellus, ac dictum justo consequat
        ac. Quisque quam erat, ultricies a massa id, malesuada condimentum
        magna. Nunc finibus euismod ipsum, sed elementum sem vehicula quis. Nunc
        feugiat ornare dolor vel ullamcorper. Fusce rutrum est quis tellus
        rhoncus venenatis. Quisque vestibulum, sem sed eleifend consequat, lorem
        diam ultricies metus, ac rutrum massa orci sed ligula. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Aenean vel sodales nisi. Sed sit amet sem vel justo lacinia
        fringilla at vel elit.
      </div>
      <div>three</div>
    </div>
  );
}

export default SideBar