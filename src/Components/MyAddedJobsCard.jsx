import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyAddedJobsCard = ({ myAddedJob }) => {

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
                fetch(`http://localhost:5000/deletejob/${e}`, {
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
                        }
                    })
            }
        });
    }

    return (
        <div className='border-b-2 mb-6'>
            <div>
                <div className="flex gap-8 items-center">
                    <h2 className="text-4xl">{myAddedJob.title}</h2>
                    <div className='flex items-center gap-5'>
                        <Link to={`/updatemyaddedjobs/${myAddedJob?._id}`}><button><AiOutlineEdit className='text-green-600 text-2xl mt-2'></AiOutlineEdit></button></Link>
                        <button onClick={() => handleJobDelete(myAddedJob?._id)}><AiOutlineDelete className='text-red-600 text-2xl'></AiOutlineDelete></button>
                    </div>
                </div>
                <h5 className="font-bold my-4">{myAddedJob.category}</h5>
                <h5 className="font-bold my-4">Last date {myAddedJob.date}</h5>
                <p>
                    {
                        myAddedJob.description
                    }
                </p>
                <p className='mt-4 mb-6 font-bold'>
                    BID RANGE ${myAddedJob.minprice} - ${myAddedJob.maxprice}
                </p>
            </div>
        </div>
    );
};

export default MyAddedJobsCard;

MyAddedJobsCard.propTypes = {
    myAddedJob: PropTypes.object
}