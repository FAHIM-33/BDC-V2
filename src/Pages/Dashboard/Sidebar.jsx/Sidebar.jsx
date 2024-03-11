import { FaHome, FaListAlt, FaUsers } from 'react-icons/fa';
import { MdFeed, MdOutlineBloodtype, MdSpaceDashboard } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Divider from '../../../Components/Divider';
import useRole from '../../../Hooks/useRole';


const Sidebar = () => {
    const { user } = useContext(AuthContext)
    const { admin, volunteer, isRoleLoading } = useRole()

    return (
        <section className='sticky top-0 left-0 sidebar w-max flex flex-col py-4 min-h-screen'>
            <NavLink to='/dashboard/profile'>
                <button>
                    <img className='w-8 h-8 object-cover rounded-full' src={user?.photoURL} />
                    Profile ({user?.displayName})
                </button>
            </NavLink>
            <NavLink to='/dashboard/home'>
                <button>
                    <MdSpaceDashboard className='text-2xl'></MdSpaceDashboard>
                    Dashboard
                </button>
            </NavLink>
            <br />
            <NavLink to='/dashboard/create-donation-request'>
                <button>
                    <MdOutlineBloodtype className='text-2xl'></MdOutlineBloodtype>
                    Create Donation Request</button>
            </NavLink>
            <br />

            <br />
            <NavLink to='/dashboard/my-donation-request'>
                <button>
                    <BiSolidDonateBlood className='text-2xl'></BiSolidDonateBlood>
                    My donation request</button>
            </NavLink>
            <br />
            <NavLink to='/'>
                <button>
                    <FaHome className='text-xl'></FaHome>
                    Home
                </button>
            </NavLink>
            {/* Volunteer Route */}
            {/* Admin Routes */}
            <Divider></Divider>
            {
                isRoleLoading || (admin || volunteer) &&
                <>
                    <NavLink to='/dashboard/all-users'>
                        <button>
                            <FaUsers className='text-2xl'></FaUsers>
                            All Users</button>
                    </NavLink>
                    <NavLink to='/dashboard/all-blood-donation-request'>
                        <button>
                            <FaListAlt className='text-xl'></FaListAlt>
                            All blood doantion request</button>
                    </NavLink>
                    <NavLink to='/dashboard/content-management'>
                        <button>
                            <MdFeed className='text-xl'></MdFeed>
                            Content Management</button>
                    </NavLink>


                </>
            }
        </section>
    );
};

export default Sidebar;