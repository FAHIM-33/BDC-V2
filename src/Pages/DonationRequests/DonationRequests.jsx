import { Helmet } from "react-helmet";
import Heading from "../../Components/Heading";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading";

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic()
    

    const { data, isLoading } = useQuery({
        queryKey: ['pending-requests'],
        queryFn: async () => {
            let res = await axiosPublic.get('/api/v1/pending-donation-request')
            return res.data
        }
    })



    if (isLoading) { return <Loading></Loading> }

    return (
        <section className="pt-12 cont">
            <Helmet>Donation requests</Helmet>
            <Heading>Donation requests</Heading>

            <div className="p-4">
                <table className="">
                    <thead className="bg-[#1d1d1d] sticky top-0">
                        <tr className="">
                            <th>Requester</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(req => <tr key={req._id}>
                                <td>{req.name}</td>
                                <td className="text-low">
                                    <p>{req.district}, {req.upazilla}</p>
                                    <p>{req.fullAddress}</p>
                                </td>
                                <td>{req.date}</td>
                                <td>{req.time}</td>

                                <td>
                                    <div className="flex items-center justify-center gap-2 text-2xl">
                                        <Link to={`/donation-request/details/${req._id}`}>
                                            <button className="text-high bg-low btn p-2" title="View details">
                                                <FaEye></FaEye> View
                                            </button>
                                        </Link>
                                    </div>

                                </td>

                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default DonationRequests;