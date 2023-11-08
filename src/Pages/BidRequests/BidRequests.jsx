import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { TbBounceRightFilled } from 'react-icons/tb';
import { RxCross2 } from 'react-icons/rx';

const BidRequests = () => {

    const { user } = useContext(AuthContext);
    const [myAddedBids, setMyAddedBids] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/allRequestedBids?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyAddedBids(data)
            })
    }, [user?.email])

    // ...................................................................................................
    const handleRA = (id, bool) => {
        fetch(`http://localhost:5000/confirm/${id}`, {
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
                    alert("Data updated")
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
                                                <button onClick={() => handleRA(myAddedBid?._id, true)} className="btn bg-green-500"><TbBounceRightFilled className="text-white text-2xl"></TbBounceRightFilled></button> :
                                                ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                myAddedBid.status === "pending" ? 
                                                <button onClick={() => handleRA(myAddedBid?._id, false)} className="btn bg-red-500"><RxCross2 className="text-white text-2xl"></RxCross2></button> :
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