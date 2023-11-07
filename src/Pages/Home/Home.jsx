import { useState } from "react";
import Banner from "../../Components/Banner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Home = () => {

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
                            <Tab className={`flex-grow text-center py-2 outline-none ${tabIndex===0 ? 'text-[#29b2fe] border-b-2 border-[#29b2fe]' : ''}`}>Web Development</Tab>
                            <Tab className={`flex-grow text-center py-2 outline-none ${tabIndex===1 ? 'text-[#29b2fe] border-b-2 border-[#29b2fe]' : ''}`}>Digital Marketing</Tab>
                            <Tab className={`flex-grow text-center py-2 outline-none ${tabIndex===2 ? 'text-[#29b2fe] border-b-2 border-[#29b2fe]' : ''}`}>Graphics Design</Tab>
                        </TabList>
                    </div>

                    <div className="max-w-7xl mx-auto bg-white border drop-shadow p-10 mt-5">
                        <TabPanel>
                            <h2>Any content 1</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Home;