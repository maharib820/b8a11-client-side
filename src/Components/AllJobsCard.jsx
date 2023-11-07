import { useEffect, useState } from "react";

const AllJobsCard = ({ category }) => {

    const [allJobs, setAllJobs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/allAddedJobs/${category.category}`)
            .then(res => res.json())
            .then(data => {
                setAllJobs(data)
            })
    }, [category.category])

    console.log(allJobs);

    return (
        <div>
            <h2>{category.category}</h2>
        </div>
    );
};

export default AllJobsCard;