import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../Components/Heading";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


const Details = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [req, setReq] = useState({})
    const { user, loading } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const nav = useNavigate()


    useEffect(() => {
        axiosSecure.get(`/api/v1/request/${id}`)
            .then((res) => {
                setReq(res.data)
            })
            .catch(() => console.log('Something went wrong'))
    }, [axiosSecure, id])

    if (loading || !req) { return <Loading></Loading> }

    function handleDonate() {
        Swal.fire({
            title: "<strong>Donate as,</strong>",
            html: `
            <input class='my-1 inModal outline-none' value=${user?.displayName} readonly type="text" readOnly>
            <br>
            <input class='my-1 inModal outline-none' mt-4' value=${user?.email} readonly type="text" readOnly>
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Confirm',
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: 'Cancel',
            cancelButtonAriaLabel: "Thumbs down",
            confirmButtonColor: "#17fa17",
            cancelButtonColor: "#ff0000",
        }).then(result => {
            if (result.isConfirmed) {
                const body = {
                    requestStatus: 'in progress',
                    donorName: user?.displayName,
                    donorEmail: user?.email
                }
                let toastId = toast.loading('Donating..')
                axiosSecure.put(`/api/v1/status-update/${id}`, body)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            toast.success('Donation now in progress', { id: toastId })
                            queryClient.invalidateQueries('pending-requests')
                            nav(-1)
                        }
                    })
                    .catch(() => {
                        toast.error('Failed', { id: toastId })
                    })
            }
        })
    }

    return (
        <section className="pt-12 text-xl text-center cont">
            <Heading>Details</Heading>
            <p className="font-bold">Requester Name: {req.name}</p>
            <p className="mt-2">Requester Email: {req.email}</p>
            <p className="mt-2">Recipient Name: {req.receipentName}</p>
            <p className="mt-2">District: {req.district}</p>
            <p className="mt-2">Upazilla: {req.upazila}</p>
            <p className="mt-2">Hospital: {req.hospital}</p>
            <p className="mt-2">Full Address: {req.fullAddress}, {req.upazila}, {req.district}</p>
            <div className="bg-fadegray">
                <p className="mt-2">Donating Date: {req.date}</p>
                <p className="mt-2">Donating Time: {req.time}</p>
            </div>
            <p className="mt-2">Why do I need this donation? : {req.message}</p>

            {req.requestStatus !== 'pending' && (
                <div className="mt-4 bg-fadegray">
                    <p className="font-bold">Donor Name: {req.donorName}</p>
                    <p className="mt-2">Donor Email: {req.donorEmail}</p>
                </div>
            )}

            <button
                onClick={handleDonate}
                className="btn w-2/5 bg-prim rounded-md p-2 mx-auto mt-8 text-2xl">Donate</button>
        </section>
    );
};

export default Details;