import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AnimatePresence, motion } from "framer-motion";

import { AiOutlineMore } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import { BsTrash, BsInfoSquare } from 'react-icons/bs';

import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { removeUser } from '../../api';

import { app } from '../../config/firebase.config';
import { getAuth } from 'firebase/auth';

const DashboardUserCard = ({data, index, item}) => {
    const createdAt = moment(new Date(data.createdAt)).format("MMM Do YY");
  
    const [isMobile, setMobile] = useState(false);

    const [isDeleteConfirm, setDeleteConfirm] = useState(false);
  
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [dispatch] = useStateValue();
    const defaultImageURL = 'https://firebasestorage.googleapis.com/v0/b/mcc-music-web-project.appspot.com/o/images%2Fdefault%2Fprofile.webp?alt=media&token=97a1ef47-11ea-42ee-b397-3afb9f7aac75';

    const deleteUser = (uid) => {
      removeUser(uid).then((res) => {
        if(res){
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          })
        }
      })
    }

    useEffect(()=>{
      setMobile(window.innerWidth < 700)
    },[])
  
    return (
      <div>
        {/* Desktop View */}
        {!isMobile && (
          <motion.div
            variants={item}
            key={index}
            className="relative grid items-center grid-flow-col grid-cols-6 p-2 rounded-sm cursor-pointer col-span-full bg-neutral-900 hover:bg-neutral-800"
          >
            <button className="flex items-center col-span-1 justify-evenly">
              <div
                className="p-2 rounded-lg hover:bg-neutral-700"
                onClick={() => setDeleteConfirm(!isDeleteConfirm)}
              >
                <BsTrash className="text-xl text-red-500" />
              </div>
              <AnimatePresence>
                  {isDeleteConfirm && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.25,
                        },
                      }}
                      exit={{ opacity: 0 }}
                      className="absolute left-0 z-40 grid items-center grid-cols-2 grid-rows-2 gap-2 p-4 border rounded-lg shadow-xl bg-neutral-800 top-12"
                    >
                      <p className="col-span-2 row-span-1">
                        Are you sure you want to delete?
                      </p>
                      <span
                        className="col-span-1 row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-green-500 rounded-lg hover:bg-green-600"
                        onClick={() => deleteUser(data.user_id)}
                      >
                        Yes
                      </span>
                      <span
                        className="col-span-1 row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-red-500 rounded-lg hover:bg-red-600"
                        onClick={() => setDeleteConfirm(false)}
                      >
                        No
                      </span>
                    </motion.div>
                  )}
              </AnimatePresence>
              <img
                src={data.imageURL ? data.imageURL : defaultImageURL}
                alt={data._id}
                referrerPolicy='no-referrer'
                className="object-cover w-10 h-10 rounded-md shadow-md"
              />
            </button>
            <p className="col-span-1 text-sm text-center break-all">
              {data.name}
            </p>
            <p className="col-span-1 text-sm text-center break-all">
              {data.email}
            </p>
            <p className="col-span-1 text-sm text-center break-all">
              {data.subscription ? (
                <span>Subscribed</span>
              ) : (
                <span>Free user</span>
              )}
            </p>
            <p className="col-span-1 text-sm text-center break-all">
              {createdAt}
            </p>
            <div className="flex items-center justify-center col-span-1 gap-2">
              <Role title={data.role} />
            </div>
          </motion.div>
        )}

        {/* Mobile View */}
        {isMobile && (
          <motion.div variants={item} key={index}>
            <div className="relative z-30 grid items-center grid-flow-col grid-cols-4 p-2 rounded-sm cursor-pointer bg-neutral-900 col-span-full">
              <img
                src={data.imageURL}
                alt={data._id}
                className="object-cover w-10 h-10 col-span-1 bg-blue-100 rounded-md shadow-md justify-self-center"
              />
              <p className="col-span-2 text-base text-center break-word">
                {data.name}
              </p>
              <AiOutlineMore
                className="col-span-1 mr-4 text-2xl justify-self-end"
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  setDeleteConfirm(false);
                }}
              />
            </div>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { ease: "easeInOut", duration: 0.75 },
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                    transition: { ease: "easeInOut", duration: 0.5 },
                  }}
                  className="relative z-20 grid grid-flow-col grid-cols-4 p-2 divide-x rounded-b-sm bg-neutral-800 col-span-full"
                >
                  {/* <div className="grid items-center col-span-3 grid-rows-4 gap-1 p-2">
                    <p className="grid items-center grid-cols-5 col-span-1 text-sm break-word">
                      <span className="col-span-1 font-semibold">Role :</span>
                      <span className="col-span-4">
                        <Role title={data.role} />
                      </span>
                    </p>
                    <p className="grid grid-cols-5 col-span-1 text-sm break-all">
                      <span className="col-span-1 font-semibold">Email :</span>
                      <span className="col-span-4">{data.email}</span>
                    </p>
                    <p className="grid grid-cols-5 col-span-1 text-sm break-all">
                      <span className="col-span-1 font-semibold">Paid :</span>
                      <span className="col-span-4 text-sm font-semibold break-all">
                        {data.subscription ? (
                          <span>Subscribed</span>
                        ) : (
                          <span>Free user</span>
                        )}
                      </span>
                    </p>

                    <p className="grid grid-cols-5 col-span-1 text-sm break-all">
                      <span className="col-span-1 font-semibold">Date :</span>
                      <span className="col-span-4">{createdAt}</span>
                    </p>
                  </div> */}
                  <div className='flex flex-col justify-center col-span-3 gap-2 p-2'>
                    <div className='flex flex-col'>
                      <span className='font-semibold'>Role :</span>
                      <Role title={data.role}/>
                    </div>
                    <div className='flex flex-col'>
                      <span className="font-semibold">Email :</span>
                      <span className='break-all'>{data.email}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className="font-semibold">Paid :</span>
                      <span className="text-sm font-semibold break-all">
                        {data.subscription ? (
                          <span className='text-green-500'>Subscribed</span>
                        ) : (
                          <span className='text-red-500'>Free user</span>
                        )}
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <span className="font-semibold">Date :</span>
                      <span>{createdAt}</span>
                    </div>
                  </div>
                  <div className="relative grid items-center col-span-1 grid-rows-2 gap-1 p-2 text-xl">
                    {/* <div className='row-span-1 m-3 text-blue-500 justify-self-center'><HiOutlinePencil /></div> */}
                    <button
                      className="row-span-2 p-5 m-3 text-red-500 justify-self-center"
                      onClick={() => setDeleteConfirm(true)}
                    >
                      <BsTrash />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
            {isDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { ease: "easeInOut", duration: 0.75 },
                }}
                exit={{
                  opacity: 0,
                  y: -25,
                  transition: { ease: "easeInOut", duration: 0.5 },
                }}
                className="z-10 grid items-center justify-center grid-cols-2 grid-rows-2 px-4 py-2 gap-x-2 bg-neutral-700"
              >
                <p className="col-span-2 row-span-1 text-center">
                  Are you sure you want to delete?
                </p>
                <span
                  className="col-span-1 row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-green-500 rounded-lg hover:bg-green-600 hover:shadow-md"
                  onClick={() => deleteUser(data.user_id)}
                >
                  Yes
                </span>
                <span
                  className="col-span-1 row-span-1 p-2 text-center text-white transition-all duration-200 ease-in-out bg-red-500 rounded-lg hover:bg-red-600 hover:shadow-md"
                  onClick={() => setDeleteConfirm(false)}
                >
                  No
                </span>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    );
  }
  
  export const Role = ({title}) => {
    let bgColor = '';
  
    switch(title){
      case 'admin' :
        bgColor ='bg-red-700';
        break;
      default:
        bgColor = 'bg-green-800';
    }
  
    return(
      <span className={`px-2 py-1 text-sm rounded-2xl w-fit ${bgColor}`}>{title}</span>
    )
  }

  export default DashboardUserCard;