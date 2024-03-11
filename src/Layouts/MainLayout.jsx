import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar></Navbar>

            </header>
            <main className="min-h-screen">
                <Outlet></Outlet>
            </main>
            <footer>

                <Footer></Footer>
            </footer>
        </>
    );
};

export default MainLayout;