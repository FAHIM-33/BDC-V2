import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import useRole from "../../../Hooks/useRole";
import { useEffect, useState } from "react";
import FilterStatus from "./FilterStatus";


const ReqTable = ({ data }) => {
    const { request, isLoading, refetch } = data
    const axiosSecure = useAxiosSecure()
    const { volunteer, isRoleLoading } = useRole()
    const [modded, setModded] = useState([])

    useEffect(() => { setModded(request) }, [request])

    function handleStatus(id, str) {
        axiosSecure.put(`/api/v1/status-update/${id}`, { requestStatus: str })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    toast.success(`Request ${str}`)
                    refetch()
                }
            })
            .catch(() => toast.error("Failed"))
    }

    function handleDelete(id) {
        if (volunteer) { return toast.error('Access Denied') }
        Swal.fire({
            title: "Delete request?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff0000",
            cancelButtonColor: "#333",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                let toastId = toast.loading('Deleting donation request..')
                axiosSecure.delete(`/api/v1/delete-donation-request/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            toast.success('Deleted successfully', { id: toastId })
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        toast.error('Failed to delete', { id: toastId })
                    })

            }
        });
    }

    function handleFilter(str) {
        if (!str) { return setModded(request) }
        let filteredArr = request?.filter(obj => obj.requestStatus === str)
        setModded(filteredArr)
    }




    if (isLoading || isRoleLoading) { return <Loading></Loading> }

    return (
        <section className="text-high">
            <FilterStatus handleFilter={handleFilter}></FilterStatus>
            <div className="p-4">
                <table className="">
                    <thead className="bg-[#1d1d1d] sticky top-0">
                        <tr className=""> 
                            <th>Receipent</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            {
                                volunteer ||
                                <th>Action</th>

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            modded?.map(req => <tr key={req._id}>
                                <td>{req.receipentName}</td>
                                <td className="text-low">
                                    <p>{req.district}, {req.upazilla}</p>
                                    <p>{req.fullAddress}</p>
                                </td>
                                <td>{req.date}</td>
                                <td>{req.time}</td>
                                <td >
                                    <div>
                                        <p className={`${req.requestStatus == 'in progress' ? 'text-amber-400'
                                            : req.requestStatus == 'done' ? 'text-sec'
                                                : req.requestStatus == 'cancelled' ? 'text-prim'
                                                    : 'text-low'} `}>
                                            {req.requestStatus}
                                        </p>
                                        {
                                            req.requestStatus == 'in progress' &&
                                            <div>
                                                <p>by, {req.donorName}<br />{req.donorEmail}</p>
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleStatus(req._id, 'done')}
                                                        className="btn bg-sec text-black p-1 rounded-md font-medium">Done</button>
                                                    <button
                                                        onClick={() => handleStatus(req._id, 'cancelled')}
                                                        className="btn bg-prim text-white p-1 rounded-md font-medium">Cancel</button>

                                                </div>
                                            </div>
                                        }
                                    </div>
                                </td>

                                {
                                    volunteer ||
                                    <td>
                                        <div className="flex items-center justify-center gap-2 text-2xl">
                                            <Link to={`/donation-request/details/${req._id}`}>
                                                <button className="text-high btn p-2" title="View details">
                                                    <FaEye></FaEye>
                                                </button>
                                            </Link>
                                            <Link to={`/dashboard/edit/${req._id}`}>
                                                <button className="text-sec btn p-2">
                                                    <FaRegEdit></FaRegEdit>
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(req._id)}
                                                className="text-prim btn p-2">
                                                <FaTrashAlt></FaTrashAlt>
                                            </button>
                                        </div>

                                    </td>}

                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ReqTable;