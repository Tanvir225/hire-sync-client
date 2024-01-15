import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {
  AiOutlineFileAdd,
  AiOutlineAreaChart,
  AiOutlineFileSync,
} from "react-icons/ai";
import "./Navbar.css";
import useAuth from "../../../Hook/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {

  //useAuth hooks
  const {user,logOut} = useAuth()

  //handle logOut
  const handleLogOut = ()=>{
    logOut()
    .then(res =>{
      toast.success("user Logout Successfully")
    })
  }

  //links for route
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/jobs"}>All Jobs</NavLink>
      </li>
      <li>
        <NavLink to={"/blogs"}>Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contacts</NavLink>
      </li>
    </>
  );

  //links for authConditional
  const privateLinks = (
    <>
      <li>
        <NavLink to={"/post-job"} className="btn text-white text-center btn-outline mr-6 hidden md:flex">
          <AiOutlineFileAdd className="text-2xl"></AiOutlineFileAdd> Post a job
        </NavLink>
      </li>
      <li>
        <NavLink className="btn text-white text-center btn-outline mr-6 hidden md:flex">
          <AiOutlineAreaChart className="text-2xl"></AiOutlineAreaChart> Applied
          Jobs
        </NavLink>
      </li>
      <li>
        <NavLink to={"/my-jobs"} className="btn text-white text-center btn-outline mr-6 hidden md:flex">
          <AiOutlineFileSync className="text-2xl"></AiOutlineFileSync> My Jobs
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar lg:px-10 bg-blue-700 text-white bg-opacity-95 py-3">
        <div className="justify-start w-[40%]">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              {links}
            </ul>
          </div>
          <div className="btn btn-ghost font-semibold text-2xl">
            <img
              src={logo}
              className="w-12 hidden md:block  object-cover  rounded-full"
              alt="logo"
            />
            <p>Hire-Sync</p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-5">{links}</ul>
        </div>
        <div className="justify-end w-[55%]">
          {
            user && <ul className="flex ">{privateLinks}</ul>
          }
          
          {
            user ?  <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt={`${user?.displayName} image`} src={user?.photoURL} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-4 z-[1] text-black p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-44 h-28">
              <div className="flex flex-col justify-center gap-3 items-center p-2">
                  <p className="text-blue-500 font-semibold text-base">{user?.displayName}</p>
                  <button onClick={handleLogOut} className="btn btn-outline btn-sm w-full text-blue-500">Logout</button>
              </div>
            </ul>
          </div> : <Link to={"/login"} className="btn btn-outline lg:w-36 text-white">Login</Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
