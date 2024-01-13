import { Outlet, useLocation } from "react-router-dom";
import bgImg from "../assets/images/bg-signin.jpg"
import Navbar from "../Components/Header/Navbar/Navbar";

const Main = () => {
    //useLocation for conditional nav
    const location = useLocation()
    console.log(location);

    return (
        <div className="bg-fixed  bg-cover bg-center h-screen "  style={{ backgroundImage: `url(${bgImg})`}}>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;