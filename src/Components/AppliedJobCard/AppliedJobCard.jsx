

const AppliedJobCard = ({ job }) => {

  //destructure
  const { photo, position, category, salary, company,resumeLink } = job || {}

  return (
    <div className="bg-base-100 flex flex-col md:flex-row  p-5 items-center shadow-xl rounded-lg space-y-5 md:space-y-0 mt-5">
      <div className="flex items-center flex-1 flex-col md:flex-row md:gap-5">
        <div className="w-24 rounded">
          <img src={photo} alt={position} />
        </div>
        <h2 className="text-xl flex-1 font-bold">{position}</h2>
      </div>

      <div className="flex flex-1 justify-between items-center gap-16">
        <div className="flex flex-col items-center  gap-2">
          <p className="w-24 text-blue-600 font-semibold border p-1 text-center bg-blue-100 rounded-lg">{category}</p>

        </div>
        <div className="flex flex-1 flex-col  items-center  gap-2">
          <p className="w-28 text-white font-semibold border p-1 text-center bg-blue-600 rounded-lg">{company}</p>
          <p className="flex items-center gap-2 font-semibold text-gray-700">{salary} $/mo</p>
        </div>
      </div>
      <div className="w-full md:w-32">
          <a href={`${resumeLink}`}  className="btn btn-outline w-full  text-blue-500 font-semibold">Resume</a>
        </div>
  
      <div>

      </div>
    </div>
  );
};

export default AppliedJobCard;