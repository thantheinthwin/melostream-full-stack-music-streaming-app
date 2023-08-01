import { songPlayed } from "../api";
import { analytics } from "../config/firebase.config";
import { logEvent } from "firebase/analytics";

export const pageVisit = () => {
    try {
        logEvent(analytics, 'page_view');
    } catch (error) {
        console.error('Error logging page view:', error);
    }
}

export const subscribe = (user) => {
    const { user_id } = {...user}
    try {
        logEvent(analytics, 'subscribe', { user_id: user_id })
    } catch (error) {
        console.error('Error logging subscribe:', error);
    }
}

export const playSong = (song_id, name) => {
    try {
        logEvent(analytics, 'songPlayed', { song_id: song_id, name: name })
        songPlayed(song_id);
    } catch (error) {
        console.error('Error logging play:', error);
    }
}

export const upload = () => {
    try {
        logEvent(analytics, 'upload');
    } catch (error) {
        console.error('Error logging upload: ', error);
    }
}

export const logSignUp = () => {
    try {
        
    } catch (error) {
        console.error('Error logging sign up: ', error)
    }
}