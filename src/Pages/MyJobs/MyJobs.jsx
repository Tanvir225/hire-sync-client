import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Header/Banner/Banner";
import myJobsBanner from "../../assets/images/myjobsBanner.jpg";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import PostedJobCard from "../../Components/PostedJobCard/PostedJobCard";

const MyJobs = () => {

    //useSAxios hook
    const axios = useAxios()

    //useAuth hook
    const {user} = useAuth()

    //tenstack Query
    const {data} = useQuery({
        queryKey:["postedJobs"],
        queryFn: async()=>{
            return await axios(`/jobs?email=${user?.email}`)
        }

    })

    console.log(data);

  return (
    <div className="h-screen bg-base-100 bg-opacity-85">
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
      <div className="container mx-auto">
           {
            data?.data?.map(job => <PostedJobCard key={job._id} job={job}></PostedJobCard>)
           }
      </div>
    </div>
  );
};

export default MyJobs;
