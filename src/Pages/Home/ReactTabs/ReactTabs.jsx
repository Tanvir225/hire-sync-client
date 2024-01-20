import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useAxios from "../../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useSpinner from "../../../Hook/useSpinner";
import AllJobCard from "../../../Components/AllJobCard/AllJobCard";
import useAuth from "../../../Hook/useAuth";

const ReactTabs = ({ categories }) => {
  //state
  const [category, setCategory] = useState("Remote");
  //useAxios and spinner & useAuth()
  const axios = useAxios();
  const spinner = useSpinner();
  const { user, loading } = useAuth();

  //tenstack query
  const { data, isLoading } = useQuery({
    queryKey: ["tJobs", category, user?.email],
    queryFn: async () => {
      return await axios.get(
        `/jobs/exclude/home?email=${user?.email}&category=${category}`
      );
    },
  });

  const handleTabChange = (index) => {
    setCategory(categories[index].name);
  };

  console.log(category);

  return (
    <div>
      {isLoading ? (
        spinner
      ) : (
        <Tabs
          onSelect={handleTabChange}
          selectedIndex={categories.findIndex((cat) => cat.name === category)}
        >
          <TabList className={"text-center"}>
            {categories?.map((cat) => (
              <Tab
                key={cat._id}
                value={cat.name}
                className={`btn btn-outline text-blue-500  mr-6 ${
                  category === cat.name ? "bg-blue-500 text-white" : ""
                }`}
              >
                {cat.name}
              </Tab>
            ))}
          </TabList>

          <div className="grid md:grid-cols-2 gap-5 mt-5 px-5">
            {data?.data?.map((job) => (
              <TabList key={job._id}>
                <AllJobCard job={job}></AllJobCard>
              </TabList>
            ))}
          </div>
        </Tabs>
      )}
    </div>
  );
};

export default ReactTabs;
