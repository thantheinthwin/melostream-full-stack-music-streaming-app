import React, {useState} from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

import { AiOutlineHome } from 'react-icons/ai'

import { isActiveDashboardNav, isNotActiveDashboardNav } from '../utils/styles'

import { DashboardAlbums, DashboardArtists, DashboardHome, DashboardSongs, DashboardUsers } from '../components/dashboard'
import { NavigationBar, Profile } from '../components'

const Dashboard = () => {  
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    {
      link: "/dashboard/home",
      to: <AiOutlineHome className="text-2xl" />,
    },
    {
      link: "/dashboard/users",
      to: "Users",
    },
    {
      link: "/dashboard/songs",
      to: "Songs",
    },
    {
      link: "/dashboard/artists",
      to: "Artists",
    },
    {
      link: "/dashboard/albums",
      to: "Albums",
    },
  ];

  const routes = [
    {
      path: "/home",
      element: <DashboardHome />,
    },
    {
      path: "/users",
      element: <DashboardUsers />,
    },
    {
      path: "/artists",
      element: <DashboardArtists />,
    },
    {
      path: "/songs",
      element: <DashboardSongs />,
    },
    {
      path: "/albums",
      element: <DashboardAlbums />,
    },
  ];

  const handleOpen = () => {
    setProfileOpen(true);
  }

  const handleClose = () => {
    setProfileOpen(false);
  }
  
  return (
    <div className="relative flex flex-col items-center w-full h-screen">
      <NavigationBar openProfile={handleOpen} />
      <div className="grid items-center w-full text-white lg:grid-cols-10">
        <nav className="hidden grid-flow-row p-4 text-base font-medium justify-evenly rounded-b-md lg:col-span-6 lg:col-start-3 lg:grid lg:grid-flow-col bg-neutral-900">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.link}
              className={({ isActive }) =>
                isActive ? isActiveDashboardNav : isNotActiveDashboardNav
              }
            >
              {item.to}
            </NavLink>
          ))}
        </nav>
        <div className="grid grid-cols-4 col-span-full lg:col-span-8 lg:col-start-2 lg:grid-cols-8">
          <Routes>
            {routes.map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
      <Profile open={profileOpen} handleClose={handleClose}/>
    </div>
  );
}

export default Dashboard