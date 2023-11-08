import { PiWavesBold } from "react-icons/pi";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineDownSquare } from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from 'sweetalert2';

const Navbar = () => {

    const location = useLocation();
    // console.log(location);

    const [expended, setExpended] = useState(false);
    // console.log(expended);

    const { loading, user, logOut } = useContext(AuthContext);

    const logOutHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout from your account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
                Swal.fire({
                    title: "Logout!",
                    text: "You logout successfully",
                    icon: "success"
                });
            }
        });
    }

    const links =
        <>
            <li><NavLink to={"/"} className={location.pathname === "/" ? "bg-slate-600 font-bold lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>Home</NavLink></li>
            <li><NavLink to={"/wavehire/added_jobs"} className={location.pathname === "/wavehire/added_jobs" ? "bg-slate-600 font-bold lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>Added Jobs</NavLink></li>
            <li><NavLink to={"/wavehire/my_bids"} className={location.pathname === "/wavehire/my_bids" ? "bg-slate-600 font-bold lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>My Bids</NavLink></li>
            <li><NavLink to={"/wavehire/bid_requests"} className={location.pathname === "/wavehire/bid_requests" ? "bg-slate-600 font-bold lg:py-[9px] lg:px-4 text-red-600 lg:text-white" : ""}>Bid Requests</NavLink></li>
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
                    <Link to={"/wavehire/post_job"}><button className="btn bg-[#e60278] text-white">Post a Job</button></Link>
                    {
                        loading ? <span className="loading loading-ring loading-lg"></span> :
                            user ?
                                <div className="flex items-center gap-1 md:gap-2">
                                    <div><img className="h-12 w-12 rounded-full" src={user?.photoURL} alt="" /></div>
                                    <p className="text-slate-700 italic">{user.displayName}</p>
                                    <div onClick={logOutHandler}>
                                        <AiOutlineDownSquare className="font-bold text-3xl mt-0 text-slate-700"></AiOutlineDownSquare>
                                    </div>
                                </div>
                                :
                                <div>
                                    <Link to={"/wavehire/login"} className="btn bg-[#29b2fe] rounded-r-none text-white">Log In</Link>
                                    <Link to={"/wavehire/register"} className="btn bg-[#29b2fe] text-white rounded-l-none">Sign Up</Link>
                                </div>
                    }
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
                    <div className="h-screen w-3/4 md:w-1/2 bg-slate-600 absolute top-0 lg:hidden pl-4 z-50">
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