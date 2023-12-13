import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import MyAddedJobsCard from "../../Components/MyAddedJobsCard";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";

const AddedJobs = () => {

    const { user } = useContext(AuthContext);
    const [myAddedJobs, setMyAddedJobs] = useState(null);

    useEffect(() => {
        fetch(`https://my-wavehire-server.vercel.app/allAddedJobs?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyAddedJobs(data)
            })
    }, [user?.email])

    const handleJobDelete = e => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your post will delete permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://my-wavehire-server.vercel.app/deletejob/${e}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = myAddedJobs.filter(job => job._id !== e);
                            setMyAddedJobs(remaining);
                        }
                    })
            }
        });
    }

    return (
        <div className="max-w-7xl mx-auto bg-white border drop-shadow p-10 mt-5">
            <Helmet>
                <title>WaveHire | Added Jobs</title>
            </Helmet>
            {
                myAddedJobs?.map((myAddedJob, index) => <MyAddedJobsCard key={index} myAddedJob={myAddedJob} handleJobDelete={handleJobDelete}></MyAddedJobsCard>)
            }
        </div>
    );
};

export default AddedJobs;