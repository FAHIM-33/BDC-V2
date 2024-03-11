import { BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import Heading from "../../Components/Heading";

const ContactUs = () => {
    return (
        <section id="contact" className="cont text-high mb-8">
           <Heading>Contact</Heading>
            <div className="flex flex-col md:flex-row gap-10">

                <div className="w-auto md:w-1/2 text-center md:text-right">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8">Contact us</h2>
                    <p className="text-lg md:w-4/5">Ready to get started or simply have a question? Get in touch by filling out our contact form and well get
                        back
                        to you as soon as possible.</p>
                </div>


                <div className="md:w-1/2">
                    <form action="" className="flex flex-col gap-6 py-4">
                        <input type="Email" placeholder="Email:" />
                        <input type="tel" placeholder="Phone:" />
                        <input type="text" placeholder="Address:" />
                    </form>

                    <p className="flex items-center gap-4 font-medium text-2xl"> Social media: <span className="flex gap-4">
                        <BsInstagram />
                        <BsTwitter />
                        <BsGithub />
                    </span></p>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;