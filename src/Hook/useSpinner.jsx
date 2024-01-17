import Lottie from "lottie-react";
import spinner from "../assets/spinner/spinner.json"

const useSpinner = () => {
    return (
        <div className="flex bg-base-100 bg-opacity-90  justify-center items-center h-screen">
            <Lottie animationData={spinner} className="w-72 rounded-full"></Lottie>
        </div>
    );
};



export default useSpinner;