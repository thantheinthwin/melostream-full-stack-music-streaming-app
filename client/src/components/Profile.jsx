import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { MdKeyboardArrowRight, MdOutlineSaveAlt } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import {AiOutlineInfoCircle} from 'react-icons/ai'

import { removeUser, updatePhoneNumber, updateProfileImage } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

import { app, storage } from '../config/firebase.config';
import { deleteUser as deleteAuthUser, getAuth, sendEmailVerification, updatePassword } from '@firebase/auth';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Profile = (props) => {
    const {open, handleClose} = props;
    const [{user}, dispatch] = useStateValue();
    const [image, setImage] = useState(null);

    useEffect(()=>{
      setImage(user?.user?.imageURL);
      // console.log('Image: ',image)
    },[])

    const navigate = useNavigate();

    const username = user?.user?.name;
    const email = user?.user?.email;
    const subscription = user?.user?.subscription;
    const role = user?.user?.role;
    const phnumber = user?.user?.ph_number;
    const email_verified = user?.user?.email_verified;
    const _id = user?.user?._id;
    const user_id = user?.user?.user_id;

    const defaultImageURL = 'https://firebasestorage.googleapis.com/v0/b/mcc-music-web-project.appspot.com/o/images%2Fdefault%2Fprofile.webp?alt=media&token=97a1ef47-11ea-42ee-b397-3afb9f7aac75';
    const uploadImage = async () => {
      if(image == null) return;
      const filename = image.name + v4();
      const imageRef = ref(storage, `images/user/${filename}`);

      uploadBytes(imageRef, image)
      .then(() => {
        console.log('Image uploaded');
        getDownloadURL(imageRef)
        .then((url) => {
          console.log('Url: ', url);
        })
      }).catch((error) => console.error(error))
    }
    // console.log(user);

    const firebaseAuth = getAuth(app);
    const currentUser = firebaseAuth.currentUser;
    // console.log(currentUser);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);

    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [resetConfirm, setResetConfirm] = useState(false);

    const deleteUser = (authUser, uid) => {
      deleteAuthUser(authUser).then(()=>{
        removeUser(uid).then(() => {
          firebaseAuth.signOut().then(() => {
            dispatch({
              type: actionType.SET_ALL_USERS,
              allUsers: null,
            })
            window.localStorage.setItem("auth", "false");
          }).catch((e) => console.log(e));
        })
      }).catch((error) => {
        console.log(error);
      })
    }

    //validate password
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const [validPassword, setValidPassword] = useState(false);
    const [matchPassword, setMatchPassword] = useState(false);

    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [passwd, setPasswd] = useState({
      newPasswd: '',
      confirmPasswd: ''
    })

    useEffect(() => {
      const result = PWD_REGEX.test(passwd.newPasswd);
      setValidPassword(result);
      const match = passwd.newPasswd === passwd.confirmPasswd;
      setMatchPassword(match);
    }, [passwd])

    const handle = (e) => {
      const newData = {...passwd}
      newData[e.target.id] = e.target.value
      setPasswd(newData)
    }

    const handleSubmitPasswd = async (newPasswd) => {
      updatePassword(currentUser, newPasswd).then(() => {
        setResetConfirm(false);
        // console.log("Password changed successfully");
      }).catch((error) => {
        console.log(error);
      })
    }

    const handleSubmitPhnumber = async (ph_number) => {
      updatePhoneNumber(user_id, ph_number).then((res) => {
        setEditPhoneNumber(false);
        dispatch({
          type: actionType.SET_USER,
          user: res,
        })
        // console.log(res);
      }).catch((error) => {
        console.log(error);
      })
    }

    const emailVerification = async (user) => {
      sendEmailVerification(user).then(() => {
        console.log("Email verified");
        firebaseAuth.signOut().then(() => {
          window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        window.location.replace('https://mail.google.com/mail/u/0/#inbox');
      }).catch((error) => {
        console.log(error);
      })
    }

    const getImage = (e) => {
      const fileItem = e.target.files[0];
      setImage(fileItem);
      // console.log("img:", fileItem?.name + v4());
    }

    return (
      <AnimatePresence>
        {open && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{type: 'spring', duration: 0.5}} className='absolute z-50 w-screen h-screen bg-black bg-opacity-50'>
          <motion.div initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.5}} transition={{type: 'spring', duration: 0.5}} className='fixed rounded-md top-0 bottom-0 left-0 right-0 grid gap-4 p-5 m-auto overflow-x-hidden overflow-y-auto bg-neutral-900 w-[calc(100%-1rem)] md:w-96 h-fit'>
            <div className='flex items-center justify-between'>
              <p className='text-3xl font-bold text-accent'>Profile</p>
              <i className='text-xl text-white rounded-full hover:bg-neutral-700' onClick={()=>{uploadImage().then(()=>{handleClose()})}}><IoCloseOutline/></i>
            </div>
            <div className='grid gap-2'>
              <label htmlFor='dropzone-file' className='relative w-fit'>
                <div className='absolute flex flex-col-reverse w-full h-full text-center transition-all duration-200 ease-in-out rounded-lg opacity-0 bg-zinc-700 bg-opacity-30 hover:opacity-100'><span className='rounded-b-lg bg-zinc-600'>edit</span></div>
                <img src={image ? URL.createObjectURL(image) : defaultImageURL} alt="profile pic" className='object-cover w-20 h-20 rounded-lg md:w-32 md:h-32' /> 
                <form method='POST'>
                  <input id='dropzone-file' type='file' accept='image/*' className='hidden' onChange={(e)=>getImage(e)}/> 
                </form>
              </label>
              {/* <div className='relative'>
                <img src={image ? URL.createObjectURL(image) : imageURL} alt="profile pic" className='object-cover w-24 h-24 rounded-lg' /> 
                <input type='file' accept='image/*' className='hidden' onChange={(e)=>getImage(e)}/>
              </div> */}
              <p className='font-medium'>Username</p>
              <p className='font-light'>{username}</p>
              <p className='font-medium'>Email</p>
              <p className='font-light'>{email}</p>
              <p className='font-medium'>Role</p>
              <p className={`px-2 py-1 text-xs rounded-full w-fit ${role === "admin" ? "bg-red-500" : "bg-green-500"}`}>{role}</p>
              <p className='font-medium'>Subscription</p>
              <p className={`cursor-default font-light border w-fit py-1 px-2 rounded-md select-none ${subscription ? 'text-green-500 border-green-500': 'text-red-500 border-red-500'}`}>{subscription ? "Subscribed" : "Free User"}</p>    
              <p className='font-medium'>Phone number</p>
              {!editPhoneNumber && <div className='flex items-center gap-2'>
                <p className={`font-light ${phnumber == '' ? "text-red-500": ""}`}>{phnumber == '' ? "unavailable": phnumber}</p>
                <i className='p-2 text-lg transition-all duration-200 ease-in-out rounded-md hover:bg-red-500 hover:bg-opacity-50 hover:text-red-500' onClick={()=> {setEditPhoneNumber(true)}}><HiOutlinePencilAlt/></i>
              </div>}
              {editPhoneNumber && <div className='flex items-center'>
                <input
                  id='tel'
                  type="tel"
                  placeholder={phnumber !== '' ? phnumber : 'Enter your phone number'}
                  value={phoneNumber}
                  onChange={(e)=>{setPhoneNumber(e.target.value)}}
                  className="w-full h-full bg-transparent border rounded-l-lg border-neutral-800 focus:border-neutral-800 focus:ring-0"
                ></input>
                <button className='h-full p-2 text-lg transition-all duration-200 ease-in-out bg-neutral-800 rounded-r-md hover:bg-neutral-700' onClick={()=>{handleSubmitPhnumber(phoneNumber)}}><MdOutlineSaveAlt/></button>
              </div>}
              {email_verified ? <p className='font-bold text-green-500'>Email verified</p> : <p className='flex items-center gap-1 transition-all duration-200 ease-in-out cursor-pointer hover:text-accent' onClick={() => {emailVerification(currentUser)}}>Verify email <i className='text-lg'><MdKeyboardArrowRight/></i></p>} 
            </div>
            <div className='p-2 text-sm text-red-500 border border-red-500 rounded-md cursor-default select-none w-fit hover:bg-red-500 hover:text-white justify-self-end' onClick={() => {setResetConfirm(true)}}>Reset password</div>
            <div className='p-2 text-sm text-red-500 border border-red-500 rounded-md cursor-default select-none w-fit hover:bg-red-500 hover:text-white justify-self-end' onClick={() => {setDeleteConfirm(true)}}>Delete account</div>
          </motion.div>
          
          {/* Reset password */}
          <AnimatePresence>
            {resetConfirm && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5, ease: 'easeInOut'}} className='absolute w-screen h-screen bg-black bg-opacity-50'>
              <div className='fixed top-0 bottom-0 left-0 right-0 grid gap-2 p-5 m-auto rounded-md bg-neutral-900 h-fit w-[calc(100%-3rem)] md:w-96 divide-y divide-neutral-600'>
                <h1 className='text-2xl font-bold text-center text-red-500'>Reset Password</h1>
                <div className='grid gap-2 pt-2'>
                  <form method='POST' className='grid gap-2'>
                    <div className='grid'>
                      <input
                        id='newPasswd'
                        type="password"
                        placeholder='Enter your new password'
                        value={passwd.newPasswd}
                        onChange={(e) => {handle(e)}}
                        onFocus={() => {setPwdFocus(true)}}
                        onBlur={() => {setPwdFocus(false)}}
                        className="w-full h-full text-sm bg-transparent border rounded-l-lg border-neutral-800 focus:border-neutral-800 focus:ring-0"
                      ></input>
                      <AnimatePresence>
                        {(pwdFocus && !validPassword) && 
                          <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} transition={{duration: 0.25, ease: "easeInOut"}} className='p-3 text-sm font-light border border-gray-300 rounded-md border-opacity-30 bg-secondary' id='pwdnote'>
                            <p className='flex items-center gap-1'><i><AiOutlineInfoCircle/></i> 8 to 24 characters.</p>
                            Must include uppercase and lowercase letters, a number and a special character.<br/>
                            Allowed special characters:
                            <span> !</span> <span>@</span> <span>#</span> <span>$</span>
                          </motion.div>}
                      </AnimatePresence>
                    </div>
                    <div className='grid'>
                      <input
                        id='confirmPasswd'
                        type="password"
                        placeholder='Confirm your password'
                        value={passwd.confirmPasswd}
                        onChange={(e) => {handle(e)}}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        className="w-full h-full text-sm bg-transparent border rounded-l-lg border-neutral-800 focus:border-neutral-800 focus:ring-0"
                      ></input>
                      <AnimatePresence>
                        {(matchFocus && !matchPassword) && <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} transition={{duration: 0.25, ease: "easeInOut"}} className='p-3 text-sm font-light border border-gray-300 rounded-md border-opacity-30 bg-secondary' id='matchnote'>Must match the first input format field</motion.div>}
                      </AnimatePresence>
                    </div>
                  </form>
                  <div className='flex items-center gap-2'>
                    {matchPassword ? <div className='w-full p-2 text-center bg-green-500 rounded-md cursor-default select-none' onClick={() => {handleSubmitPasswd(passwd.newPasswd)}}>Confirm</div> : <div className='w-full p-2 text-center rounded-md cursor-default select-none bg-neutral-700'>Nope</div>}
                    <div className='w-full p-2 text-center bg-red-500 rounded-md cursor-default select-none' onClick={() => {setResetConfirm(false)}}>Cancel</div>
                  </div>
                </div>
              </div>
            </motion.div>}
          </AnimatePresence>

          {/* Delete Account Confirmation */}
          <AnimatePresence>
            {deleteConfirm && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5, ease: 'easeInOut'}} className='absolute w-screen h-screen bg-black bg-opacity-50'>
              <div className='fixed top-0 bottom-0 left-0 right-0 grid gap-2 p-5 m-auto rounded-md bg-neutral-900 h-fit w-[calc(100%-3rem)] md:w-96'>
                <p className='text-center'>Are you sure you want to delete you account?</p>
                <div className='flex gap-2'>
                  <div className='w-full p-2 text-center bg-red-500 rounded-md cursor-default select-none' onClick={() => {deleteUser(currentUser, _id)}}>Delete</div>
                  <div className='w-full p-2 text-center bg-green-500 rounded-md cursor-default select-none' onClick={() => {setDeleteConfirm(false)}}>Cancel</div>
                </div>
              </div>
            </motion.div>}
          </AnimatePresence>
        </motion.div>}
      </AnimatePresence> 
    )
}

export default Profile