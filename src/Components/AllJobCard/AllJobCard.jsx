import {
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineCarryOut,
  AiOutlineDollar,
} from "react-icons/ai";
import { format, formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AllJobCard = ({ job }) => {
  //destructure job
  const {
    title,
    photo,
    name,
    salary,
    category,
    applyDate,
    userName,
    applicantNumber,
    vacancy,
    appDeadline
  } = job || {};


    //useEffet for AOS
    useEffect(() => {
      AOS.init({
        // Global settings
        duration: 1000, // Animation duration
        easing: "ease-in-out", // Easing for the animation
      });
    }, []);

  //timestamp
  const timeStamp = formatDistance(new Date(applyDate), new Date(), {
    addSuffix: true,
  });

  //applyDeadline convert time
  const applyDeadline = format(new Date(appDeadline), "dd-MM-YYY");

  return (
    <div className="bg-base-100 shadow-lg mb-5 p-5 md:p-8 space-y-5 rounded-lg" data-aos="zoom-out">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center justify-between ">
          <figure className="w-24 bg-base-100 p-2 rounded-lg shadow-md">
            <img
              className="w-full h-full object-cover"
              src={photo}
              alt={`${title} image`}
            />
          </figure>
          <div className="space-y-3">
            <p className="text-lg font-semibold bg-blue-500 text-center rounded-lg p-2 text-white">{name}</p>
            <p className="text-lg flex items-center gap-2 text-gray-500 font-semibold"><AiOutlineDollar></AiOutlineDollar>{salary} $/mo</p>
          </div>
        </div>


      </div>

      <div className="space-y-2">
        <p className="text-xl font-bold">{title}</p>
        <p className="flex items-center gap-2 text-gray-500 font-semibold">
          <AiOutlineUser className="text-gray-600 text-lg"></AiOutlineUser>
          {userName}
        </p>
        <p className="flex items-center gap-2 text-gray-500 font-semibold">
          <AiOutlineClockCircle className="text-gray-600 text-lg"></AiOutlineClockCircle>
          {timeStamp}
        </p>
        <p className="flex items-center gap-2 text-gray-500 font-semibold">
          <AiOutlineClockCircle className="text-gray-600 text-lg"></AiOutlineClockCircle>
          Deadline : {applyDeadline}
        </p>
        <p className="flex items-center gap-2 text-gray-500 font-semibold">
          <AiOutlineCarryOut className="text-gray-600 text-lg"></AiOutlineCarryOut>{" "}
          <span className="text-gray-800">{applicantNumber} applied of</span>{" "}
          {vacancy} vacancy
        </p>  
      </div>


      <div className="text-end flex items-center justify-between">
        <p className="w-24 text-blue-600 font-semibold border p-1  text-center bg-blue-100 rounded-lg">
          {category}
        </p>
        <Link to={`/job/${job._id}`} className="btn btn-outline btn-sm text-blue-500">Details</Link>
      </div>
    </div>
  );
};

export default AllJobCard;
