import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm, Controller } from "react-hook-form";
import Loading from "../../../Components/Loading";
import Heading from "../../../Components/Heading";
import useAddress from "../../../Hooks/useAddress";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

import DatePicker from "react-multi-date-picker";
// import "react-multi-date-picker/styles/layouts/mobile.css"
import Button from "react-multi-date-picker/components/button"


const CreateRequest = () => {
    const { user, loading } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const { district, upazila } = useAddress()
    const [isActive, setIsActive] = useState('')
    const axiosSecure = useAxiosSecure()
    const [dateValue, setDateValue] = useState()

    useEffect(() => {
        loading ||
            axiosSecure.get(`/api/v1/user?email=${user?.email}`)
                .then(res => setIsActive(res.data.status))
                .catch(err => console.log(err))

    }, [user?.email, axiosSecure, loading])

    if (loading) { return <Loading></Loading> }

    function onSubmit(data) {
        if (isActive !== 'active') { return toast.error('You are Blocked. Can not post') }
        data.name = user?.displayName
        data.email = user?.email
        data.requestStatus = 'pending'
        console.log(data)
        // let toastID = toast.loading('Posting Your request...')
        // axiosSecure.post('/api/v1/create-donation-request', data)
        //     .then(res => {
        //         console.log(res)
        //         toast.success('Posted Your request', { id: toastID })
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         toast.error('Could not post', { id: toastID })
        //     })

    }

    return (
        <section>
            <Heading>Request for blood donation</Heading>

            <div className="text-center bg-fadegray rounded-md">
                <p className="text-xl text-mid">{user?.displayName}</p>
                <p className="text-low">{user?.email}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className=" m-4  p-4 border border-low rounded-lg">
                <div className="grid gap-4 grid-cols-2">

                    <div className=''>
                        <label htmlFor="receipentName"
                            className=''
                        >Enter Receipent Name:</label>
                        <br />
                        <input type="text" {...register("receipentName", { required: true })} name="receipentName" id="receipentName" placeholder="Receipent Name:" />
                    </div>

                    <div className=''>
                        <label>District:</label>
                        <br />
                        <select required defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("district")}>
                            <option value="" disabled>Select district:</option>
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
                        <input type="text" {...register("hospital", { required: true })} name="hospital" id="hospital" placeholder="Hospital Name:" />
                    </div>
                </div>
                <div className='md:mt-8 mt-4'>
                    <label htmlFor="fullAddress"
                        className=''
                    >Enter Full Address:</label>
                    <br />
                    <input type="text" {...register("fullAddress", { required: true })} name="fullAddress" id="fullAddress" placeholder="Full Address:" />
                </div>

                <div className="grid gap-4 grid-cols-2 md:mt-8 mt-4">

                    {/* <div className=''>
                        <label htmlFor="date"
                            className=''
                        >Select Date:</label>
                        <br />
                        <input type="date" {...register("date", { required: true })} name="date" id="date" />
                    </div> */}
                    <div>
                        <label htmlFor="date">Select date:</label>
                        <br />
                        <DatePicker
                        format="D MMMM YYYY"
                        className="rmdp-mobile w-full"
                            id="date"
                            name="date"
                            value={dateValue}
                            onChange={(value) => setDateValue(value)}
                            // mobileLabels={{
                            //     OK: "Accept",
                            //     CANCEL: "Close",
                            //   }}
                              render={(value, openCalendar) => {
                                return (
                                  <Button 
                                  className="input-similar w-full block"
                                  onClick={openCalendar}>
                                    {value}
                                  </Button>
                                )
                              }}
                        />
                    </div>

                    <div className=''>
                        <label htmlFor="time"
                            className=''
                        >Select time:</label>
                        <br />
                        <input type="time" {...register("time", { required: true })} name="time" id="time" />
                    </div>

                </div>
                <div className="md:mt-8 mt-4">
                    <label htmlFor="message">Request message:</label>
                    <textarea rows={5} placeholder="Tell us details about your request" {...register("message", { required: true })} name="message" id="message"></textarea>
                </div>

                <button type="submit" className="btn py-3 bg-sec text-black rounded-md w-3/5 mx-auto block text-xl font-semibold mt-8">
                    Request Donation
                </button>

            </form>

        </section>
    );
};

export default CreateRequest;