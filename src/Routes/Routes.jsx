import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddedJobs from "../Pages/AddedJobs/AddedJobs";
import MyBids from "../Pages/MyBids/MyBids";
import BidRequests from "../Pages/BidRequests/BidRequests";
import Home from "../Pages/Home/Home";
import PostAJob from "../Pages/PostAJob/PostAJob";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/added_jobs",
                element: <AddedJobs></AddedJobs>
            },
            {
                path: "/my_bids",
                element: <MyBids></MyBids>
            },
            {
                path: "/bid_requests",
                element: <BidRequests></BidRequests>
            },
            {
                path: "/post_job",
                element: <PostAJob></PostAJob>
            }
        ]
    },
]);

export default router;