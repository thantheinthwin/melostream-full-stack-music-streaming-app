import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer';
import { getAuth } from '@firebase/auth';
import { app } from '../config/firebase.config';

import { HiOutlineCheck } from 'react-icons/hi2'
import { BsShieldCheck } from 'react-icons/bs'
import { MdOutlineArrowBackIos } from 'react-icons/md'

import { CreditCard } from '../assets/img';
import { purchase } from '../api';
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const [{user}, dispatch] = useStateValue();
  const [selectedOption, setSelectedOption] = useState(null);
  const [productId, setProductId] = useState(null);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setSelectedOption(e.target.value);
    setProductId(e.target.id)
  }

  useEffect(()=>{
    if(!user){
      dispatch({
        type: actionType.SET_USER,
        user: getAuth(app).currentUser
      })
    }
  },[user])

  // console.log(selectedOption);
  return (
    <div className="flex h-full max-h-[calc(100%-7rem)] w-full overflow-y-scroll p-2 md:items-center md:overflow-y-hidden md:p-4 lg:max-h-[calc(100%-2rem)]">
      {user?.user?.subscription && (
        <div className="flex items-center justify-center w-full p-8 bg-secondary">
          <p className="text-3xl">You have already subscribed</p>
        </div>
      )}

      {!clicked && !user?.user?.subscription && (
        <div className="grid items-center w-full gap-4 py-6 mt-2 mb-6 rounded-lg h-fit justify-evenly bg-secondary md:px-10 md:py-20 lg:flex">
          <div className="flex flex-col gap-2 px-6 w-fit">
            {user && (
              <p className="text-lg uppercase text-accent md:text-base xl:text-lg">
                Welcome to melostream, {user?.user?.name}
              </p>
            )}
            <p className="text-4xl font-bold md:text-3xl xl:text-4xl">
              Select your Stream plan
            </p>
          </div>
          <div className="flex flex-col gap-3 px-6 w-fit">
            <div className="select-none">
              <input
                type="radio"
                id="price_1NZDoHJf8SCWWuDoxWYAbLoD"
                name="plan"
                value="basic"
                className="hidden peer"
                required
                checked={selectedOption === "basic"}
                onChange={(e) => onValueChange(e)}
              />
              <label
                htmlFor="price_1NZDoHJf8SCWWuDoxWYAbLoD"
                className="inline-flex items-center justify-between w-full gap-2 p-5 text-gray-400 transition-all duration-200 ease-in-out border-2 border-gray-700 rounded-lg cursor-pointer bg-violet-900 bg-opacity-10 hover:bg-purple-900 hover:bg-opacity-20 peer-checked:border-accent peer-checked:text-accent"
              >
                <div className="block max-w-md">
                  <p className="text-2xl font-bold md:text-xl xl:text-2xl">
                    Basic
                  </p>
                  <p className="text-sm md:text-xs xl:text-sm">
                    Unlimited access to a vast library of songs and playlists.
                    Enjoy personalized recommendations with occasional ads.
                  </p>
                </div>
                <div className="block">
                  <p className="text-2xl font-bold md:text-xl xl:text-2xl">
                    Free
                  </p>
                </div>
              </label>
            </div>
            <div className="select-none">
              <input
                type="radio"
                id="price_1NZDpAJf8SCWWuDoT4nDbGUb"
                name="plan"
                value="student"
                className="hidden peer"
                required
                checked={selectedOption === "student"}
                onChange={(e) => onValueChange(e)}
              />
              <label
                htmlFor="price_1NZDpAJf8SCWWuDoT4nDbGUb"
                className="inline-flex items-center justify-between w-full gap-2 p-5 text-gray-400 transition-all duration-200 ease-in-out border-2 border-gray-700 rounded-lg cursor-pointer bg-violet-900 bg-opacity-10 hover:bg-purple-900 hover:bg-opacity-20 peer-checked:border-accent peer-checked:text-accent"
              >
                <div className="block max-w-md">
                  <p className="text-2xl font-bold md:text-xl xl:text-2xl">
                    Student
                  </p>
                  <p className="text-sm md:text-xs xl:text-sm">
                    Discounted rate for students. Enjoy ad-free streaming,
                    high-quality audio, and exclusive content. No sharing
                    feature included.
                  </p>
                </div>
                <div className="block">
                  <p className="text-2xl font-bold md:text-xl xl:text-2xl">
                    $2.99 <span className="text-base font-light">/ mo</span>
                  </p>
                </div>
              </label>
            </div>
            <div className="select-none">
              <input
                type="radio"
                id="price_1NZDqIJf8SCWWuDoNHNZBNbc"
                name="plan"
                value="premium"
                className="hidden peer"
                required
                checked={selectedOption === "premium"}
                onChange={(e) => onValueChange(e)}
              />
              <label
                htmlFor="price_1NZDqIJf8SCWWuDoNHNZBNbc"
                className="inline-flex items-center justify-between w-full gap-2 p-5 text-gray-400 transition-all duration-200 ease-in-out border-2 border-gray-700 rounded-lg cursor-pointer bg-violet-900 bg-opacity-10 hover:bg-purple-900 hover:bg-opacity-20 peer-checked:border-accent peer-checked:text-accent"
              >
                <div className="block max-w-md">
                  <p className="text-2xl font-bold md:text-xl xl:text-2xl">
                    Premium
                  </p>
                  <p className="text-sm md:text-xs xl:text-sm">
                    Ad-free streaming, exclusive content, and sharing features.
                    Dive into high-quality audio and discover new releases
                    first.
                  </p>
                </div>
                <div className="block">
                  <p className="text-2xl font-bold md:text-xl xl:text-2xl">
                    $4.99 <span className="text-base font-light">/ mo</span>
                  </p>
                </div>
              </label>
            </div>
            <button
              type="button"
              className="inline-block p-3 mt-6 transition-all duration-200 ease-in-out rounded-lg bg-accent hover:bg-purple-700"
              onClick={() => {
                if (selectedOption !== null) {
                  switch(selectedOption){
                    case 'basic':
                      break;
                    case 'student':
                      purchase(user?.user?.user_id).then(() => {
                        console.log(user?.user?.user_id);
                        navigate('/user/home', {replace: true})
                        window.location.assign('https://buy.stripe.com/test_9AQ02Vb9cf3x4a4144')
                      });
                      break;
                    case 'premium':
                      purchase(user?.user?.user_id).then(() => {
                        console.log(user?.user?.user_id);
                        navigate('/user/home', {replace: true})
                        window.location.assign('https://buy.stripe.com/test_6oE3f7dhk6x1dKEbIJ')
                      });
                      break;
                    default:
                      break;
                  }
                  setClicked(true);
                } else {
                  alert("Choose a plan");
                }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Last Step
      {clicked && !user?.user?.subscription && (
        <div className="relative grid items-center w-full gap-12 px-2 py-6 mt-2 mb-6 rounded-lg h-fit justify-evenly bg-secondary md:px-8 md:py-20 lg:flex lg:gap-0">
          <div className="flex flex-col gap-2 px-6 mt-8 w-fit md:mt-0">
            {user && (
              <p className="text-lg uppercase text-accent md:text-base xl:text-lg">
                The last step
              </p>
            )}
            <p className="text-4xl font-bold md:text-3xl xl:text-4xl">
              Complete your payment
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 bg-gray-800 rounded-md place-self-center md:w-fit">
            <div className="flex items-center justify-between w-full px-8 py-4 border-b border-gray-700">
              <p>Your plan</p>
              <p className="flex items-center uppercase">
                {selectedOption}{" "}
                <i className="p-1 ml-2 bg-green-600 rounded-full">
                  <HiOutlineCheck />
                </i>
              </p>
            </div>
            <div className="grid gap-3 px-8 py-4">
              <div className="grid gap-2">
                <label htmlFor="ccn">Credit Card Number:</label>
                <input
                  id="ccn"
                  type="number"
                  pattern="[0-9\s]{13,19}"
                  autoComplete="cc-number"
                  maxLength="19"
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="bg-transparent border rounded-md"
                />
              </div>
              <div className="grid items-end w-full gap-2 lg:flex lg:items-center">
                <div className="grid w-full gap-2">
                  <label>Expiration date</label>
                  <div className="flex">
                    <input
                      autoComplete="off"
                      id="month"
                      type="month"
                      className="w-full bg-transparent rounded-md"
                    />
                  </div>
                </div>
                <div className="grid w-full gap-2">
                  <label htmlFor="ccn">Security code</label>
                  <div className="flex">
                    <input
                      id="ccn"
                      type="number"
                      autoComplete="off"
                      pattern="[0/9]*"
                      maxLength={3}
                      placeholder="CVV"
                      className="w-full bg-transparent border rounded-md"
                    />
                    <img
                      src={CreditCard}
                      alt="creditcard"
                      className="w-12 h-12"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="inline-block p-2 mt-4 bg-green-500 rounded-md"
                onClick={() => {
                  purchase(user?.user?.user_id).then(() => {
                    console.log(user?.user?.user_id);
                    alert("Subscription successful");
                    navigate('/user/home', {replace: true})
                  });
                }}
              >
                Purchase
              </button>
            </div>
            <div className="inline-flex items-center justify-center px-8 pb-8">
              <p className="flex items-center gap-2 text-sm text-gray-500">
                Secured by <span className="text-xl font-bold">Stripe</span>{" "}
                <i className="text-lg">
                  <BsShieldCheck />
                </i>
              </p>
            </div>
          </div>
          <i
            className="absolute top-0 left-0 p-2 m-5 transition-all duration-200 ease-in-out rounded-lg hover:bg-accent"
            onClick={() => {
              setClicked(false);
            }}
          >
            <MdOutlineArrowBackIos />
          </i>
        </div>
      )} */}
    </div>
  );
}

export default Subscribe