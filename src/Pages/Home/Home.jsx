import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs";
import Featured from "./Featured";

const Home = () => {
    return (
        <section className="">
            <Helmet>
                <title>BDC | Home</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs></ContactUs>
        </section>
    );
};

export default Home;