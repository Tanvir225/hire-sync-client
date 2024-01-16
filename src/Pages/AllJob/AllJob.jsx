import { useState } from "react";
import Banner from "../../Components/Header/Banner/Banner";
import allJobBanner from "../../assets/images/allJobs.jpg";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useSpinner from "../../Hook/useSpinner";
import AllJobCard from "../../Components/AllJobCard/AllJobCard";

const AllJob = () => {
  //state
  const [search, setSearch] = useState("");

  //useAuth & useAxios & useSpinner hook
  const { user } = useAuth();
  const axios = useAxios();
  const spinner = useSpinner()

  //tenstackquery for get
  const { data, isLoading } = useQuery({
    queryKey: ["allJobs", user?.email],
    queryFn: async () => {
      return await axios.get(`/jobs/exclude?email=${user?.email}`);
    },
  });

  if (isLoading) {
        return spinner
  }

  return (
    <div className="bg-base-100 bg-opacity-80 h-screen">
      {/* helmet */}
      <Helmet>
        <title>Hire Sync | All Jobs</title>
      </Helmet>

      <Banner
        bannerImg={allJobBanner}
        text={"Success is a state of mind."}
        desc={"Pleasure in the job puts perfection in the work"}
      ></Banner>

      <div className="container mx-auto p-5">
        <div className="text-center px-5 bg-base-200 py-5 space-y-3 rounded-lg shadow-md mt-5">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search by job title"
            className="input input-bordered w-full lg:w-1/2 mx-auto"
          />
        </div>
      </div>

      <div>
        {
            isLoading ? spinner : <div>
                {
                    data?.data?.map(job => <AllJobCard key={job._id} job={job}></AllJobCard>)
                }
            </div>
        }
      </div>
    </div>
  );
};

export default AllJob;
