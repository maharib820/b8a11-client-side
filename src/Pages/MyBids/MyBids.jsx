import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';

const MyBids = () => {

    const { user } = useContext(AuthContext);
    const [myAddedBids, setMyAddedBids] = useState(null);

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch(`https://server-hire-wave.vercel.app/allBids?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyAddedBids(data)
            })
    }, [user?.email, myAddedBids?.status, selected, setSelected])

    // console.log(myAddedBids);

    const handleComplete = (id) => {
        fetch(`https://server-hire-wave.vercel.app/confirm/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: "complete" })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    const remaining = myAddedBids.filter(bid => bid._id !== id);
                    const updated = myAddedBids.find(booking => booking._id === id);
                    updated.status = 'complete';
                    const newBids = [updated, ...remaining];
                    setMyAddedBids(newBids);
                }
            })
    }

    const handleSelect = (e) => {
        fetch(`https://server-hire-wave.vercel.app/allBidss/${e.target.value}?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyAddedBids(data)
            })
    }

    // const handleShowAll = (email) => {
    //     fetch(`https://server-hire-wave.vercel.app/allBidss/${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setMyAddedBids(data)
    //         })
    // }

    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>WaveHire | MyBids</title>
            </Helmet>
            <div className="mt-8 ml-4">
                <h2 className="font-bold mb-3">Sort by status</h2>
                <div className="flex items-center">
                    <div>
                        <select defaultValue={'DEFAULT'} onChange={handleSelect} name="status" placeholder="hee" id="" className="select select-bordered w-full max-w-xs borser-2 focus:outline-none">
                            <option value="DEFAULT" disabled>Filter using status</option>
                            <option value="complete">complete</option>
                            <option value="in progress">in progress</option>
                            <option value="canceled">canceled</option>
                            <option value="pending">pending</option>
                        </select>
                    </div>
                    <div><button className="btn ml-2">Show All</button></div>
                </div>
            </div>
            <div className="overflow-x-auto font-bold mt-3">
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td>Job title</td>
                            <td>Email</td>
                            <td>Deadline</td>
                            <td>Status</td>
                            <td>Complete</td>
                        </tr>
                    </thead>
                    {
                        myAddedBids?.map((myAddedBid, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{myAddedBid.title}</td>
                                        <td>{myAddedBid.postedby}</td>
                                        <td>{myAddedBid.deadline}</td>
                                        <td>{myAddedBid.status}</td>
                                        {
                                            myAddedBid.status === "in progress" ?
                                                <td><button onClick={() => handleComplete(myAddedBid?._id)} className="bg-green-600 text-white px-2 rounded-xl">Complete</button></td> : ""
                                        }
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    );
};

export default MyBids;