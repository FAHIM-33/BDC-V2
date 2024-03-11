import { Helmet } from "react-helmet";
import Welcome from "./Welcome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Loading from "../../../Components/Loading";
import { Link } from "react-router-dom";
import Heading from "../../../Components/Heading";
import useAllRequest from "../../../Hooks/useUserAllReq";
import useRole from "../../../Hooks/useRole";
import ReqTable from "../Shared/ReqTable";
import { FaMoneyBillAlt, FaUser } from "react-icons/fa";
import Divider from "../../../Components/Divider";
import { BiSolidDonateBlood } from "react-icons/bi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DashHome = () => {
    const { user, loading } = useContext(AuthContext)
    const { request, isLoading, refetch } = useAllRequest({ itemPerPage: 3, currentPage: 0 })
    const axiosSecure = useAxiosSecure()
    const { admin, volunteer, isRoleLoading } = useRole()
    const [data, setData] = useState({})

    useEffect(() => {
        axiosSecure.get('/api/v1/all-stats')
            .then(res => { setData(res.data) })
            .catch(() => toast.error("Something went wrong"))
    }, [axiosSecure])


    if (loading || isLoading || isRoleLoading) { return <Loading></Loading> }


    return (
        <section className="">
            <Helmet><title>BDC | Dashboard</title></Helmet>
            <Welcome name={user.displayName} ></Welcome>
            {
                !admin && !volunteer && request?.length > 0 ?
                    <div >
                        <Heading>Recent requests:</Heading>
                        <ReqTable data={{ request: request.slice(0, 3), isLoading, refetch }}></ReqTable>
                        <div>
                            <Link to='/dashboard/my-donation-request'>
                                <button className="btn bg-low mx-auto text-background font-semibold text-2xl p-2 rounded-md">View my all request</button>
                            </Link>
                        </div>
                    </div>
                    :
                    <section className="grid grid-cols-3 p-4 gap-4">
                        <div className="border-2 border-low text-center rounded-md bg-fadegray flex p-2 flex-col">
                            <FaUser className="text-4xl text-mid mx-auto"></FaUser>
                            <p className="flex-grow text-2xl ">Total User</p>
                            <Divider></Divider>
                            <p className="text-5xl font-bold text-sec">{data.totalUser}</p>
                        </div>
                        <div className="border-2 border-low text-center rounded-md bg-fadegray flex p-2 flex-col">
                            <FaMoneyBillAlt className="text-4xl text-sec mx-auto"></FaMoneyBillAlt>
                            <p className="flex-grow text-2xl ">Total Funding</p>
                            <Divider></Divider>
                            <p className="text-5xl font-bold text-sec">{data.totalFunding}</p>
                        </div>
                        <div className="border-2 border-low text-center rounded-md bg-fadegray flex p-2 flex-col">
                            <BiSolidDonateBlood className="text-5xl text-prim mx-auto"></BiSolidDonateBlood>
                            <p className="flex-grow text-2xl ">Total Blood Donation Request</p>
                            <Divider></Divider>
                            <p className="text-5xl font-bold text-sec">{data.totalRequest}</p>
                        </div>
                    </section>
            }

        </section>
    );
};

export default DashHome;