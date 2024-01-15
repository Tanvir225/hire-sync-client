import {AiOutlineClockCircle} from "react-icons/ai"
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from "react";

const PostedJobCard = ({ job }) => {

  //state
  const [elapsedTime,setElapsedTime] = useState(null)  


  //destructure obj
  const { title, photo,category } = job || {};

  // const applyDate = new Date(job?.applyDate)
  
 
  // //sideEffect for Calculate and update elapsed time
  // useEffect(() => {
   
  //   const interval = setInterval(() => {
  //     setElapsedTime(formatDistanceToNow(applyDate, { addSuffix: true }));
  //   }, 60000); // Update every minute

  //   return () => clearInterval(interval);
  // }, [applyDate]);


  return (
    <div className="bg-base-100 shadow-lg p-5 rounded-lg mt-16">
      <div className="flex items-center justify-center gap-5">
        <div className="w-24 rounded">
          <img src={photo} alt={title} />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div>
          <p className="w-24 text-blue-600 font-semibold border p-1 text-center bg-blue-100 rounded-lg">{category}</p>
          <p className="flex items-center gap-2"><AiOutlineClockCircle className="text-gray-600 text-lg"></AiOutlineClockCircle>{elapsedTime}</p>
      </div>
    </div>
  );
};

export default PostedJobCard;
