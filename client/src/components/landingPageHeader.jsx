import React, { useState } from 'react'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { FiLogIn } from 'react-icons/fi'

const LandingPageHeader = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      text: 'Home',
      to: 'hero'
    },
    {
      text: 'Process',
      to: 'process'
    },
    {
      text: 'Subscription',
      to: 'pricing'
    },
    {
      text: 'Contact',
      to: 'contact'
    }
  ]

  return (
    <nav className='sticky top-0 z-50 w-full'>
      <div className='relative z-50 flex items-center justify-between w-full p-2 bg-neutral-900'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1 }}
          className="grid items-center grid-flow-col gap-2"
        >
          <p className="text-xl font-bold cursor-default"><span className='text-2xl text-accent'>M</span>eloStream</p>
        </motion.div>
        <motion.div className='p-2 rounded-md bg-neutral-800 md:hidden' onClick={() => {setMenuOpen(!isMenuOpen)}}>
          <FiLogIn className='text-2xl'/>
        </motion.div>
        <motion.div className='items-center hidden divide-x md:flex'>
          <div className='flex gap-4 p-2 cursor-default'>
            {navLinks.map((item, i) => <Link key={i} className='font-medium transition-all duration-200 ease-in-out hover:text-accent' to={item.to} spy={true} smooth={true} offset={-100} duration={500}>{item.text}</Link>)}
          </div>
          <div className='grid grid-flow-col'>
            <NavLink className='w-full p-2 font-medium transition-all duration-200 ease-in-out hover:text-accent' to={'/login'}>Log In</NavLink>
            <NavLink className='w-full p-2 font-medium transition-all duration-200 ease-in-out rounded-lg bg-accent hover:bg-opacity-60' to={'/signup'}>Sign Up</NavLink>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        { isMenuOpen && <motion.div initial={{y: -60}} animate={{y: 0}} exit={{y: -60}} transition={{type: 'just'}} className='absolute left-0 z-0 grid w-full gap-2 p-2 text-center bg-neutral-900'>
          <p className='text-sm font-light'>Connect with your audiences</p>
          <div className='flex gap-3'>
            <NavLink className='w-full p-2 text-black rounded-lg bg-primary' to={'/login'}>Log In</NavLink>
            <NavLink className='w-full p-2 rounded-lg bg-neutral-800' to={'/signup'}>Sign Up</NavLink>
          </div>
        </motion.div>}
      </AnimatePresence>
    </nav>
  );
}

export default LandingPageHeader