import React from 'react'
import { NavLink } from 'react-router-dom'
import { Artist1, Artist2, Artist3, Artist4, HeroImg1, HeroImg2, HeroImg3, HeroImg4, PricingPic, ProcessImg1, ProcessImg2, ProcessImg3, ProcessImg4 } from '../assets/img'

import { AiOutlineArrowRight } from 'react-icons/ai'
import { BiCheckCircle } from 'react-icons/bi'
import { BsTelephone, BsMailbox } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { ImFacebook, ImTwitter } from 'react-icons/im'
import { FaInstagram } from 'react-icons/fa'

import { LandingPageHeader } from '../components'

const landingPage = () => {
  const contact = [
    {
      icon: <BsTelephone/>,
      info: '+959799911254'
    },
    {
      icon: <BsMailbox/>,
      info: 'thantheinthwin.dev@gmail.com'
    },
    {
      icon: <HiOutlineLocationMarker/>,
      info: 'Yangon, Myanmar'
    }
  ]

  const socialMedia = [
    {
      icon: <ImFacebook/>,
      link: '/'
    },
    {
      icon: <FaInstagram/>,
      link: '/'
    },
    {
      icon: <ImTwitter/>,
      link: '/'
    }
  ]
  
  return (
    <div className='relative'>
      <LandingPageHeader />

      <div className="relative w-full space-y-20 text-white bg-black lg:space-y-32">
        {/* Hero Section */}
        <div
          id="hero"
          className="relative grid items-center w-11/12 grid-cols-10 gap-8 p-4 m-auto lg:w-3/4"
        >
          <div className="flex flex-col gap-2 col-span-full lg:col-span-7">
            <p className="text-5xl cursor-default font-secondary lg:text-7xl">
              Find And Listen To Your Favourite{" "}
              <span className="relative inline-block transition-all duration-500 ease-in-out before:absolute before:inset-x-0 before:inset-y-3 before:block before:-skew-y-3 before:bg-secondary hover:before:bg-neutral-800">
                <span className="relative inline-block">Artist</span>
              </span>{" "}
              Here
            </p>
            <p className="font-light md:w-2/3">
              Unleash the power of music with MeloStream, your one-stop
              destination for all things music.
            </p>
            <NavLink to={"/login"}>
              <button className="flex items-center gap-1 px-4 py-2 mt-6 text-black transition-all duration-200 ease-in-out rounded-full bg-primary hover:bg-neutral-600 hover:text-white">
                Start Listening <AiOutlineArrowRight />
              </button>
            </NavLink>
          </div>
          <div className="grid grid-cols-2 gap-4 col-span-full lg:col-span-3">
            <div className="grid gap-4">
              <div>
                <img
                  src={HeroImg1}
                  alt=""
                  className="object-cover w-full transition-all duration-500 ease-in-out rounded-full h-60 filter hover:grayscale lg:h-96"
                  loading="lazy"
                />
              </div>
              <div>
                <img
                  src={HeroImg2}
                  alt=""
                  className="w-full h-auto transition-all duration-500 ease-in-out rounded-full rounded-br-none filter hover:grayscale"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  src={HeroImg3}
                  alt=""
                  className="w-full h-auto transition-all duration-500 ease-in-out rounded-full rounded-tr-none filter hover:grayscale"
                  loading="lazy"
                />
              </div>
              <div>
                <img
                  src={HeroImg4}
                  alt=""
                  className="object-cover w-full transition-all duration-500 ease-in-out rounded-full h-60 filter hover:grayscale lg:h-96"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Artist Section */}
        <div
          id="invite"
          className="relative grid items-center w-11/12 grid-cols-7 gap-4 p-4 m-auto rounded-xl bg-secondary lg:w-3/4"
        >
          <div className="mb-4 space-y-3 col-span-full md:col-span-3 md:mb-0">
            <h1 className="text-lg text-primary">Calling all creators</h1>
            <h6 className="text-3xl font-bold">Amplify Your Reach</h6>
            <p className="font-light">
              Don't miss out on the chance to be part of a thriving music
              community. Join SoundWave today and unlock the limitless potential
              of your music.
            </p>
          </div>
          <div className="grid grid-cols-4 col-span-full md:col-span-4">
            <img
              src={Artist1}
              alt=""
              className="transition-all duration-200 ease-in-out col-span-full filter hover:grayscale md:col-span-1"
              loading='lazy'
            />
            <img
              src={Artist2}
              alt=""
              className="transition-all duration-200 ease-in-out col-span-full filter hover:grayscale md:col-span-1"
              loading='lazy'
            />
            <img
              src={Artist3}
              alt=""
              className="transition-all duration-200 ease-in-out col-span-full filter hover:grayscale md:col-span-1"
              loading='lazy'
            />
            <img
              src={Artist4}
              alt=""
              className="transition-all duration-200 ease-in-out rounded-b-lg col-span-full filter hover:grayscale md:col-span-1 lg:rounded-r-lg"
              loading='lazy'
            />
          </div>
        </div>

        {/* Process Section */}
        <div
          id="process"
          className="relative grid items-center w-11/12 grid-cols-10 gap-4 p-4 m-auto lg:w-3/4 lg:gap-12"
        >
          <div className="flex flex-col gap-2 col-span-full lg:col-span-6">
            <h2 className="text-lg text-primary">Our Process</h2>
            <h1 className="text-3xl font-bold">
              Bring Your Music to the World
            </h1>
            <p className="font-light">
              Share your tracks and mixes with global audience of music
              enthusiasts. Whether you're a budding artist, a seasoned producer,
              or a passionate creator,{" "}
              <span className="text-lg font-bold">MeloStream</span> provides a
              platform to showcase your talent and connect with vibrant
              community of listeners.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid col-span-1 gap-2 p-6 place-content-start rounded-xl bg-secondary">
                <h1 className="text-2xl font-bold text-neutral-600">01</h1>
                <h1 className="text-xl">Sign Up</h1>
                <p className="text-sm font-light">
                  Create an account for our website.
                </p>
              </div>
              <div className="grid col-span-1 gap-2 p-6 place-content-start rounded-xl bg-neutral-900">
                <h1 className="text-2xl font-bold text-neutral-600">02</h1>
                <h1 className="text-xl">Record Your Tracks</h1>
                <p className="text-sm font-light">
                  Record your song using any recording software you prefer and
                  export it as a mp3 file.
                </p>
              </div>
              <div className="grid col-span-1 gap-2 p-6 place-content-start rounded-xl bg-neutral-900">
                <h1 className="text-2xl font-bold text-neutral-600">03</h1>
                <h1 className="text-xl">Upload Your Songs</h1>
                <p className="text-sm font-light">
                  Once you've created an artist account, you can upload your
                  creations onto our website.
                </p>
              </div>
              <div className="grid col-span-1 gap-2 p-6 place-content-start rounded-xl bg-neutral-900">
                <h1 className="text-2xl font-bold text-neutral-600">04</h1>
                <h1 className="text-xl">Always Consistent</h1>
                <p className="text-sm font-light">
                  Make sure to stay active, keep making more and more songs,
                  getting better day by day.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 col-span-full md:grid-cols-2 lg:col-span-4">
            <div className="grid gap-4">
              <div>
                <img
                  src={ProcessImg1}
                  alt=""
                  className="h-auto max-w-full transition-all duration-500 ease-in-out rounded-full rounded-tl-none filter hover:grayscale"
                  loading='lazy'
                />
              </div>
              <div>
                <img
                  src={ProcessImg2}
                  alt=""
                  className="h-auto max-w-full transition-all duration-500 ease-in-out rounded-lg filter hover:grayscale"
                  loading='lazy'
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  src={ProcessImg4}
                  alt=""
                  className="h-auto max-w-full transition-all duration-500 ease-in-out rounded-lg filter hover:grayscale"
                  loading='lazy'
                />
              </div>
              <div>
                <img
                  src={ProcessImg3}
                  alt=""
                  className="h-auto max-w-full transition-all duration-500 ease-in-out rounded-full rounded-bl-none filter hover:grayscale"
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div
          id="pricing"
          className="relative grid items-center w-11/12 grid-cols-10 gap-4 p-4 m-auto lg:w-3/4"
        >
          <div className="col-span-full rounded-xl bg-gradient-to-b from-current to-black lg:col-span-4 lg:bg-gradient-to-r">
            <img
              src={PricingPic}
              alt=""
              className="w-auto mix-blend-multiply"
              loading="lazy"
            />
          </div>
          <div className="relative left-0 right-0 m-auto text-center col-span-full w-fit lg:top-0 lg:col-span-6">
            <h1 className="text-2xl font-bold">Plans & Pricing</h1>
            <h6 className="mb-12 text-sm font-light">
              Choose a plan and start you music journey
            </h6>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid justify-center gap-2 px-4 py-10 border col-span-full place-content-start rounded-xl border-secondary lg:col-span-1">
                <h1 className="text-xl font-bold">Basic</h1>
                <h6 className="text-lg">Free</h6>
                <ul className="gap-2 mt-4 space-y-1 text-sm font-light text-start">
                  <li className="flex items-center gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Watch on any device
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Upgrade Plan Anytime
                  </li>
                </ul>
              </div>
              <div className="grid justify-center gap-2 px-4 py-10 border col-span-full place-content-start rounded-xl border-secondary bg-secondary lg:col-span-1">
                <h1 className="text-xl font-bold">Premium</h1>
                <h6 className="text-lg">
                  $4.99 <span className="text-xs font-thin">/ month</span>
                </h6>
                <ul className="gap-2 mt-4 space-y-1 text-sm font-light text-start">
                  <li className="flex gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Watch on any device
                  </li>
                  <li className="flex gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Share your favourite artist on social medias
                  </li>
                  <li className="flex gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Stream the exclusive contents
                  </li>
                </ul>
              </div>
              <div className="grid justify-center gap-2 px-4 py-10 border col-span-full place-content-start rounded-xl border-secondary lg:col-span-1">
                <h1 className="text-xl font-bold">Student Plan</h1>
                <h6 className="text-lg">
                  $2.99 <span className="text-xs font-thin">/ month</span>
                </h6>
                <ul className="gap-2 mt-4 space-y-1 text-sm font-light text-start">
                  <li className="flex items-center gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Watch on any device
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Stream the exclusive contents
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="text-lg text-accent">
                      <BiCheckCircle />
                    </i>
                    Upgrade Plan Anytime
                  </li>
                </ul>
                <span className="mt-4 text-xs text-accent">
                  You must provide your student ID.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative w-full py-6 space-y-4" id="contact">
          <div className="relative grid w-11/12 gap-4 p-6 m-auto rounded-b-3xl bg-accent">
            <div className="absolute left-0 right-0 grid px-4 py-8 m-auto space-y-4 text-center -top-28 rounded-xl bg-secondary md:w-2/3">
              <div>
                <h1 className="text-sm font-light">Subscribe Now</h1>
                <h6>Get Notified Every Time We Post An New Update News</h6>
              </div>
              <form className="lg:m-auto lg:w-3/4">
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium sr-only"
                >
                  Your Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="block w-full p-4 text-sm rounded-xl bg-neutral-700 placeholder:text-white focus:border-accent focus:ring-accent"
                    placeholder="Your Email Address"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute bottom-2.5 right-2.5 rounded-xl bg-accent px-4 py-2 text-sm font-medium uppercase text-white hover:bg-opacity-50 focus:outline-none focus:ring-4 focus:ring-accent"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div className="relative grid grid-cols-3 gap-4 mt-20 md:mt-14">
              <div className="grid m-auto col-span-full w-fit md:col-span-1">
                {contact.map((item, i) => (
                  <div key={i} className="grid grid-cols-8 text-sm font-medium cursor-default lg:text-base">
                    <div className="col-span-1">{item.icon}</div>
                    <div className="col-span-7 break-words transition-all duration-200 ease-in-out hover:text-secondary">
                      {item.info}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 m-auto mt-2 md:m-0 w-fit md:mt-6">
                  {socialMedia.map((item, i) => (
                    <NavLink
                      to={item.link}
                      key={i}
                      className="p-2 text-black transition-all duration-200 ease-in-out bg-white rounded-lg hover:bg-secondary hover:bg-opacity-90 hover:text-white"
                    >
                      {item.icon}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="grid items-center bg-white cursor-default col-span-full rounded-xl md:col-span-2">
                <h1 className="text-2xl font-bold text-center text-secondary lg:text-6xl">
                  <span className="text-3xl text-accent lg:text-8xl">M</span>
                  eloStream
                </h1>
              </div>
            </div>
          </div>
          <div className="w-5/6 m-auto text-sm font-light text-neutral-400">
            @ 2023 Thant Hein Thwin, Myanmar, All Rights Reserved
          </div>
        </footer>
      </div>
    </div>
  );
}


export default landingPage