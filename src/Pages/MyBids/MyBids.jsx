import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyBids = () => {

    const { user } = useContext(AuthContext);
    const [myAddedBids, setMyAddedBids] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/allBids?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyAddedBids(data)
            })
    }, [user?.email, myAddedBids?.status])

    // console.log(myAddedBids);

    const handleComplete = (id) => {
        fetch(`http://localhost:5000/confirm/${id}`, {
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
                    alert("Data updated")
                    const remaining = myAddedBids.filter(bid => bid._id !== id);
                    const updated = myAddedBids.find(booking => booking._id === id);
                    updated.status = 'complete';
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
                                        <td>{myAddedBid.bidby}</td>
                                        <td>{myAddedBid.deadline}</td>
                                        <td>{myAddedBid.status}</td>
                                        {
                                            myAddedBid.status === "in progress" ?
                                                <td><button onClick={() => handleComplete(myAddedBid?._id)} className="btn bg-green-600 text-white">Complete</button></td> : ""
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