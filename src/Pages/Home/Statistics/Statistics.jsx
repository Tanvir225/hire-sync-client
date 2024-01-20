import { useEffect, useState } from "react";
import useAxios from "../../../Hook/useAxios";
import AOS from "aos";
import "aos/dist/aos.css";


const Statistics = () => {
  //state
  const [jobCount, setJobCount] = useState();
  const [applyCount, setApplyCount] = useState();
  const [categoryCount, setCategoryCount] = useState(0);

  //useEffet for AOS
  useEffect(() => {
    AOS.init({
      // Global settings
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing for the animation
      
    });
  }, []);

  //useAxios
  const axios = useAxios();

  useEffect(() => {
    axios.get("/countDown").then((res) => {
      console.log(res?.data);
      setJobCount(res?.data?.jobCount);
      setCategoryCount(res?.data?.categoryCount);
      setApplyCount(res?.data?.applyCount);
    });
  }, [axios]);

  return (
    <div className="bg-blue-600 space-y-10 p-10 text-white  bg-opacity-80">
      <h2 className="text-center text-4xl">Careers Statistics</h2>
      <p className="text-center text-xl w-full lg:w-[55%] mx-auto">
        Explore endless career opportunities, where talent meets opportunity.
        Discover curated job listings, connect with top employers, and take the
        next step in your professional journey.{" "}
      </p>
      <div className="grid grid-cols-3 text-lg font-semibold  justify-evenly  items-center text-center " data-aos="flip-right" >
        <div className="flex flex-col p-2 items-center gap-5  rounded-box ">
          <span className="countdown  text-5xl">{jobCount}</span>
          Total Job
        </div>
        <div className="flex flex-col p-2 items-center gap-5 rounded-box ">
          <span className="countdown  text-5xl">{categoryCount}</span>
          Job Category
        </div>
        <div className="flex flex-col p-2 items-center gap-5 rounded-box ">
          <span className="countdown  text-5xl">{applyCount}</span>
          Job Filled
        </div>
      </div>
    </div>
  );
};

export default Statistics;
