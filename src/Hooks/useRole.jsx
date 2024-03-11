import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()


    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        axiosSecure.get(`/api/v1/user?email=${user?.email}`)
            .then(res => {
                setData(res.data.role)
                setLoading(false)
            })
    }, [user?.email, axiosSecure])


    // const { data, isLoading: isRoleLoading } = useQuery({
    //     queryKey: ['userRole'],
    //     queryFn: async () => {
    //         let res = await axiosSecure.get(`/api/v1/user?email=${user?.email}`)
    //         return res.data.role
    //     }
    // })



    // console.log(data)
    return {
        admin: data === 'admin' ? true : false,
        volunteer: data === 'volunteer' ? true : false,
        isRoleLoading : loading
    }

};

export default useRole;