import { useState } from "react";
import Banner from "../../Components/Banner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLoaderData } from "react-router-dom";
import AllJobsCard from "../../Components/AllJobsCard";

const Home = () => {

    const categories = useLoaderData();

    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div>
            <div className='border-b-2'>
                <Banner></Banner>
            </div>
            <div className="flex justify-center rounded-none mt-8">
                <Tabs defaultFocus={true} defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full">
                    <div className="max-w-7xl mx-auto bg-white border drop-shadow">
                        <TabList className="flex gap-8 mx-auto text-slate-500 font-bold">
                            {
                                categories.map(category => {
                                    return <Tab
                                        key={category.id}
                                        className={`flex-grow text-center py-2 outline-none ${tabIndex === (category.id - 1) ? 'text-[#29b2fe] border-b-2 border-[#29b2fe]' : ''}`}>
                                        {category.category}
                                    </Tab>
                                })
                            }
                        </TabList>
                    </div>

                    <div className="max-w-7xl mx-auto bg-white border drop-shadow p-10 mt-5">
                        {
                            categories.map(category => {
                                return <TabPanel key={category.id}>
                                    <AllJobsCard category={category}></AllJobsCard>
                                </TabPanel>
                            })
                        }
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Home;