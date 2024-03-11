import axios from "axios";
import toast from "react-hot-toast";

async function hostImage(img) {
    try {
        const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`
        const imageFile = { image: img[0] }
        const res = await axios.post(IMAGE_HOSTING_API, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        if (res.data.success) {
            return (res.data.data.display_url);
        } else {
            return null
        }
    }
    catch (error) {
        toast.error('Image upload failed')
        return null
    }
}
export { hostImage }