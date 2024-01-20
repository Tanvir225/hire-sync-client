import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Header/Banner/Banner";
import myJobsBanner from "../../assets/images/myjobsBanner.jpg";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import PostedJobCard from "../../Components/PostedJobCard/PostedJobCard";
import { useState } from "react";
import useSpinner from "../../Hook/useSpinner";

const MyJobs = () => {

  //state
  const [search, setSearch] = useState('')

  //useSAxios hook and useSpinner
  const axios = useAxios()
  const spinner = useSpinner()

  //useAuth hook
  const { user } = useAuth()

  //tenstack useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["jobs", search],
    queryFn: async () => {
      return await axios(`/jobs?email=${user?.email}&search=${search}`)
    }

  })

 

  //console.log(data);

  return (
    <div className="h-fit bg-base-100 bg-opacity-85">
      {/* helmet */}
      <Helmet>
        <title>Hire Sync | Posted Jobs</title>
      </Helmet>

      <Banner
        bannerImg={myJobsBanner}
        text={"My Posted Jobs"}
        desc={"You can only become truly accomplished at something you love."}
      ></Banner>

      {/* my posted job */}
      <div className="container mx-auto p-5">
        <div className="text-center px-5 bg-base-200 py-5 space-y-3 rounded-lg shadow-md mt-5">
          <p className="text-xl text-blue-600 font-semibold">Total Posted Job : {data?.data.length}</p>
          <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="search by job title" className="input input-bordered w-full lg:w-1/2 mx-auto" />
        </div>
        <div>
          {
            isLoading ? spinner : <div>
              {
                data?.data?.map(job => <PostedJobCard key={job._id} job={job}></PostedJobCard>)
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
