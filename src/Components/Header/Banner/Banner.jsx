
const Banner = ({ bannerImg, text,desc }) => {
    return (
        <div className={`hero h-[70vh] `} style={{ backgroundImage: `url(${bannerImg})`,objectFit:"cover" }}>
            <div className="hero-overlay bg-blue-950 bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md space-y-5">
                    <h2 className="text-4xl font-bold">{
                        text
                    }</h2>
                    <p className=" text-blue-200 text-lg font-semibold">{
                        desc
                    }</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;