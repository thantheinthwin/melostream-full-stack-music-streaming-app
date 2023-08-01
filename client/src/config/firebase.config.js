import {getApp, getApps, initializeApp} from 'firebase/app';
import {getStorage} from "firebase/storage";
import {getAnalytics} from "firebase/analytics"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID ,
    appId: process.env.REACT_APP_FIREBASE_APP_ID ,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const analytics = getAnalytics(app);

export {app, storage, analytics};