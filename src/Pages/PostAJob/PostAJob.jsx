import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const PostAJob = () => {

    const { user } = useContext(AuthContext);
    const [datee, setDatee] = useState(null);

    const categories = useLoaderData();

    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() + 10);
        const tomorrow = today.toISOString().split('T')[0];
        setDatee(tomorrow)
    }, [setDatee])


    const handleAddJobForm = e => {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const email = form.email.value;
        const title = form.title.value;
        const category = form.category.value;
        const date = form.date.value;
        const minprice = form.minprice.value;
        const maxprice = form.maxprice.value;
        const description = form.description.value;
        const newJob = { email, title, category, date, minprice, maxprice, description };
        // console.log(newJob);
        fetch("http://localhost:5000/newAddedJobs", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    form.reset();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Job posted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/added_jobs")
                }
            })
    }

    return (
        <div className="w-full lg:w-2/3 mx-auto px-5 lg:px-0">
            <form onSubmit={handleAddJobForm}>
                <h2 className="text-3xl font-bold mt-10 mb-6 text-center">POST JOB</h2>
                {/* row1 */}
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Email Address</span>
                        </label>
                        <input readOnly defaultValue={user?.email} type="email" placeholder="email" name="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Job Title</span>
                        </label>
                        <input type="text" placeholder="title" name="title" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                </div>

                {/* row2 */}
                <div className="flex flex-col lg:flex-row gap-5 mt-4">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Category</span>
                        </label>
                        <select name="category" className="select select-bordered w-full rounded-none font-bold text-sm focus:border-black focus:outline-none">
                            {
                                categories?.map(category => <option key={category.id}>{category.category}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Deadline</span>
                        </label>
                        <input type="date" min={datee} name="date" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                </div>

                {/* row3 */}
                <div className="flex flex-col lg:flex-row gap-5 mt-4">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Min Price</span>
                        </label>
                        <input type="text" name="minprice" placeholder="starting price" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Max Price</span>
                        </label>
                        <input type="text" name="maxprice" placeholder="ending price" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                    </div>
                </div>

                {/* row4 */}
                <div className="flex gap-5 mt-4">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Job Description</span>
                        </label>
                        <textarea name="description" placeholder="write a short description" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-32 pt-2" required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <input className="btn px-12 my-12 bg-[#e60278] text-white rounded-none" type="submit" value="Add Job" />
                </div>
            </form>
        </div>
    );
};

export default PostAJob;