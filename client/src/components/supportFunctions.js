import { deleteObject, ref } from "firebase/storage"
import { storage } from "../config/firebase.config"

export const deleteFileObject = async (url) => {
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef)
    .then(()=>console.log('Image deleted successfully'))
    .catch((err)=>console.error(err))
}