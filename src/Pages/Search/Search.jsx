import { useForm } from "react-hook-form";
import useAddress from "../../Hooks/useAddress";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Heading from "../../Components/Heading";
import { useState } from "react";
import Loading from "../../Components/Loading";

const Search = () => {
    const { register, handleSubmit } = useForm()
    const { district, upazila } = useAddress()
    const axiosPublic = useAxiosPublic()
    const [donors, setDonors] = useState([])
    const [loading, setLoading] = useState(null)

    function handleSearch(data) {
        setLoading(true)
        axiosPublic.post('/api/v1/search-donors', data)
            .then(res => {
                setDonors(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <section className="pt-12">
            <Heading>Search with filter</Heading>
            <p className="text-center text-sec">Search with any field you want. All fields are not required</p>
            <div className="pb-16 ">
                <form onSubmit={handleSubmit(handleSearch)} className="lg:w-2/5 md:4/5 m-4 md:mx-auto p-4  border border-low rounded-lg">
                    <div className="grid grid-cols-2 gap-4">

                        <div className=''>
                            <label htmlFor="email"
                                className=''
                            >Enter Your Email Address:</label>
                            <br />
                            <input type="text" {...register("email")} name="email" id="email" placeholder="Email"
                                className="" />
                        </div>

                        <div className=''>
                            <label htmlFor="blood"
                            >Select your blood group:</label>
                            <br />
                            <select defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("blood")}>
                                <option value="" disabled>Bloog Group:</option>
                                <option value=''>none</option>
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


                        <div className=''>
                            <label>Select your district:</label>
                            <br />
                            <select defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("district")}>
                                <option value='' disabled>Select district:</option>
                                <option value=''>none</option>
                                {
                                    district?.map(obj => <option
                                        key={obj.id}
                                        value={obj.name}
                                    >{obj.name}</option>)
                                }
                            </select>
                        </div>

                        <div className=''>
                            <label>Select upazila:</label>
                            <br />
                            <select defaultValue='' className="p-4 w-full bg-fadegray text-mid rounded-md" {...register("upazila")}>
                                <option value='' disabled>Select Upazila</option>
                                <option value=''>none</option>
                                {
                                    upazila?.map(obj => <option
                                        key={obj.id}
                                        value={obj.name}
                                    >{obj.name}</option>)
                                }
                            </select>
                        </div>

                    </div>

                    <button className='btn p-2 bg-low w-full rounded-md mt-8 text-xl md:text-2xl tracking-widest text-background ' type="submit">Search</button>

                </form>

            </div>

            {
                loading ||
                <p className="rounded-md text-xl bg-fadegray w-fit mx-auto p-2 text-sec">
                    {donors.length === 0 ? 'No donors Found!'
                        :
                        `Showing results: ${donors.length}`
                    }
                </p>}

            {
                loading ? <Loading></Loading>
                    :
                    <div className="grid border border-low m-4 rounded-lg grid-cols-2 gap-8 p-8">
                        {
                            donors?.map(obj =>
                                <div key={obj._id} className="flex w-full p-4 rounded-md bg-fadegray">
                                    <img src={obj.img} className="w-48 h-48 object-cover" alt="" />
                                    <div className="text-xl pl-4 flex flex-col space-y-2">
                                        <p className="text-2xl">Donor: {obj?.name}</p>
                                        <p className="text-low">Email: {obj?.email}</p>
                                        <p className="text-base text-mid">Address: {obj?.upazila} upazila, {obj?.district} district.</p>
                                        <p>Blood Group: <span className="text-prim">{obj.blood}</span></p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </section >
    );
};

export default Search;