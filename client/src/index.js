import React from 'react';
import ReactDOM from 'react-dom/client';

import 'react-h5-audio-player/lib/styles.css'
import './index.css';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer from './context/reducer';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App/>
      </StateProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
