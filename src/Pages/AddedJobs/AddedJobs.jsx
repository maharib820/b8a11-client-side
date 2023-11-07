import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import MyAddedJobsCard from "../../Components/MyAddedJobsCard";

const AddedJobs = () => {

    const { user } = useContext(AuthContext);
    const [myAddedJobs, setMyAddedJobs] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/allAddedJobs?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyAddedJobs(data)
            })
    }, [user?.email])

    return (
        <div className="max-w-7xl mx-auto bg-white border drop-shadow p-10 mt-5">
            {
                myAddedJobs?.map((myAddedJob, index) => <MyAddedJobsCard key={index} myAddedJob={myAddedJob}></MyAddedJobsCard>)
            }
        </div>
    );
};

export default AddedJobs;