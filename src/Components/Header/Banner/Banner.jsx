import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Banner = ({ bannerImg, text, desc }) => {
  //useEffet for AOS
  useEffect(() => {
    AOS.init({
      // Global settings
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing for the animation
      once:true
    });
  }, []);

  return (
    <div
      className={`hero h-[70vh] `} 
      style={{ backgroundImage: `url(${bannerImg})`, objectFit: "cover" }}
    >
      <div className="hero-overlay bg-blue-950 bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content" data-aos="fade-down">
        <div className="max-w-md space-y-5">
          <h2 className="text-4xl font-bold">{text}</h2>
          <p className=" text-blue-200 text-lg font-semibold">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
