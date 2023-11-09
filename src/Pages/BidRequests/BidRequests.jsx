import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';

const BidRequests = () => {

    const { user } = useContext(AuthContext);
    const [myAddedBids, setMyAddedBids] = useState(null);

    useEffect(() => {
        fetch(`https://server-hire-wave.vercel.app/allRequestedBids?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyAddedBids(data)
            })
    }, [user?.email])

    // ...................................................................................................
    const handleRA = (id, bool) => {
        fetch(`https://server-hire-wave.vercel.app/confirm/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: bool ? JSON.stringify({ status: "in progress" }) : JSON.stringify({ status: "canceled" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    const remaining = myAddedBids.filter(bid => bid._id !== id);
                    const updated = myAddedBids.find(bid => bid._id === id);
                    bool ? updated.status = 'in progress' : updated.status = 'canceled';
                    const newBids = [updated, ...remaining];
                    setMyAddedBids(newBids);
                }
            })
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>WaveHire | Bid Request</title>
            </Helmet>
            <div className="overflow-x-auto font-bold mt-10">
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td>Job title</td>
                            <td>Email</td>
                            <td>Deadline</td>
                            <td>Price</td>
                            <td>Status</td>
                            <td>Accept</td>
                            <td>Reject</td>
                        </tr>
                    </thead>
                    {
                        myAddedBids?.map((myAddedBid, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{myAddedBid.title}</td>
                                        <td>{myAddedBid.bidby}</td>
                                        <td>{myAddedBid.deadline}</td>
                                        <td>${myAddedBid.bidamount}</td>
                                        <td>{myAddedBid.status}</td>
                                        <td>
                                            {
                                                myAddedBid.status === "pending" ?
                                                    <button onClick={() => handleRA(myAddedBid?._id, true)} className="bg-green-500 px-4 text-white rounded-xl">Accept</button> :
                                                    ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                myAddedBid.status === "pending" ?
                                                    <button onClick={() => handleRA(myAddedBid?._id, false)} className="bg-red-500 px-4 text-white rounded-xl">Reject</button> :
                                                    ""
                                            }
                                        </td>
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

export default BidRequests;