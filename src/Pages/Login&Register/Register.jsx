import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import useAddress from "../../Hooks/useAddress";
import { hostImage } from "../../Utility/hostImg";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
    let { createUser, updateNameImg } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    let nav = useNavigate()
    const { district, upazila } = useAddress()
    const axiosPublic = useAxiosPublic()

    function addUserToDb(usersData, toastID) {
        console.log(usersData)
        axiosPublic.post('/api/v1/add-user', usersData)
            .then(() => toast.success("Successfully added user.", { id: toastID }))
            .catch(() => toast.error("Could not add user in Database", { id: toastID }))
    }


    function onSubmit(data) {
        if (data.password !== data.confPassword) {
            return toast.error('Password did not match')
        }
        const { email, password, name, imageFile } = data

        const toastID = toast.loading("Registering new user...")
        createUser(email, password)
            .then(() => {
                toast("Registered, adding to DataBase..")
                hostImage(imageFile)
                    .then(url => {
                        updateNameImg(name, url)
                            .then(() => {
                                delete data.imageFile
                                delete data.confPassword
                                delete data.password
                                data.img = url
                                addUserToDb(data, toastID)
                                nav('/')
                            })
                            .catch(() => toast.error('Could not add username'))
                    })
                    .catch(() => toast.error('Hosting Image & name'))

            })
            .catch(err => {
                console.log(err)
                toast.error(`Error: ${err.code}`, { id: toastID })
            })
    }

    return (
        <div className="pb-16 pt-14">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/5 md:4/5 m-4 md:mx-auto p-4 border border-low rounded-lg">
                <div>
                    <span className="block whitespace-nowrap text-3xl md:text-5xl text-center" >Register Now</span>
                </div>

                <div className='md:mt-12 mt-8'>
                    <label htmlFor="name"
                        className=''
                    >Enter Your Name:</label>
                    <br />
                    <input type="text" {...register("name", { required: true })} name="name" id="name" placeholder="Username"
                        className="" />
                </div>

                <div className='md:mt-8 mt-4'>
                    <label htmlFor="email"
                        className=''
                    >Enter Your Email Address:</label>
                    <br />
                    <input type="text" {...register("email", { required: true })} name="email" id="email" placeholder="Email"
                        className="" />
                </div>

                <div className='md:mt-8 mt-4'>
                    <label htmlFor="imageFile"
                    >Choose Image:</label>
                    <br />
                    <input type="file" {...register("imageFile", { required: true })} name="imageFile" id="imageFile" placeholder="Choose file" />
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

                <div className='md:mt-12 mt-8'>
                    <label>Select upazila:</label>
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


                <div className='md:mt-8 mt-4'>
                    <label htmlFor="password"
                        className=''
                    >Create New Password:</label>
                    <br />
                    <input type="password" required placeholder="Password" {...register("password", {
                        required: true,
                        minLength: 6,
                        // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    })} />
                    {/* {errors?.password?.type === 'pattern' && <span className="text-red-600">*Must include a capital,special character and number</span>} */}
                    {errors?.password?.type === 'minLength' && <span className="text-red-600">*Must be 6 characters or more</span>}

                    <div>
                        <label>Confirm password:</label>
                        <input type="password" required placeholder="Re-type password"  {...register("confPassword")} />
                    </div>

                </div>

                <input className='btn p-2 bg-low w-full rounded-md mt-8 text-xl md:text-2xl tracking-widest text-background ' value='Register' type="submit" />

            </form>
            <p className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login Here.</Link></p>
        </div>
    );
};

export default Register;