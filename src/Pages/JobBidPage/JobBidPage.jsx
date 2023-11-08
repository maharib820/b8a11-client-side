import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const JobBidPage = () => {

    const data = useLoaderData();
    const { user } = useContext(AuthContext);
    const [datee, setDatee] = useState(null);
    const navigate = useNavigate();

    const toastt = (value) => toast(value, { position: toast.POSITION.TOP_CENTER })

    useEffect(() => {
        const today = new Date();
        // today.setDate(today.getDate() + 10);
        const tomorrow = today.toISOString().split('T')[0];
        setDatee(tomorrow)
    }, [setDatee])

    const handleSubmitedBid = e => {
        e.preventDefault();
        const max = parseInt(data?.maxprice);
        const min = parseInt(data?.minprice);
        const form = e.target;
        const bidamount = form.bidamount.value;
        if (parseInt(bidamount) > max || parseInt(bidamount) < min) {
            toastt("Invalid bid amount");
            return
        }
        const deadline = form.deadline.value;
        const bidby = form.bidby.value;
        const postedby = form.postedby.value;
        const title = data.title;
        const newAddedBids = { bidamount, deadline, bidby, postedby, status: 'pending', title };
        fetch("http://localhost:5000/newAddedBids", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newAddedBids)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your bid is successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/wavehire/my_bids")
                }
            })
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
                        <input type="number" placeholder="amount" name="bidamount" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control mt-5">
                        <input min={datee} max={data?.date} type="date" name="deadline" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control mt-5">
                        <input readOnly defaultValue={user?.email} type="email" placeholder="email" name="bidby" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control mt-5">
                        <input readOnly defaultValue={data?.email} type="email" name="postedby" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    {
                        user?.email === data?.email ? "" : <input className="btn w-full mt-8 rounded-none bg-[#161e2c] text-white" type="submit" value="Bid Job" />
                    }
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default JobBidPage;