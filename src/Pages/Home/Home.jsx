import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Header/Banner/Banner";
import bannerImg from "../../assets/images/banner.jpg";
import Statistics from "./Statistics/Statistics";
import ReactTabs from "./ReactTabs/ReactTabs";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useSpinner from "../../Hook/useSpinner";

const Home = () => {
  //useLoader data
  const categories = useLoaderData();
  //useAuth & spinner
  const { loading } = useAuth();
  const spinner = useSpinner();

  return (
    <div>
      {/* helmet provider */}
      <Helmet>
        <title>Hire Sync</title>
      </Helmet>
      {/* end */}

      {loading ? (
        spinner
      ) : (
        <div className="bg-blue-50  bg-opacity-95">
          <Banner bannerImg={bannerImg} text={"A job isn't just a job! It's who you are."} desc={"Be yourself,everyone else is already taken"}></Banner>
          <Statistics></Statistics>
          <div className="mt-10 space-y-5 container mx-auto">
            <h1 className="text-center text-3xl font-bold mt-5">
              Filter popular jobs by category!
            </h1>
            <p className="text-gray-500 text-lg text-center text-semibold w-full md:w-96 mx-auto leading-8">
              Explore endless career opportunities, where talent meets
              opportunity. Discover curated job listings
            </p>

            <ReactTabs categories={categories}></ReactTabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
