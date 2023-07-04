import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import {app} from '../config/firebase.config'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth'

//Google Icon
import { FcGoogle } from 'react-icons/fc'

import { NavLink, useNavigate } from 'react-router-dom'

//Importing picture
import { loginPic, Logo } from '../assets/img'

import { login, validateUser } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const Login = ({setAuth}) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const emailRef = useRef();

  const [{user}, dispatch] = useStateValue();
  
  // Logging in with Google Auth using firebase
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if(userCred){
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if(userCred){
            userCred.getIdToken().then((token) => {
             validateUser(token).then((data) => {
              dispatch({
                type: actionType.SET_USER,
                user: data,
              })
             })
          })
            navigate("/user/home", {replace: true})
          }else{
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            })
            navigate("/login");
          }
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // Routing the user back to home screen if the user has already logged in
  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true"){
      navigate("/user/home", {replace: true})
    }
  }, [])

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  // Login with email
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    signInWithEmailAndPassword(firebaseAuth, userData.email, userData.password).then((userCred) => {
      if(userCred){
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        setError(false);

        firebaseAuth.onAuthStateChanged((userCred) => {
          if(userCred){
            userCred.getIdToken().then((token) => {
              login(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data
                })
              })
            })
            navigate("/user/home", {replace: true})
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              data: null
            })
            navigate("/login")
          }
        })
      }
    }).catch((err) => {
      var errorCode = err.code;
      
      setError(true);

      switch(errorCode){
        case 'auth/user-not-found':
          setErrorMessage("User not found");
          break;
        case 'auth/wrong-password':
          setErrorMessage("Wrong password");
          break;
      }

      // if ( errorCode === 'auth/user-not-found' ){
      //   setErrorMessage("User not found");
      // }
      // else if ( errorCode === 'auth/wrong-password' ){
      //   setErrorMessage("Wrong password");
      // }
    })
    e.preventDefault();
  }

  const handle = (e) => {
    const newdata = {...userData }
    newdata[e.target.id] = e.target.value
    setUserData(newdata)
  }

  useEffect(() => {
    if( userData.email === "" || userData.password === "" ){
      setError(false);
    }
  },[userData])

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="grid grid-flow-col grid-rows-3 gap-4 p-12 text-white rounded-md shadow-xl bg-neutral-900 backdrop-blur-md lg:max-w-4xl lg:p-4 xl:max-w-6xl">
          <div className="hidden col-span-1 row-span-3 bg-white rounded-l-md lg:flex">
            <img
              src={loginPic}
              alt="loginPic"
              className="object-scale-down w-96"
            />
          </div>
          <div className="grid col-span-2 row-span-3 pb-5 space-y-10 justify-items-stretch lg:w-96">
            <div className="grid gap-2 mx-auto text-center lg:pt-12 ">
              <div className="flex justify-center w-full">
                <img
                  src={Logo}
                  alt="https://storyset.com/user"
                  className="w-1/4 lg:w-1/6"
                />
              </div>
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                Log In
              </h2>
              <p className="mt-2 text-sm font-light leading-4">
                Welcome to MeloStream,
                <br /> where music comes alive!
              </p>
            </div>
            <div className="w-full">
              <form className="grid w-full gap-4 m-auto md:w-4/5" method='POST'>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => handle(e)}
                    ref={emailRef}
                    className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md peer bg-neutral-900 caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
                  ></input>
                  <label
                    htmlFor="email"
                    className="absolute p-1 text-sm transition-all -top-4 left-2 bg-neutral-900 peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-neutral-900 peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
                  >
                    Email
                  </label>
                </div>
                
                
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => handle(e)}
                    className="w-full h-10 text-sm placeholder-transparent border border-gray-300 rounded-md peer bg-neutral-900 caret-blue-300 focus:rounded-md focus:border-0 focus:ring-2 focus:ring-inset focus:ring-blue-300"
                  ></input>
                  <label
                    htmlFor="password"
                    className="absolute p-1 text-sm transition-all -top-4 left-2 bg-neutral-900 peer-placeholder-shown:left-2 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-neutral-900 peer-focus:p-1 peer-focus:text-sm peer-focus:text-blue-300"
                  >
                    Password
                  </label>
                </div>
                {/* Error Message */}
                <AnimatePresence>
                  {error && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.25, ease: "easeInOut"}} className='text-sm text-center text-red-500'>{errorMessage}</motion.div>}
                </AnimatePresence>
                <div className="flex justify-center pt-1">
                  <input
                    id="agreedTerm"
                    name="agreedTerm"
                    type="checkbox"
                    className="rounded-md focus:ring-transparent"
                  ></input>
                  <label
                    htmlFor="agreedTerm"
                    className="ml-2 text-sm font-medium"
                  >
                    keep me logged in
                  </label>
                </div>
                <button className="py-2 text-black transition-all duration-200 ease-in-out rounded-md hover:bg-indigo-500 hover:text-white bg-primary" type='submit' onClick={(e) => handleSubmit(e)}>
                  Sign In
                </button>
                <div className="flex justify-center w-full justify-self-center">
                  <div
                    className="flex items-center justify-center w-full gap-2 px-4 py-4 text-white transition-all duration-200 ease-in-out border border-white rounded-md cursor-pointer hover:text-black hover:bg-white lg:py-2"
                    onClick={loginWithGoogle}
                  >
                    <FcGoogle className="text-2xl" />
                    Sign in with Google
                  </div>
                </div>
              </form>
            </div>
            <NavLink to={'/signup'} className="text-sm text-center transition-all duration-200 ease-in-out text-primary hover:underline">Don't have an account created ?</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login