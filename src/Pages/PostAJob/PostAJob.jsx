import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const PostAJob = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="w-2/3 mx-auto">
            <h2 className="text-3xl font-bold mt-10 mb-6 text-center">Post a Job</h2>
            {/* row1 */}
            <div className="flex gap-5">
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Email Address</span>
                    </label>
                    <input readOnly defaultValue={user?.email} type="email" placeholder="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Job Title</span>
                    </label>
                    <input type="text" placeholder="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
            </div>

            {/* row2 */}
            <div className="flex gap-5">
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
            </div>

            {/* row3 */}
            <div className="flex gap-5">
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-12" required />
                </div>
            </div>

            {/* row4 */}
            <div className="flex gap-5">
                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <textarea placeholder="email" className="font-bold text-sm input rounded-none input-bordered focus:border-black focus:outline-none h-32 pt-2" required />
                </div>
            </div>
            <div className="flex justify-center">
                <input className="btn px-12 my-12 bg-[#e60278] text-white rounded-none" type="submit" value="Add Job" />
            </div>
        </div>
    );
};

export default PostAJob;