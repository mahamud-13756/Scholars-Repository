import { Link } from "react-router-dom";

const Banner = () => {
    
    return (
        <div className=" p-10 bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src="\src\assets\home.png" className="rounded-lg shadow-2xl w-full md:w-2/3"  />
                <div className="md:w-2/3 lg:w-1/3 lg:ms-10 bg-slate-200 p-5">
                    <h1 className="lg:text-2xl xl:text-4xl font-bold mb-3 text-black">A Hub for Knowledge Exchange</h1> {/* Add text-black class */}
                    <p className="mb-2"></p>
                    <Link to={'/contribute-resources'}><button className="btn bg-[#50C878] hover:bg-[#F26232] hover:text-white">Share Resources Now</button></Link>
                    {/* /contribute-resources */}
                </div>
            </div>
        </div>
    );
};

export default Banner;
