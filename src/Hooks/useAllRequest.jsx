import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllRequest = () => {
    const axiosSecure = useAxiosSecure()

    const { data: request, isLoading, refetch } = useQuery({
        queryKey: ['all-requests'],
        queryFn: async () => {
            let res = await axiosSecure.get('/api/v1/my-donation-request')
            return res.data
        }
    })
    return { request, isLoading, refetch }
};

export default useAllRequest;