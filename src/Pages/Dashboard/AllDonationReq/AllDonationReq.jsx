
import { useEffect, useState } from "react";
import Heading from "../../../Components/Heading";
import ReqTable from "../Shared/ReqTable";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Components/Loading";
import { useQuery } from "@tanstack/react-query";

const AllDonationReq = () => {
    const [totalDocs, setTotalDocs] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/api/v1/all-req-count')
            .then(res => setTotalDocs(res.data.count))
            .catch(err => { console.log(err) })
    }, [axiosPublic])


    const { data: request, isLoading, refetch } = useQuery({
        queryKey: ['page_req', currentPage, itemPerPage],
        queryFn: async () => {
            let res = await axiosPublic.get(`/api/v1/paginated-all-req?size=${itemPerPage}&currentPage=${currentPage}`)
            return res.data
        }
    })

    let totalPage = Math.ceil(totalDocs / itemPerPage)
    let pages = [...Array(totalPage).keys()]

    const handleItemsPerPage = (e) => {
        setItemPerPage(e.target.value)
        setCurrentPage(0)
    }


    if (isLoading) { return <Loading></Loading> }

    return (
        <section>
            <Heading>All Blood Donation Requests</Heading>
            <ReqTable data={{ request, isLoading, refetch }}></ReqTable>

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

export default AllDonationReq;