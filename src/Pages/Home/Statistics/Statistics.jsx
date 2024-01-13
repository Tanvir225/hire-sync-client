

const Statistics = () => {
    return (
        <div className="bg-blue-600 space-y-10 p-6 text-white lg:h-[55vh] bg-opacity-85">
            <h2 className="text-center text-4xl">Careers Statistics
            </h2>
            <p className="text-center text-xl w-full lg:w-[55%] mx-auto">Explore endless career opportunities, where talent meets opportunity. Discover curated job listings, connect with top employers, and take the next step in your professional journey. </p>
            <div className="grid grid-cols-2  md:grid-cols-4 text-lg font-semibold  justify-evenly  items-center text-center ">
                <div className="flex flex-col p-2 items-center gap-5  rounded-box ">
                    <span className="countdown  text-5xl">
                        <span style={{ "--value": 15 }}></span>
                    </span>
                    Total Job
                </div>
                <div className="flex flex-col p-2 items-center gap-5 rounded-box ">
                    <span className="countdown  text-5xl">
                        <span style={{ "--value": 10 }}></span>
                    </span>
                    Job Posted
                </div>
                <div className="flex flex-col p-2 items-center gap-5 rounded-box ">
                    <span className="countdown  text-5xl">
                        <span style={{ "--value": 24 }}></span>
                    </span>
                    Job Filled
                </div>
                <div className="flex flex-col p-2 items-center gap-5 rounded-box ">
                    <span className="countdown  text-5xl">
                        <span style={{ "--value": 35 }}></span>
                    </span>
                    Companies
                </div>
            </div>
        </div>
    );
};

export default Statistics;