import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/pngwing.com.png'
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext)
    const [prevPosition, setPrevPosition] = useState(0)
    const [visible, setVisible] = useState(true);

    const links = <>
        <NavLink to='/'><li>Home</li></NavLink>
        <NavLink to='/dashboard/home'><li>Dashboard</li></NavLink>
        <NavLink to='/all-blogs'><li>Blog</li></NavLink>
        <NavLink to='/donation-request'><li>Donation Request</li></NavLink>
    </>

    useEffect(() => {
        function handleScroll() {
            const currentPos = window.scrollY
            if (prevPosition < currentPos) {
                setVisible(false)
            }
            else { setVisible(true) }
            setPrevPosition(currentPos)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevPosition])

    return (
        <div className={`fixed w-full navbar z-50 ${visible ? '' : 'gone'}`}>
            <nav className="flex p-1 my-1 min-h-[56px] mx-px border-2 bg-[#222] border-low rounded-full">
                <div className="flex-grow flex gap-2 ml-1 items-center">
                    <img className="w-10" src={logo} alt="" />
                    <p className="text-white text-lg font-semibold">BDC</p>
                </div>
                <div className="flex items-center gap-4">
                    <ul className="flex gap-4">
                        {links}
                    </ul>
                    <div>
                        {
                            user ?
                                <div className="flex gap-2">
                                    <button title="Logout"
                                        onClick={() => logOutUser()}
                                        className="btn w-11 h-11 rounded-full text-center border pl-2">
                                        <FiLogOut className="text-3xl"></FiLogOut>
                                    </button>
                                    <img title={user?.displayName} className="w-11 h-11 object-cover rounded-full" src={user?.photoURL} alt="" />
                                </div>
                                :
                                <div className="flex">
                                    <Link to='/login' className="logger">
                                        <button className="btn bg-prim text-white font-bold py-1 px-2 rounded-l-full text-lg">Login</button>
                                    </Link>

                                    <Link to='/register' className="logger">
                                        <button className="btn bg-white text-prim font-bold py-1 px-2 rounded-r-full text-lg">Register</button>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;