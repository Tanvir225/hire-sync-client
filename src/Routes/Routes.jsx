import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PostJob from "../Pages/PostJob/PostJob";
import PrivateRoutes from "./PrivateRoutes";
import MyJobs from "../Pages/MyJobs/MyJobs";
import UpdateJob from "../Pages/MyJobs/UpdateJob/UpdateJob";

const myCreatedRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/post-job",
                element: <PrivateRoutes><PostJob></PostJob></PrivateRoutes>,
                loader:()=> fetch("http://localhost:5000/api/v1/category")
            },
            {
                path: "/my-jobs",
                element: <PrivateRoutes><MyJobs></MyJobs></PrivateRoutes>,
               
            },
            {
                path: "/update-job/:id",
                element: <PrivateRoutes><UpdateJob></UpdateJob></PrivateRoutes>,
                loader: ({params})=> fetch(`http://localhost:5000/api/v1/jobs/update/${params.id}`)
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            }
        ]
    }
])

export default myCreatedRoutes;