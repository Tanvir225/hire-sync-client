import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { Link, useParams } from "react-router-dom";
import { ImCommand } from "react-icons/im";
import { AiOutlineUser, AiOutlineAreaChart, AiOutlineDollar, AiOutlineClockCircle, AiOutlineArrowUp } from "react-icons/ai";
import { format } from "date-fns"
const JobDetails = () => {

    //useParams 
    const { id } = useParams()
    //console.log(id);
    //useAxios 
    const axios = useAxios()

    //tensatck query get single Job
    const { data } = useQuery({
        queryKey: ["job"],
        queryFn: async () => {
            return await axios.get(`/jobs/${id}`)
        }
    })


    //applyDeadline convert time

    const applyDate = data?.data?.applyDate ? new Date(data.data.applyDate) : null;
    const jobDeadline = data?.data?.appDeadline ? new Date(data.data.appDeadline) : null;

    // Check if the date objects are valid before formatting
    const formattedApplyDate = applyDate && !isNaN(applyDate) ? format(applyDate, "dd-MM-yyyy") : "Invalid Date";
    const formattedJobDeadline = jobDeadline && !isNaN(jobDeadline) ? format(jobDeadline, "dd-MM-yyyy") : "Invalid Date";




    return (
        <div className="bg-blue-100 h-screen bg-opacity-90">
            <div className="grid grid-cols-12  gap-5 container mx-auto p-6 lg:p-10">
                <div className="col-span-full lg:col-span-8">
                    <div className="bg-base-100 flex items-center justify-between px-5 md:px-10 py-5 rounded-lg shadow-md">
                        <figure className="w-16 md:w-24 rounded-full">
                            <img className="w-full h-full object-cover" src={data?.data.photo} alt={`${data?.data?.title} image`} />
                        </figure>
                        <div className="">
                            <p className="text-xl text-blue-600 font-bold">{data?.data?.name}</p>
                            <p className="text-xl md:text-2xl text-gray-500 font-bold">{data?.data?.title}</p>
                        </div>
                    </div>
                    <p className="text-gray-700 text-lg text-justify mt-5 leading-7 font-semibold">{data?.data?.description.slice(0, 1000)}</p>
                </div>

                <div className="bg-base-100  p-5 col-span-full lg:col-span-4 space-y-3 rounded-lg shadow-md">
                    <p className="text-gray-600 font-semibold border-b-2 text-xl">Job Information</p>
                    <div className="flex items-center gap-5">
                        <ImCommand className="text-2xl"></ImCommand>
                        <div>
                            <p className="text-gray-600 font-semibold text-lg">Company Name :</p>
                            <p className="text-blue-600 ">{data?.data?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <AiOutlineUser className="text-2xl"></AiOutlineUser>
                        <div>
                            <p className="text-gray-600 font-semibold text-lg">Employee Type :</p>
                            <p className="text-blue-600 ">{data?.data?.category}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <AiOutlineAreaChart className="text-2xl"></AiOutlineAreaChart>
                        <div>
                            <p className="text-gray-600 font-semibold text-lg">Experience :</p>
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
                            <p className="text-gray-600 font-semibold text-lg">Date Posted :</p>
                            <p className="text-blue-600 ">{formattedApplyDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <AiOutlineClockCircle className="text-2xl"></AiOutlineClockCircle>
                        <div>
                            <p className="text-gray-600 font-semibold text-lg">Job Deadline :</p>
                            <p className="text-blue-600 ">{formattedJobDeadline}</p>
                        </div>
                    </div>
                    <div className="">
                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-outline w-full font-bold  text-blue-500"><AiOutlineArrowUp className="text-xl"></AiOutlineArrowUp>Apply Now</button >
                    </div>

                    {/* modal start here */}
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={"tanvir"}
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
                                    defaultValue={"t@gmail.com"}
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
                                    defaultValue={"Web Developer"}
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
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="modal-action">
                                <form method="dialog" className="space-x-5">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-outline bg-green-600 text-white">Close</button>
                                    <button className="btn btn-outline text-blue-600">Apply</button>
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