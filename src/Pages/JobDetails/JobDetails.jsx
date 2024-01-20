import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { ImCommand } from "react-icons/im";
import {
  AiOutlineUser,
  AiOutlineAreaChart,
  AiOutlineDollar,
  AiOutlineClockCircle,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { format } from "date-fns";
import useAuth from "../../Hook/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const JobDetails = () => {
  //state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //useParams
  const { id } = useParams();
  //console.log(id);
  //useAxios
  const axios = useAxios();
  const { user } = useAuth();

  //navigate
  const navigate = useNavigate()

  const userEmail = user?.email;
  const userName = user?.displayName;
  //tensatck query get single Job
  const { data } = useQuery({
    queryKey: ["job"],
    queryFn: async () => {
      return await axios.get(`/jobs/${id}`);
    },
  });

  const position = data?.data?.title;
  const company = data?.data?.name;
  const category = data?.data?.category;
  const salary = data?.data?.salary;
  const photo = data?.data?.photo;

  //applyDeadline convert time

  const applyDate = data?.data?.applyDate
    ? new Date(data.data.applyDate)
    : null;
  const jobDeadline = data?.data?.appDeadline
    ? new Date(data.data.appDeadline)
    : null;

  // Check if the date objects are valid before formatting
  const formattedApplyDate =
    applyDate && !isNaN(applyDate)
      ? format(applyDate, "dd-MM-yyyy")
      : "Invalid Date";
  const formattedJobDeadline =
    jobDeadline && !isNaN(jobDeadline)
      ? format(jobDeadline, "dd-MM-yyyy")
      : "Invalid Date";

  //apply button functionality statrt here->
  const handleSubmit = async (event) => {
    event.preventDefault();
    const forms = event.target;
    const resumeLink = forms.resumeLink.value;

    const applyJob = {
      userName,
      userEmail,
      position,
      photo,
      resumeLink,
      id,
      company,
      salary,
      category,
    };

    console.log(applyJob);

    // Close the modal
    document.getElementById("my_modal_5").close();

    //form reset
    forms.reset();
    
    try{
        const userApply = await axios.post("/apply", applyJob);
        if (userApply?.data?.success) {
            setSuccess(userApply?.data?.success)
        }

        if (userApply?.data?.error) {
            setError(userApply?.data?.error)
        }

       

    }
    catch(error){
        console.log(error);
    }

    //check error & success
    
  };

  useEffect(()=>{
    if (error) {
        toast.error(error)
        navigate(-1)
    }
    if (success) {
        toast.success(success)
        navigate("/apply-job")
    }
  },[error,success,navigate])

  return (
    <div className="bg-blue-100  bg-opacity-90 h-fit">
      <div className="grid grid-cols-12  gap-5 container mx-auto p-6 lg:p-10">
        <div className="col-span-full lg:col-span-8">
          <div className="bg-base-100 flex items-center justify-between px-5 md:px-10 py-5 rounded-lg shadow-md">
            <figure className="w-16 md:w-24 rounded-full">
              <img
                className="w-full h-full object-cover"
                src={data?.data.photo}
                alt={`${data?.data?.title} image`}
              />
            </figure>
            <div className="">
              <p className="text-xl text-blue-600 font-bold">
                {data?.data?.name}
              </p>
              <p className="text-xl md:text-2xl text-gray-500 font-bold">
                {data?.data?.title}
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-lg text-justify mt-5 leading-7 font-semibold">
            {data?.data?.description.slice(0, 1000)}
          </p>
        </div>

        <div className="bg-base-100  p-5 col-span-full lg:col-span-4 space-y-3 rounded-lg shadow-md">
          <p className="text-gray-600 font-semibold border-b-2 text-xl">
            Job Information
          </p>
          <div className="flex items-center gap-5">
            <ImCommand className="text-2xl"></ImCommand>
            <div>
              <p className="text-gray-600 font-semibold text-lg">
                Company Name :
              </p>
              <p className="text-blue-600 ">{data?.data?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineUser className="text-2xl"></AiOutlineUser>
            <div>
              <p className="text-gray-600 font-semibold text-lg">
                Employee Type :
              </p>
              <p className="text-blue-600 ">{data?.data?.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineAreaChart className="text-2xl"></AiOutlineAreaChart>
            <div>
              <p className="text-gray-600 font-semibold text-lg">
                Experience :
              </p>
              <p className="text-blue-600 ">{data?.data?.exp} Year</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineDollar className="text-2xl"></AiOutlineDollar>
            <div>
              <p className="text-gray-600 font-semibold text-lg">Salary :</p>
              <p className="text-blue-600 ">{data?.data?.salary} $/mo</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineClockCircle className="text-2xl"></AiOutlineClockCircle>
            <div>
              <p className="text-gray-600 font-semibold text-lg">
                Date Posted :
              </p>
              <p className="text-blue-600 ">{formattedApplyDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <AiOutlineClockCircle className="text-2xl"></AiOutlineClockCircle>
            <div>
              <p className="text-gray-600 font-semibold text-lg">
                Job Deadline :
              </p>
              <p className="text-blue-600 ">{formattedJobDeadline}</p>
            </div>
          </div>
          <div className="">
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn btn-outline w-full font-bold  text-blue-500"
            >
              <AiOutlineArrowUp className="text-xl"></AiOutlineArrowUp>Apply Now
            </button>
          </div>

          {/* modal start here */}
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle "
          >
            <div className="modal-box ">
              <p className="text-blue-600 font-semibold border-b-2 border-blue-400 text-xl">
                Submit your application
              </p>
              <form className="space-y-1" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userName}
                    readOnly
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={userEmail}
                    readOnly
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Position</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={position}
                    readOnly
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Resume Link</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ex:http:file/tanvir.pdf"
                    name="resumeLink"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div>
                  <button className="btn btn-outline w-full mt-2 text-blue-500">
                    <AiOutlineArrowUp></AiOutlineArrowUp> Apply Now
                  </button>
                </div>
              </form>
              <div className="modal-action">
                <form method="dialog" className="">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-outline bg-green-600 text-white">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          {/* modal end */}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
