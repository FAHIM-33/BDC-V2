import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    let { loginUser } = useContext(AuthContext)
    let nav = useNavigate()
    const location = useLocation()

    function onSubmit(data) {
        let toastID = toast.loading("Loggin in...")
        loginUser(data.email, data.password)
            .then(() => {
                nav(location?.state?.from || '/')
                toast.success("Login Successful", { id: toastID })
            })
            .catch((error) => {
                toast.error(`${error.code}`, { id: toastID })
            })
    }


    return (
        <div className="pb-16 pt-14">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/5 md:4/5 m-4 md:mx-auto p-4 border border-low rounded-lg">
                <div>
                    <span className="block whitespace-nowrap text-3xl md:text-5xl text-center" >Login</span>
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
                    <label htmlFor="password"
                        className=''
                    >Create New Password:</label>
                    <br />
                    <input type="password" required placeholder="Password" {...register("password", {
                        required: true,
                    })} />
                    {errors?.password?.type === 'minLength' && <span className="text-red-600">*Must be 6 characters or more</span>}

                </div>

                <input className='btn p-2 bg-low w-full rounded-md mt-8 text-xl md:text-2xl tracking-widest text-background ' value='Login' type="submit" />

            </form>
            <p className='text-center'>Don&apos;t have an account? <Link to="/register" className='text-blue-600 font-semibold'>Register now.</Link></p>
        </div>
    );
};

export default Login;