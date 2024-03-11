import { BsGithub, BsFacebook, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import img from '../assets/pngwing.com.png'

const Footer = () => {
    return (
        <footer className="bg-[#111] pt-5 pb-4 text-white">
            <div className="text-center flex justify-center items-center gap-1">
                <figure className="">
                    <img src={img} className="mx-auto -m-2 w-6" alt="" />
                </figure>
                <p className="font-semibold md:text-sm text-xs pb-1">
                    BDC(Blood Donation Campaign)
                </p>
            </div>
            <div className="flex justify-center items-center mt-4 text-sm">
            </div>
            <p className="text-center md:text-base text-xs">
                Address: 1234 gdoadf Street, Naraynganj, Dhaka, Bangladesh
            </p>
            <p className="text-center mt-4 mb-3 md:text-base text-sm">Social</p>
            <div className="flex justify-center gap-4 md:text-xl text-sm">
                <Link to='https://www.facebook.com/shahriyerhossain.fahim/'><BsFacebook /></Link>
                <Link to='https://github.com/FAHIM-33'><BsInstagram /></Link>
                <Link to='https://github.com/FAHIM-33'><BsTwitter /></Link>
                <Link to='https://github.com/FAHIM-33'><BsLinkedin /></Link>
                <Link to='https://github.com/FAHIM-33'><BsGithub /></Link>
            </div>
            <small className="text-center block text-gray-500 mt-4">Service Policy & Terms and conditions</small>
            <small className="text-gray-400 text-center block mt-2">All rights reserved from <Link className="text-prim" to='/'>BDC</Link></small>
        </footer>
    );
};

export default Footer;