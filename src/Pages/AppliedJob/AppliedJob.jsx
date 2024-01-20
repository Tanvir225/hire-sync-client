import { Helmet } from "react-helmet-async";
import myJobsBanner from "../../assets/images/myjobsBanner.jpg"
import Banner from "../../Components/Header/Banner/Banner";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSpinner from "../../Hook/useSpinner";
import AppliedJobCard from "../../Components/AppliedJobCard/AppliedJobCard";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const AppliedJob = () => {

    //useLoaderData
    const categories = useLoaderData()
    //state
    const [search, setSearch] = useState('')
    const [category,setCategory] = useState('')
    //useAxios & useAuth & spinner
    const axios = useAxios()
    const { user } = useAuth()
    const spinner = useSpinner()

    //tenStack query get posted Job
    const { data, isLoading } = useQuery({
        queryKey: ["appliedJob",search,category],
        queryFn: async () => {
            return axios.get(`/apply?email=${user?.email}&search=${search}&category=${category}`)
        }
    })

    console.log(data);

    return (
        <div className="bg-base-100 h-fit bg-opacity-80">
            {/* helmet */}
            <Helmet>
                <title>Hire Sync | Applied Jobs</title>
            </Helmet>

            <Banner
                bannerImg={myJobsBanner}
                text={"My Applied Jobs"}
                desc={"You can only become truly accomplished at something you love."}
            ></Banner>

            <div className="container mx-auto p-5">
                <div className=" px-5 flex justify-between gap-5 items-center bg-base-200 py-5 space-y-3 rounded-lg shadow-md mt-5">
                    <div className="flex-1 space-y-2">
                        <p className="lg:text-xl text-blue-600 font-semibold">Total Applied Job : {data?.data.length}</p>
                        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="search by job title" className="input input-bordered w-full " />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="form-control -mt-5 lg:-mt-4">
                            <label className="label">
                                <span className="label-text font-semibold text-blue-500">Filter by category</span>
                            </label>
                            <select
                                required

                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border-2 w-full rounded-lg input input-bordered"
                            >
                                {categories && categories.map((cat) => (
                                    <option value={cat.name} key={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {
                    isLoading ? spinner : (
                        <div >
                            {
                                data?.data?.map(job => <AppliedJobCard key={job._id} job={job}></AppliedJobCard>)
                            }
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default AppliedJob;