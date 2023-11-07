import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

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
        <div>

        </div>
    );
};

export default AddedJobs;