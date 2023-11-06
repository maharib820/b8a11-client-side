import { useState } from "react";
import Banner from "../../Components/Banner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const Home = () => {

    const [tabIndex, setTabIndex] = useState(1);
    
    return (
        <div>
            <div className='border-b-2'>
                <Banner></Banner>
            </div>
            <div className="flex justify-center rounded-none mt-8">
                <Tabs defaultFocus={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full">
                    <div className="max-w-7xl mx-auto bg-white border drop-shadow">
                        <TabList className="flex gap-8 mx-auto text-black font-bold">
                            <Tab className="flex-grow text-center focus:bg-black focus:text-white py-2 border-none outline-none">Web Development</Tab>
                            <Tab className="flex-grow text-center focus:bg-black focus:text-white py-2 border-none outline-none">Digital Marketing</Tab>
                            <Tab className="flex-grow text-center focus:bg-black focus:text-white py-2 border-none outline-none"> Graphics Design</Tab>
                        </TabList>
                    </div>

                    <div className="max-w-7xl mx-auto bg-white border drop-shadow p-10 mt-6">
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