import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';

const AllJobsCard = ({ category }) => {

    const [allJobs, setAllJobs] = useState([]);
    const [todayDate, setTodayDate] = useState(null);
    // const [jobLastDate, setJobLastDate] = useState(null);

    useEffect(() => {
        fetch(`https://my-wavehire-server.vercel.app/allAddedJobs/${category.category}`)
            .then(res => res.json())
            .then(data => {
                setAllJobs(data)
            })
        const today = new Date();
        setTodayDate(today);
    }, [category.category])


    return (
        <div>
            {
                allJobs ?
                    <div>
                        {
                            allJobs?.map((job, index) => {
                                return (
                                    <div key={index} className="border-b-2 pb-8 mb-8 flex flex-col gap-8 lg:flex-row lg:gap-0">
                                        <div className="w-4/5 text-center mx-auto lg:text-left lg:mx-0">
                                            <h2 className="font-bold text-lg text-black mb-4 text-center lg:text-left">{job.title}</h2>
                                            <p className="max-w-full">
                                                {
                                                    job.description.length > 1000 ? job.description.slice(0, 700) + '.....' : job.description
                                                }
                                            </p>
                                            <h5 className="font-bold mt-4">Last Date: {job.date}</h5>
                                            {
                                                <Countdown
                                                    date={new Date(job?.date)}
                                                    intervalDelay={0}
                                                    precision={3}
                                                    renderer={(props) => {
                                                        const { days, hours, minutes, seconds, completed } = props;

                                                        if (completed) {
                                                            return ""
                                                        } else {
                                                            return (
                                                                <div className="flex gap-4 mt-4">
                                                                    <div>{days} days</div>
                                                                    <div>{hours} hours</div>
                                                                    <div>{minutes} minutes</div>
                                                                    <div>{seconds} seconds</div>
                                                                </div>
                                                            );
                                                        }
                                                    }}
                                                />
                                            }
                                            {
                                                todayDate <= new Date(job.date) ? <Link to={`/wavehire/job/${job._id}`}><button className="btn bg-green-500 text-white mt-6 px-10">Bid Now</button></Link> : <p className="text-red-600 font-bold mt-6">Deadline passed</p>
                                            }
                                        </div>
                                        <div className="ps-0 lg:ps-16">
                                            <h2 className="font-bold text-lg text-black mb-4 text-center lg:text-left">${job.minprice}-${job.maxprice}</h2>
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
    category: PropTypes.object
}