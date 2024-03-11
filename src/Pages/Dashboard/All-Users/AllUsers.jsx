import Heading from "../../../Components/Heading";
import { MdBlock } from "react-icons/md";
import Loading from "../../../Components/Loading";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Filter from "./Filter";
import { useQuery } from "@tanstack/react-query";


const AllUsers = () => {
    // const { allUsers, isLoading, refetch } = useAllUsers()
    const [totalDocs, setTotalDocs] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([])

    useEffect(() => {
        axiosSecure.get('/api/v1/all-stats')
            .then(res => setTotalDocs(res.data.totalUser))
            .catch(err => { console.log(err) })
    }, [axiosSecure])

    const { data: allUsers, isLoading, refetch } = useQuery({
        queryKey: ['page_user', currentPage, itemPerPage],
        queryFn: async () => {
            let res = await axiosSecure.get(`/api/v1/paginated-all-users?size=${itemPerPage}&currentPage=${currentPage}`)
            return res.data
        }
    })

    useEffect(() => {
        setUsers(allUsers)
    }, [allUsers])

    console.log(users?.length)

    function handleRole(id, role) {
        axiosSecure.get(`/api/v1/update-user/${id}?role=${role}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    return toast.success(`Promoted to ${role}`)
                }
                toast(`Already ${role}`)
            })
            .catch(() => toast.error('Could not update'))
    }

    function handleFilter(str) {
        if (!str) { return setUsers(allUsers) }
        let filteredUsers = allUsers?.filter(obj => obj.status === str)
        setUsers(filteredUsers)
    }

    function handleStatus(id, status) {
        axiosSecure.get(`/api/v1/update-user/${id}?status=${status}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    return toast.success(`User ${status}`)
                }
                toast(`Already ${status}`)
            })
            .catch(() => toast.error('Could not update'))
    }



    let totalPage = Math.ceil(totalDocs / itemPerPage)
    let pages = [...Array(totalPage).keys()]

    const handleItemsPerPage = (e) => {
        setItemPerPage(e.target.value)
        setCurrentPage(0)
        refetch()
    }

    if (isLoading) { return <Loading></Loading> }

    return (
        <section>
            <Heading>All Users</Heading>
            <section>
                <Filter
                    handleFilter={handleFilter}
                ></Filter>
                <div className="p-4">
                    <table className="">
                        <thead className="bg-fadegray">
                            <tr className="">
                                <th>Image</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Give role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map(usr => <tr key={usr._id}>
                                    <td className="">
                                        <img className="w-10 h-10 mx-auto" src={usr.img} alt="" />
                                    </td>
                                    <td>{usr.email}</td>
                                    <td>{usr.name}</td>
                                    <td className={`${usr.status == 'active' ? 'text-sec' : 'text-prim'} `}>
                                        {usr.status}
                                    </td>
                                    <td>
                                        {
                                            usr.status === 'active' ?
                                                <button className="btn px-2 text-white font-semibold py-1 mx-auto bg-prim rounded-md"
                                                    onClick={() => handleStatus(usr._id, 'blocked')}
                                                >
                                                    <MdBlock className="text-xl"></MdBlock>
                                                    Block</button>
                                                :
                                                <button className="btn px-2 text-black font-semibold py-1 mx-auto bg-sec rounded-md"
                                                    onClick={() => handleStatus(usr._id, 'active')}
                                                >Unblock</button>
                                        }
                                    </td>
                                    <td className="">

                                        {
                                            usr.role === 'admin' ?
                                                "(Admin)"
                                                :
                                                <div className="flex gap-1 justify-center font-semibold mx-auto">

                                                    <button className="px-2 py-1 btn rounded-md border border-prim text-prim "
                                                        onClick={() => handleRole(usr._id, 'admin')}
                                                    >Admin</button>

                                                    < button className="px-2 rounded-md py-1 btn text-sec border border-sec"
                                                        onClick={() => handleRole(usr._id, 'volunteer')}
                                                    >Volunteer</button>
                                                </div>
                                        }
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </section>

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
        </section >
    );
};

export default AllUsers;