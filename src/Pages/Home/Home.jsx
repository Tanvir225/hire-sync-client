import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Header/Banner/Banner";
import bannerImg from "../../assets/images/banner.jpg"
import Statistics from "./Statistics/Statistics";

const Home = () => {
  return (
    <div>
      {/* helmet provider */}
      <Helmet>
        <title>Hire Sync</title>
      </Helmet>
      {/* end */}

      <Banner bannerImg={bannerImg}></Banner>
      <Statistics></Statistics>
    </div>
  );
};

export default Home;
