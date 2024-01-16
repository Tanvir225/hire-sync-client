import {
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineCarryOut,
  AiOutlineAreaChart,
} from "react-icons/ai";
import { formatDistance } from "date-fns";

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
  } = job || {};

  //timestamp
  const timeStamp = formatDistance(new Date(applyDate), new Date(), {
    addSuffix: true,
  });
  return (
    <div className="bg-base-100 shadow-lg mb-5 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-5 ">
          <figure className="w-24 bg-base-100 p-2 rounded-lg shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={photo}
              alt={`${title} image`}
            />
          </figure>
          <div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="flex items-center gap-2 text-gray-500 font-semibold">
              <AiOutlineClockCircle className="text-gray-600 text-lg"></AiOutlineClockCircle>
              {timeStamp}
            </p>
          </div>
        </div>

        <p className="w-24 text-blue-600 font-semibold border p-1  text-center bg-blue-100 rounded-lg">
          {category}
        </p>
      </div>

      <div>
        <p className="text-xl font-bold">{title}</p>
        <p className="flex items-center gap-2 text-gray-500 font-semibold">
          <AiOutlineUser className="text-gray-600 text-lg"></AiOutlineUser>
          {userName}
        </p>
      </div>
      <div>
        <p className="flex items-center gap-2 text-gray-500 font-semibold">
          <AiOutlineCarryOut className="text-gray-600 text-lg"></AiOutlineCarryOut>{" "}
          <span className="text-gray-800">{applicantNumber} applied of</span>{" "}
          {vacancy} vacancy
        </p>
      </div>

      <div className="text-end">
        <button className="btn btn-outline text-blue-500">Details</button>
      </div>
    </div>
  );
};

export default AllJobCard;
