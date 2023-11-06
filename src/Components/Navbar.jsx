import { PiWavesBold } from "react-icons/pi";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

    const location = useLocation();
    // console.log(location);

    const [expended, setExpended] = useState(false);
    console.log(expended);

    const links =
        <>
            <li><NavLink to={"/"} className={location.pathname === "/" ? "bg-slate-600 lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>Home</NavLink></li>
            <li><NavLink to={"/added_jobs"} className={location.pathname === "/added_jobs" ? "bg-slate-600 lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>Added Jobs</NavLink></li>
            <li><NavLink to={"/my_bids"} className={location.pathname === "/my_bids" ? "bg-slate-600 lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>My Bids</NavLink></li>
            <li><NavLink to={"/bid_requests"} className={location.pathname === "/bid_requests" ? "bg-slate-600 lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>Bid Requests</NavLink></li>
        </>

    return (
        <div className="relative">
            <div className="flex flex-col gap-5 lg:flex-row justify-between items-center max-w-7xl mx-auto py-5 lg:px-2 xl:px-0">
                <div className="flex items-center gap-1">
                    <button onClick={() => setExpended(true)}><BiMenuAltRight className="text-4xl lg:hidden"></BiMenuAltRight></button>
                    <PiWavesBold className="text-[#29b2fe] text-4xl"></PiWavesBold>
                    <h1 className="text-3xl text-[#161f2b] font-bold">WAVEHIRE</h1>
                </div>
                <div className="flex items-center gap-8 font-bold">
                    <div>
                        <Link to={"/login"} className="btn bg-[#29b2fe] rounded-r-none text-white">Log In</Link>
                        <Link to={"/register"} className="btn bg-[#29b2fe] text-white rounded-l-none">Sign Up</Link>
                    </div>
                    <Link to={"/post_job"}><button className="btn bg-[#e60278] text-white">Post a Job</button></Link>
                </div>
            </div>
            <div className="w-full bg-black h-[39px] hidden lg:block lg:px-3 xl:px-0">
                <div className="max-w-7xl mx-auto text-white h-full flex items-center">
                    <ul className="flex items-center gap-14">
                        {
                            links
                        }
                    </ul>
                </div>
            </div>
            {
                expended ?
                    <div className="h-screen w-3/4 md:w-1/2 bg-slate-600 absolute top-0 lg:hidden pl-4">
                        <button className="mt-5" onClick={() => setExpended(false)}><BiMenuAltRight className="text-4xl lg:hidden text-white"></BiMenuAltRight></button>
                        <ul className="flex flex-col gap-2 mt-8 text-white pl-1 font-bold">
                            {
                                links
                            }
                        </ul>
                    </div>
                    : ""
            }
        </div>
    );
};

export default Navbar;