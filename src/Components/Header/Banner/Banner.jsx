
import bannerImg from "../../../assets/images/banner.jpg"
import Navbar from "../Navbar/Navbar";


const Banner = () => {
    return (
        <div className="hero h-[85vh] " style={{ backgroundImage: `url(${bannerImg})` }}>
            <div className="hero-overlay bg-black bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    
                </div>
            </div>
        </div>
    );
};

export default Banner;