import React, { useState, useEffect } from 'react'

import { getAllUsers } from '../../api';
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer';

import { motion } from 'framer-motion';
import DashboardUserCard from './DashboardUserCard';

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, [allUsers]);

  const tableHeaders = ['Profile', 'Name', 'Email', 'Subscribed', 'Created', 'Role'];
 
  // Variants
  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { ease: 'easeInOut', duration: 1 }},
    exit: { opacity: 0 }
  }
  
  return (
    <div className="grid grid-flow-col grid-cols-4 mt-2 col-span-full lg:grid-cols-6">
      {/* filter */}

      {/* tabular data form */}
      <div className="relative grid items-center justify-start grid-flow-col grid-cols-4 gap-3 p-4 m-2 transition-all duration-200 ease-in-out border border-gray-300 rounded-md col-span-full lg:grid-cols-6">
        {/* total number of users */}
        <div className="col-span-full">
          <p className="text-sm font-semibold">
            Count :{" "}
            <span className="text-xl font-bold">{allUsers?.length}</span>
          </p>
        </div>

        {/* table headers */}
        <div className="grid gap-2 grid-col-4 col-span-full lg:grid-cols-6">
          <div className="hidden grid-flow-col divide-x col-span-full lg:grid">
            {tableHeaders.map((header, i) => (
              <p
                key={i}
                className="col-span-1 text-sm font-semibold text-center"
              >
                {header}
              </p>
            ))}
          </div>
          <div className="grid grid-flow-col divide-x col-span-full lg:hidden">
            <p className="col-span-1 mb-3 text-base font-semibold text-center">
              Users
            </p>
          </div>

          {/* table body content */}
          {allUsers && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-1 col-span-full scrollbar-hide"
            >
              {allUsers?.map((data, i) => (
                <DashboardUserCard key={i} data={data} index={i} item={item} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardUsers