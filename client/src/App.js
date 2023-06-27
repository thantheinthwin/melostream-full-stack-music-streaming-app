import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { AnimatePresence } from 'framer-motion';

import { app } from './config/firebase.config';
import { getAuth } from "firebase/auth";

import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

import { DashboardPage, LandingPage, LoginPage, SignUpPage, UserPage } from "./pages";

const App = () => {
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{user}, dispatch] = useStateValue();

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
            </div>
        </AnimatePresence>
    )
}

export default App;