import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllUsers = () => {
    const axiosSecure = useAxiosSecure()
    // This is not being used!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const { data: allUsers, isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/all-users')
            console.log(res.data)
            return res.data
        }
    })

    return { allUsers, isLoading, refetch }
};

export default useAllUsers;