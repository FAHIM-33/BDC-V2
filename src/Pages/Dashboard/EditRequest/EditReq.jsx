import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../../Components/Loading";
import Heading from "../../../Components/Heading";
import useAddress from "../../../Hooks/useAddress";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


const EditReq = () => {
    // const { user, loading } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const { district, upazila } = useAddress()
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const [req, setReq] = useState({})
    const nav = useNavigate()

    useEffect(() => {
        axiosSecure.get(`/api/v1/request/${id}`)
            .then((res) => {
                setReq(res.data)
            })
            .catch(() => console.log('Something went wrong'))
    }, [axiosSecure, id])

    if (!req.name) { return <Loading></Loading> }

    function onSubmit(data) {
        console.log(data)
        let toastID = toast.loading('Posting Your request...')
        axiosSecure.put(`/api/v1/request-update/${id}`, data)
            .then(res => {
                console.log(res)
                toast.success('Updated request', { id: toastID })
                nav(-1)

            })
            .catch(err => {
                console.log(err)
                toast.error('Could not update', { id: toastID })
            })

    }

    return (
        <section>
            <Heading>Update Request:</Heading>
            <form onSubmit={handleSubmit(onSubmit)} className=" m-4  p-4 border border-low rounded-lg">
                <div className="grid gap-4 grid-cols-2">
                    <div className=''>
                        <label htmlFor="receipentName"
                            className=''
                        >Enter Receipent Name:</label>
                        <br />
                        <input defaultValue={req.receipentName} type="text" {...register("receipentName", { required: true })} name="receipentName" id="receipentName" placeholder="Receipent Name:" />
                    </div>

                    <div className=''>
                        <label>District:</label>
                        <br />
                        <select required defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("district")}>
                            <option value='' >Select district:</option>
                            {
                                district?.map(obj => <option
                                    key={obj.id}
                                    value={obj.name}
                                >{obj.name}</option>)
                            }
                        </select>
                    </div>

                    <div className=''>
                        <label>Upazila:</label>
                        <br />
                        <select defaultValue='' required className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("upazila")}>
                            <option value="" disabled >Select upazila:</option>
                            {
                                upazila?.map(obj => <option
                                    key={obj.id}
                                    value={obj.name}
                                >{obj.name}</option>)
                            }
                        </select>
                    </div>

                    <div className=''>
                        <label htmlFor="hospital"
                            className=''
                        >Enter hospital Name:</label>
                        <br />
                        <input defaultValue={req.hospital} type="text" {...register("hospital", { required: true })} name="hospital" id="hospital" placeholder="Hospital Name:" />
                    </div>
                </div>

                <div className='md:mt-8 mt-4'>
                    <label htmlFor="fullAddress"
                        className=''
                    >Enter Full Address:</label>
                    <br />
                    <input defaultValue={req.fullAddress} type="text" {...register("fullAddress", { required: true })} name="fullAddress" id="fullAddress" placeholder="Full Address:" />
                </div>

                <div className="grid gap-4 grid-cols-2 md:mt-8 mt-4">
                    <div className=''>
                        <label htmlFor="date"
                            className=''
                        >Select Date:</label>
                        <br />
                        <input defaultValue={req.date} type="date" {...register("date", { required: true })} name="date" id="date" />
                    </div>
                    <div className=''>
                        <label htmlFor="time"
                            className=''
                        >Select time:</label>
                        <br />
                        <input defaultValue={req.time} type="time" {...register("time", { required: true })} name="time" id="time" />
                    </div>

                </div>
                <div className="md:mt-8 mt-4">
                    <label htmlFor="message">Request message:</label>
                    <textarea defaultValue={req.message} rows={5} placeholder="Tell us details about your request" {...register("message", { required: true })} name="message" id="message"></textarea>
                </div>

                <button type="submit" className="btn py-3 bg-sec text-black rounded-md w-3/5 mx-auto block text-xl font-semibold mt-8">
                    Update Request
                </button>

            </form>

        </section>
    );
};

export default EditReq;