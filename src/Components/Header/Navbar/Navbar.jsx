import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png"
import {AiOutlineFileAdd} from 'react-icons/ai'
import "./Navbar.css"

const Navbar = () => {

    //links for route
    const links = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/jobs"}>All Jobs</NavLink></li>
        <li><NavLink to={"/blogs"}>Blogs</NavLink></li>
    </>

    return (
        <div>
            <div className="navbar lg:px-10 bg-blue-600 text-white bg-opacity-85">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className="btn btn-ghost font-semibold text-2xl">
                        <img src={logo} className="w-12 hidden md:block  object-cover  rounded-full" alt="logo" />
                        <p>Hire-Sync</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-5">
                      {
                        links
                      }
                    </ul>
                </div>
                <div className="navbar-end ">
                   <button className="btn text-white text-center btn-outline mr-6 hidden md:flex"><AiOutlineFileAdd className="text-2xl"></AiOutlineFileAdd> Post a job</button>
                   <button className="btn lg:w-32 text-white btn-outline">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;