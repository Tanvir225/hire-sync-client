import { useState } from "react";

import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useSpinner from "../../Hook/useSpinner";
import AllJobCard from "../../Components/AllJobCard/AllJobCard";
import { useLoaderData } from "react-router-dom";

const AllJob = () => {
  //state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentpage] = useState(0);
  const [jobInPage, setJobInPage] = useState(6);
  const [count, setCount] = useState(0);

  //useLoaderData
  const categories = useLoaderData();

  //useAuth & useAxios & useSpinner hook
  const { user } = useAuth();
  const axios = useAxios();
  const spinner = useSpinner();

  //get totaJob count api
  fetch("http://localhost:5000/api/v1/jobsCount")
    .then((res) => res.json())
    .then((data) => {
      setCount(data?.count);
    });

  //pagesCount
  const pagesCount = Math.ceil(count / jobInPage);
  //console.log(pagesCount);

  //pages
  const pages = [...Array(pagesCount).keys()];

  //preview
  const handlePreview = () => {
    if (currentPage > 0) {
      setCurrentpage(currentPage - 1);
    }
  };

  //next
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentpage(currentPage + 1);
    }
  };

  //tenstackquery for get
  const { data, isLoading } = useQuery({
    queryKey: ["allJobs", user?.email, search, filter, currentPage, jobInPage],
    queryFn: async () => {
      return await axios.get(
        `/jobs/exclude?email=${user?.email}&search=${search}&category=${filter}&page=${currentPage}&size=${jobInPage}`
      );
    },
  });

  console.log(currentPage);
  return (
    <div className="bg-blue-100 bg-opacity-90 h-fit">
      {/* helmet */}
      <Helmet>
        <title>Hire Sync | All Jobs</title>
      </Helmet>

      <div className="container mx-auto p-5 space-y-5 ">
        <div className="text-center px-5 bg-base-200 py-5 space-y-3 rounded-lg shadow-md">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search by job title"
            className="input input-bordered w-full lg:w-1/2 mx-auto"
          />
        </div>
        <div className="grid grid-cols-12 gap-5 relative">
          <div className="col-span-full lg:col-span-3 bg-base-100 h-64 rounded-lg sticky z-10 top-0 p-5 space-y-5">
            <p className="text-blue-500 font-semibold border-b-2 border-blue-500">
              Filter by category
            </p>
            <div className="">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex gap-2 mb-4 items-center"
                >
                  <input
                    type="radio"
                    onChange={(e) => setFilter(e.target.value)}
                    checked={filter === category.name}
                    value={category.name}
                  />
                  <p>{category.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-full lg:col-span-9">
            {isLoading ? (
              spinner
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data?.data?.map((job) => (
                  <AllJobCard key={job._id} job={job}></AllJobCard>
                ))}
              </div>
            )}

            {data?.data.length >0 && (
              <div className="text-center mt-5 space-x-5">
                <button
                  onClick={handlePreview}
                  className="btn btn-outline text-blue-500 btn-sm"
                >
                  Prev
                </button>
                {pages.map((page) => (
                  <button
                    onClick={() => setCurrentpage(page)}
                    className="btn btn-outline text-blue-500 btn-sm"
                    key={page}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="btn btn-outline text-blue-500 btn-sm"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJob;
