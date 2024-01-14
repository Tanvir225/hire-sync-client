
import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useSpinner from "../Hook/useSpinner";

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth()

    //get spinner
    const spinner = useSpinner()
    //location
    const location = useLocation()

    if (loading) {
        return  spinner
    }

    if (user) {
        return children
    }

    return <Navigate state={location?.pathname} to={"/login"}></Navigate>
};

export default PrivateRoutes;