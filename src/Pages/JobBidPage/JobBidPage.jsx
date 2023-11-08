import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const JobBidPage = () => {

    const data = useLoaderData();
    const { user } = useContext(AuthContext);
    const [datee, setDatee] = useState(null);

    useEffect(() => {
        const today = new Date();
        // today.setDate(today.getDate() + 10);
        const tomorrow = today.toISOString().split('T')[0];
        setDatee(tomorrow)
    }, [setDatee])

    const handleSubmitedBid = e => {
        e.preventDefault();
    }

    return (
        <div className="max-w-full xl:max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 mt-10 px-4 xl:px-0">
            <div className="w-full lg:w-2/4 space-y-6">
                <h2 className="text-2xl font-bold text-center xl:text-left">{data.title}</h2>
                <h5 className="font-bold text-center xl:text-left">Last date {data.date}</h5>
                <h5 className="font-bold text-center xl:text-left">Range ${data.minprice} - ${data.maxprice}</h5>
                <p>
                    {data.description}
                </p>
            </div>
            <div className="ml-0 lg:ml-28 xl:ml-40 max-w-full lg:w-1/3">
                <h2 className="text-2xl font-bold">BID NOW</h2>
                <form className="mt-6" onSubmit={handleSubmitedBid}>
                    <div className="form-control">
                        <input type="text" placeholder="amount" name="bidamount" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control mt-5">
                        <input min={datee} type="date" name="deadline" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control mt-5">
                        <input readOnly defaultValue={user?.email} type="email" placeholder="email" name="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control mt-5">
                        <input readOnly defaultValue={data?.email} type="email" name="title" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <input className="btn w-full mt-8 rounded-none bg-[#161e2c] text-white" type="submit" value="Bid Now" />
                </form>
            </div>
        </div>
    );
};

export default JobBidPage;