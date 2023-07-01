import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer';
import { getAuth } from '@firebase/auth';
import { app } from '../config/firebase.config';

import { HiOutlineCheck } from 'react-icons/hi2'
import { BsShieldCheck } from 'react-icons/bs'

import { CreditCard } from '../assets/img';

const Subscribe = () => {
  const [{user}, dispatch] = useStateValue();
  const [selectedOption, setSelectedOption] = useState('');

  const onValueChange = (e) => {
    setSelectedOption(e.target.value);
  }

  useEffect(()=>{
    if(!user){
      dispatch({
        type: actionType.SET_USER,
        user: getAuth(app).currentUser
      })
    }
  },[])

  // console.log(selectedOption);
  return (
    <div className='flex md:items-center w-full h-full max-h-[calc(100%-7rem)] lg:max-h-[calc(100%-2rem)] overflow-y-scroll md:overflow-y-hidden p-2 md:p-4'>
      {/* <div className='grid items-center w-full gap-4 py-6 mt-2 mb-6 rounded-lg lg:flex justify-evenly bg-secondary h-fit md:py-20 md:px-10'>
        <div className='flex flex-col gap-2 px-6 w-fit'>
          {user && <p className='text-lg uppercase md:text-base xl:text-lg text-accent'>Welcome to melostream, {user?.user?.name}</p>}
          <p className='text-4xl font-bold md:text-3xl xl:text-4xl'>Select your Stream plan</p>
        </div>
        <div className='flex flex-col gap-3 px-6 w-fit'>         
          <div>
            <input type='radio' id='basic' name='plan' value='basic' className='hidden peer' required checked={selectedOption === 'basic'} onChange={(e)=>onValueChange(e)}/>
            <label htmlFor='basic' className='inline-flex items-center justify-between w-full gap-2 p-5 text-gray-400 transition-all duration-200 ease-in-out border-2 border-gray-700 rounded-lg cursor-pointer bg-opacity-10 bg-violet-900 peer-checked:text-accent peer-checked:border-accent hover:bg-purple-900 hover:bg-opacity-20'>
              <div className='block max-w-md'>
                <p className='text-2xl font-bold md:text-xl xl:text-2xl'>Basic</p>
                <p className='text-sm md:text-xs xl:text-sm'>Unlimited access to a vast library of songs and playlists. Enjoy personalized recommendations with occasional ads.</p>
              </div>
              <div className='block'>
                <p className='text-2xl font-bold md:text-xl xl:text-2xl'>Free</p>
              </div>
            </label>
          </div>
          <div>
            <input type='radio' id='student' name='plan' value='student' className='hidden peer' required checked={selectedOption === 'student'} onChange={(e)=>onValueChange(e)}/>
            <label htmlFor='student' className='inline-flex items-center justify-between w-full gap-2 p-5 text-gray-400 transition-all duration-200 ease-in-out border-2 border-gray-700 rounded-lg cursor-pointer bg-opacity-10 bg-violet-900 peer-checked:text-accent peer-checked:border-accent hover:bg-purple-900 hover:bg-opacity-20'>
              <div className='block max-w-md'>
                <p className='text-2xl font-bold md:text-xl xl:text-2xl'>Student</p>
                <p className='text-sm md:text-xs xl:text-sm'>Discounted rate for students. Enjoy ad-free streaming, high-quality audio, and exclusive content. No sharing feature included.</p>
              </div>
              <div className='block'>
                <p className='text-2xl font-bold md:text-xl xl:text-2xl'>$2.99 <span className='text-base font-light'>/mo</span></p>
              </div>
            </label>
          </div>
          <div>
            <input type='radio' id='premium' name='plan' value='premium' className='hidden peer' required checked={selectedOption === 'premium'} onChange={(e)=>onValueChange(e)}/>
            <label htmlFor='premium' className='inline-flex items-center justify-between w-full gap-2 p-5 text-gray-400 transition-all duration-200 ease-in-out border-2 border-gray-700 rounded-lg cursor-pointer bg-opacity-10 bg-violet-900 peer-checked:text-accent peer-checked:border-accent hover:bg-purple-900 hover:bg-opacity-20'>
              <div className='block max-w-md'>
                <p className='text-2xl font-bold md:text-xl xl:text-2xl'>Premium</p>
                <p className='text-sm md:text-xs xl:text-sm'>Ad-free streaming, exclusive content, and sharing features. Dive into high-quality audio and discover new releases first.</p>
              </div>
              <div className='block'>
                <p className='text-2xl font-bold md:text-xl xl:text-2xl'>$4.99 <span className='text-base font-light'>/mo</span></p>
              </div>
            </label>
          </div>
          <button type='button' className='inline-block p-3 mt-6 transition-all duration-200 ease-in-out rounded-lg bg-accent hover:bg-purple-700'>Continue</button>
        </div>
      </div> */}
      <div className='grid items-center w-full gap-12 px-2 py-6 mt-2 mb-6 rounded-lg lg:gap-0 lg:flex justify-evenly bg-secondary h-fit md:py-20 md:px-8'>
        <div className='flex flex-col w-full gap-2 px-6'>
          {user && <p className='text-lg uppercase md:text-base xl:text-lg text-accent'>The last step</p>}
          <p className='text-4xl font-bold md:text-3xl xl:text-4xl'>Complete your paymanet</p>
        </div>
        <div className='flex flex-col w-full gap-2 bg-gray-800 rounded-md md:w-fit place-self-center'>
          <div className='flex items-center justify-between w-full px-8 py-4 border-b border-gray-700'>
            <p>Your plan</p>
            <p className='flex items-center uppercase'>STARTER <i className='p-1 ml-2 bg-green-600 rounded-full'><HiOutlineCheck/></i></p>
          </div>
          <div className='grid gap-3 px-8 py-4'>
            <div className='grid gap-2'>
              <label htmlFor="ccn">Credit Card Number:</label>
              <input id="ccn" type="number" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" className='bg-transparent border rounded-md'/>
            </div>
            <div className='grid items-end w-full gap-2 lg:flex'>
              <div className='grid gap-2 w-fit'>
                <label>Expiration date</label>
                <div className='flex'>
                  <input autoComplete='off' id='month' type='month' className='bg-transparent rounded-md'/>
                </div>
              </div>
              <div className='grid gap-2 w-fit'>
                <label htmlFor="ccn">Security code</label>
                <div className='flex'>
                  <input id="ccn" type="number" autoComplete='off' pattern="[0/9]*" maxLength={3} placeholder="CVV" className='bg-transparent border rounded-md'/>
                  <img src={CreditCard} alt="creditcard" className='w-12 h-12'/>
                </div>
              </div>
            </div>
            <button type='button' className='inline-block p-2 mt-4 bg-green-500 rounded-md'>Purchase</button>
          </div>
          <div className='inline-flex items-center justify-center px-8 pb-8'>
            <p className='flex items-center gap-2 text-sm text-gray-500'>Secured by <span className='text-xl font-bold'>Stripe</span> <i className='text-lg'><BsShieldCheck/></i></p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Subscribe