import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Header/Banner/Banner";

import Statistics from "./Statistics/Statistics";

const Home = () => {
  return (
    <div>
      {/* helmet provider */}
      <Helmet>
        <title>Hire Sync</title>
      </Helmet>
      {/* end */}

      <Banner></Banner>
      <Statistics></Statistics>
    </div>
  );
};

export default Home;
