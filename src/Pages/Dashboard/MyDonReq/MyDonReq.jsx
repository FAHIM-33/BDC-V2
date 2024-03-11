import { Helmet } from "react-helmet";
import Heading from "../../../Components/Heading";

import ReqTable from "../Shared/ReqTable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserAllRequest from "../../../Hooks/useUserAllReq";

const MyDonReq = () => {
    const { user } = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [totalDocs, setTotalDocs] = useState(0)
    const axiosSecure = useAxiosSecure()
    const { request, isLoading, refetch } = useUserAllRequest({ itemPerPage, currentPage })



    useEffect(() => {
        refetch()
    }, [refetch])

    useEffect(() => {
        axiosSecure.get(`/api/v1/my-don-req-count?email=${user?.email}`)
            .then(res => setTotalDocs(res.data.count))
            .catch(err => { console.log(err) })
    }, [axiosSecure, user?.email])


    // const data = useUserAllReq({ itemPerPage, currentPage })


    let totalPage = Math.ceil(totalDocs / itemPerPage)
    let pages = [...Array(totalPage).keys()]

    function handleItemsPerPage(e) {
        setItemPerPage(e.target.value)
        setCurrentPage(0)
    }


    return (
        <section>
            <Helmet><title>My requests</title></Helmet>
            <Heading>All requests:</Heading>
            <ReqTable data={{request, isLoading, refetch}}></ReqTable>

            <section className='pagination-container flex gap-8 my-8 w-fit mx-auto'>
                <button
                    className="bg-high p-2 rounded-md text-background"
                    onClick={() => { currentPage > 0 && setCurrentPage((currentPage - 1)) }}>Prev</button>
                {
                    pages.map(num => <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={currentPage === num ? 'selectedPage' : ''}
                    >{num}</button>)
                }
                <button
                    className="bg-high p-2 rounded-md text-background"
                    onClick={() => { currentPage < totalPage - 1 && setCurrentPage((currentPage + 1)) }}
                >Next</button>
                <select className="bg-low rounded-md p-2" name="item" value={itemPerPage} onChange={handleItemsPerPage} id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>

            </section>

        </section>

    );
};

export default MyDonReq;