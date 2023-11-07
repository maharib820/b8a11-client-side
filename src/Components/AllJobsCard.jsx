import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const AllJobsCard = ({ category }) => {

    const [allJobs, setAllJobs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/allAddedJobs/${category.category}`)
            .then(res => res.json())
            .then(data => {
                setAllJobs(data)
            })
    }, [category.category])

    return (
        <div>
            {
                allJobs ?
                    <div>
                        {
                            allJobs?.map((job, index) => {
                                return (
                                    <div key={index} className="border-b-2 pb-8 mb-8 flex">
                                        <div className="w-4/5">
                                            <h2 className="font-bold text-lg text-black mb-4">{job.title}</h2>
                                            <p>
                                                {
                                                    job.description.length > 1000 ? job.description.slice(0, 700) + '.....' : job.description
                                                }
                                            </p>
                                            <h5 className="font-bold mt-4">Last Date: {job.date}</h5>
                                            <button className="btn bg-green-500 text-white mt-6 px-10">Bid Now</button>
                                        </div>
                                        <div className="ps-16">
                                            <h2 className="font-bold text-lg text-black mb-4">${job.minprice}-${job.maxprice}</h2>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    ""
            }
        </div>
    );
};

export default AllJobsCard;

AllJobsCard.propTypes = {
    category : PropTypes.object
}