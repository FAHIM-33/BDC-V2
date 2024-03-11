import axios from "axios";
import { useEffect } from "react";
import auth from "../config/firebase.config";
import { signOut } from "firebase/auth";

const secureInstance = axios.create({
    // baseURL: 'https://assignment12-bay.vercel.app',
    baseURL: 'http://localhost:5000',
    // withCredentials: true,
})

const useAxiosSecure = () => {
    
    useEffect(() => {
        secureInstance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            let stat = error.response.status
            if (stat === 401 || stat === 403) {
                console.log('Ordho Chondro')
                // signOut(auth)
            }
            return Promise.reject(error);
        });
    }, [])

    return secureInstance
};

export default useAxiosSecure;