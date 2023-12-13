import { useEffect, useState } from "react";
import Banner from "../../Components/Banner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLoaderData } from "react-router-dom";
import AllJobsCard from "../../Components/AllJobsCard";
import { Helmet } from "react-helmet-async";

const Home = () => {

    const [expJob, setExpJob] = useState(null);

    useEffect(() => {
        fetch("https://my-wavehire-server.vercel.app/sortedjob")
            .then(res => res.json())
            .then(data => {
                setExpJob(data)
            })
    }, [])

    const categories = useLoaderData();

    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div>
            <Helmet>
                <title>WaveHire | Home | Freelancer Marketplace</title>
            </Helmet>
            <div className='border-b-2'>
                <Banner></Banner>
            </div>
            <div className="flex justify-center rounded-none mt-8 w-full px-2 lg:px-0">
                <Tabs defaultFocus={true} defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full">
                    <div className="w-full px-2 lg:px-0 lg:max-w-7xl mx-auto bg-white border drop-shadow">
                        <TabList className="flex lg:gap-8 mx-auto text-slate-500 font-bold">
                            {
                                categories?.map(category => {
                                    return <Tab
                                        key={category.id}
                                        className={`flex-grow text-center py-2 outline-none ${tabIndex === (category.id - 1) ? 'text-[#29b2fe] border-b-2 border-[#29b2fe]' : ''}`}>
                                        {category.category}
                                    </Tab>
                                })
                            }
                        </TabList>
                    </div>

                    <div className="max-w-7xl mx-auto bg-white border drop-shadow p-2 lg:p-10 mt-5">
                        {
                            categories?.map(category => {
                                return <TabPanel key={category.id}>
                                    <AllJobsCard category={category}></AllJobsCard>
                                </TabPanel>
                            })
                        }
                    </div>
                </Tabs>
            </div>
            <div className="max-w-7xl mx-auto shadow-xl mt-10 px-10">
                <h2 className="text-center text-2xl font-bold my-10">Will Expire Soon</h2>
                {
                    expJob ?
                        <div>
                            {
                                expJob?.map((job, index) => {
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
            <div>
                <div className="bg-gray-100 py-8">
                    <div className="container mx-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Our Technology Partners</h2>
                        <div className="flex justify-center items-center space-x-4 gap-5 lg:gap-28 mt-8">
                            <div className="w-32">
                                <img src="https://i.ibb.co/q05H7WM/1.jpg" alt="Brand 1" />
                            </div>
                            <div className="w-32">
                                <img src="https://i.ibb.co/1zwYywz/2.png" alt="Brand 2" />
                            </div>
                            <div className="w-32">
                                <img src="https://i.ibb.co/RHgp51R/ezgif-com-webp-to-jpg.jpg" alt="Brand 3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='w-full bg-slate-500 h-[300px] my-20'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <input className='w-1/2 h-12 rounded-l-full pl-5' placeholder='subscribe to get regular update' type="text" />
                        <button className='btn rounded-l-none rounded-r-full bg-[#e50010] text-white'>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;