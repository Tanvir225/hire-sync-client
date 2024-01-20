import { Outlet, useLocation } from "react-router-dom";
import bgImg from "../assets/images/bg-signin.jpg"
import Navbar from "../Components/Header/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer/Footer";
import BottomNav from "../Components/Header/Navbar/BottomNav/BottomNav";

const Main = () => {
    //useLocation for conditional nav
    const location = useLocation()
    console.log(location);

    return (
        <div className="bg-fixed  bg-cover bg-center min-h-screen "  style={{ backgroundImage: `url(${bgImg})`}}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {
                location.pathname==='/all-job' ? "" : <Footer></Footer>
            }
            <Toaster></Toaster>
            <BottomNav></BottomNav>
        </div>
    );
};

export default Main;