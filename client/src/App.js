import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from 'framer-motion';

import { app } from './config/firebase.config';
import { getAuth } from "firebase/auth";

import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

import { DashboardPage, LandingPage, LoginPage, SignUpPage, UserPage } from "./pages";
import { MusicPlayer } from "./components";

const App = () => {
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{user, isSongPlaying, showMusicPlayer}, dispatch] = useStateValue();

    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");
    
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if(userCred){
                userCred.getIdToken().then((token) => {
                    // console.log(token);
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        })
                    })
                })
            }else{
                setAuth(false);
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                })
                window.localStorage.setItem("auth", "false");
               
                navigate('/');
            }
        })
    }, []);

    return (
        <AnimatePresence mode="wait">
            <div className="flex items-center justify-center font-primary">
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/login" element={<LoginPage setAuth={setAuth}/>}/>
                    <Route path='/signup' element={<SignUpPage setAuth={setAuth}/>} />

                    <Route path="/user/*" element={<UserPage />}/>
                    <Route path="/dashboard/*" element={<DashboardPage />} />
                </Routes>

                <AnimatePresence>
                {(isSongPlaying && showMusicPlayer) && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 50}}
                        transition={{duration: 0.5}}
                        className={window.innerWidth < 700 ? "fixed p-2 bottom-14 bg-neutral-800 w-full rounded-t-lg" : "fixed p-4 bottom-0 bg-neutral-800 w-2/3 right-0 mr-2"}
                    >
                        <MusicPlayer/>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </AnimatePresence>
    )
}

export default App;