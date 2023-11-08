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
import UpdateMyAddedJob from "../Pages/UpdateMyAddedJob/UpdateMyAddedJob";
import JobBidPage from "../Pages/JobBidPage/JobBidPage";
import PrivateRoute from "../Private/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch("https://server-hire-wave.vercel.app/categories")
            },
            {
                path: "/wavehire/login",
                element: <Login></Login>
            },
            {
                path: "/wavehire/register",
                element: <Register></Register>
            },
            {
                path: "/wavehire/added_jobs",
                element: <PrivateRoute><AddedJobs></AddedJobs></PrivateRoute>,
            },
            {
                path: "/wavehire/my_bids",
                element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
            },
            {
                path: "/wavehire/bid_requests",
                element: <PrivateRoute><BidRequests></BidRequests></PrivateRoute>
            },
            {
                path: "/wavehire/post_job",
                element: <PrivateRoute><PostAJob></PostAJob></PrivateRoute>,
                loader: () => fetch("https://server-hire-wave.vercel.app/categories")
            },
            {
                path: "/wavehire/updatemyaddedjobs/:id",
                element: <PrivateRoute><UpdateMyAddedJob></UpdateMyAddedJob></PrivateRoute>,
                loader: ({ params }) => fetch(`https://server-hire-wave.vercel.app/updateaddedjob/${params.id}`)
            },
            {
                path: "/wavehire/job/:id",
                element: <PrivateRoute><JobBidPage></JobBidPage></PrivateRoute>,
                loader: ({ params }) => fetch(`https://server-hire-wave.vercel.app/jobdetails/${params.id}`)
            }
        ]
    },
]);

export default router;