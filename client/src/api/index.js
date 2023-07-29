import axios from 'axios';

const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/loginWithGoogle`, {
            headers : {
                Authorization : "Bearer " + token,
            }
        })
        return res.data;
    } catch (error) {
        return null;
    }
};

export const login = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers : {
                Authorization : "Bearer " + token,
            }
        })
    } catch (error) {
        return null;
    }
}

export const signup = async (userData, token) => {
    const {username} = userData;

    try {
        const res = await fetch(`${baseURL}api/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : "Bearer " + token
            },
            body: JSON.stringify({
                username
            })
        })
        return res.json();
    } catch (error) {
        return null;
    }
}

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllArtists = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artists/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}api/albums/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/songs/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const removeUser = async (userId) => {
    try {
        const res = await axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const deleteAuthUser = async (user_id) => {
    try {
        const res = await axios.delete(`${baseURL}api/users/deleteAuthUser/${user_id}`);
        console.log(res.data);
        return res;
    } catch (error) {
        return null;
    }
}

export const addSong = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/songs/save`, {...data});
        return (await res).data.song;
    } catch (error) {
        return null;
    }
}

export const removeSong = async (songId) => {
    try {
        const res = await axios.delete(`${baseURL}api/songs/delete/${songId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const removeAlbum = async (albumId) => {
    try {
        const res = await axios.delete(`${baseURL}api/albums/delete/${albumId}`);
        return res;
    } catch (error) {
        return null;
    }
}

export const addArtist = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/artists/save`, {...data});
        return (await res).data.artist;
    } catch (error) {
        return null;
    }
}

export const removeArtist = async (artistId) => {
    try {
        const res = await axios.delete(`${baseURL}api/artists/delete/${artistId}`);
        return res;
    } catch (error) {
        return null;
    }
}

export const updatePhoneNumber = async (user_id, ph_number) => {
    try {
        const res = await axios.post(`${baseURL}api/users/updatePhoneNumber/${user_id}/${ph_number}`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const updateProfileImage = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/users/updateProfileImage`, {...data});
        return (await res).data;
    } catch (error) {
        return null;
    }
}

export const changeAccount = async (user_id) => {
    try {
        const res = await axios.get(`${baseURL}api/users/changeAccountType/${user_id}`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const likeSong = async (user_id, songId) => {
    try {
        const res = await axios.get(`${baseURL}api/songs/like/${user_id}/${songId}`)
        return res.data;
    } catch (error) {
        return null;
    }
} 
export const unLikeSong = async (user_id, songId) => {
    try {
        const res = await axios.get(`${baseURL}api/songs/unlike/${user_id}/${songId}`)
        return res.data;
    } catch (error) {
        return null;
    }
} 

export const purchase = async (user_id) => {
    try {
        const res = axios.get(`${baseURL}api/users/purchase/${user_id}`);
        return res.data;
    } catch (error) {
        return null;
    }
}