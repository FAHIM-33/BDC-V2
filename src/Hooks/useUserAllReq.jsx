import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserAllRequest = ({ itemPerPage, currentPage }) => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    let pgData = {
        itemPerPage,
        currentPage
    }
    const { data: request, isLoading, refetch } = useQuery({
        queryKey: ['my-donation-requests', itemPerPage, currentPage],
        queryFn: async () => {
            let res = await axiosSecure.post(`/api/v1/my-donation-request?email=${user?.email}`, pgData)
            return res.data
        }
    })

    return { request, isLoading, refetch }
};

export default useUserAllRequest;