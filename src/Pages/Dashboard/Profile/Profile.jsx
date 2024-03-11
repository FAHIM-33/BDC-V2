import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { FaUserEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAddress from "../../../Hooks/useAddress";
import toast from "react-hot-toast";
import { hostImage } from "../../../Utility/hostImg";

const Profile = () => {
    const { user, loading, updateNameImg } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [userData, setUserData] = useState({})
    const { register, handleSubmit } = useForm()
    const { district, upazila } = useAddress()
    const [show, setShow] = useState(false)


    useEffect(() => {
        loading ||
            axiosSecure.get(`/api/v1/user?email=${user?.email}`)
                .then(res => {
                    setUserData(res.data)
                })
                .catch(err => console.log(err))

    }, [user?.email, axiosSecure, loading])

    if (!user || !userData) { return <Loading></Loading> }

    function onSubmit(data) {
        function addUserToDb(usersData, toastID) {
            axiosSecure.post(`/api/v1/update-user?email=${user?.email}`, usersData)
                .then((res) => {
                    console.log(res.data)
                    toast.success("Successfully updated user.", { id: toastID })
                })
                .catch(() => toast.error("Could not update Database", { id: toastID }))
        }
        const { name, imageFile } = data


        const toastID = toast.loading("Registering new user...")
        toast("Registered, adding to DataBase..")


        if (imageFile.length !== 0) {
            hostImage(imageFile)
                .then(url => {
                    updateNameImg(name, url)
                        .then(() => {
                            delete data.imageFile
                            data.img = url
                            addUserToDb(data, toastID)
                            console.log(data)
                        })
                        .catch(() => toast.error('Could not add username'))
                })
                .catch(() => toast.error('Hosting Image & name'))
            return
        }

        updateNameImg(name, user?.photoURL)
            .then(() => {
                delete data.imageFile
                delete data.img
                addUserToDb(data, toastID)
                console.log(data)
            })
            .catch(() => toast.error('Could not add username'))
    }


    return (
        <section className="p-4" >
            <div className="flex w-max p-4 rounded-md bg-fadegray">
                <img src={user?.photoURL} className="w-48 h-48 object-cover" alt="" />
                <div className="text-xl pl-4 flex flex-col space-y-2">
                    <p className="text-2xl">User: {user?.displayName}<span className="text-sec"> ({userData?.role || 'Donor'})</span></p>
                    <p className="text-low">Email: {userData?.email}</p>
                    <p className="text-base text-mid">Address: {userData?.upazila} upazila, {userData?.district} district.</p>
                    <p>Blood Group: <span className="text-prim">{userData.blood}</span></p>
                    <button
                        onClick={() => setShow(!show)}
                        className="btn w-fit py-1 bg-prim text-white px-2 rounded-md">
                        <FaUserEdit></FaUserEdit>
                        Edit profile</button>

                </div>
            </div>


            {
                show &&
                <form onSubmit={handleSubmit(onSubmit)} className=" m-4  p-4 border border-low rounded-lg">
                    <p className="text-center text-xl underline">Updata profile:</p>
                    <div className=''>
                        <label htmlFor="name"
                            className=''
                        >Enter Your Name:</label>
                        <br />
                        <input defaultValue={userData.name} type="text" {...register("name")} name="name" id="name" placeholder="Username"
                            className="" />
                    </div>
                    <div className='md:mt-8 mt-4'>
                        <label htmlFor="imageFile"
                        >Choose Image:</label>
                        <br />
                        <input type="file" {...register("imageFile")} name="imageFile" id="imageFile" placeholder="Choose file" />
                    </div>

                    <div className='md:mt-12 mt-8'>
                        <label htmlFor="blood"
                        >Select your blood group:</label>
                        <br />
                        <select required defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("blood")}>
                            <option value="" disabled>Bloog Group:</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O-">O-</option>
                            <option value="O+">O+</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>

                    </div>

                    <div className='md:mt-12 mt-8'>
                        <label>Select your district:</label>
                        <br />
                        <select defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("district")}>
                            <option value="" disabled>Select district:</option>
                            {
                                district?.map(obj => <option
                                    key={obj.id}
                                    value={obj.name}
                                >{obj.name}</option>)
                            }
                        </select>
                    </div>

                    <div className='md:mt-12 mt-8'>
                        <label>Select upazila:</label>
                        <br />
                        <select defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("upazila")}>
                            <option value="" disabled >Select upazila:</option>
                            {
                                upazila?.map(obj => <option
                                    key={obj.id}
                                    value={obj.name}
                                >{obj.name}</option>)
                            }
                        </select>
                    </div>
                    <input className='btn p-2 bg-prim w-fit mx-auto block rounded-md mt-8 text-xl md:text-2xl tracking-widest text-white ' value='Update' type="submit" />
                </form>}

        </section>
    );
};

export default Profile;