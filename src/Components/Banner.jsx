import { Player } from '@lottiefiles/react-lottie-player';
import { TypeAnimation } from 'react-type-animation';

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Banner */}
            <div className="flex justify-center">
                <div className='flex-1 flex lg:justify-start justify-center items-center'>
                    <div className='space-y-8 lg:px-4 xl:px-0'>
                        <h2 className='text-3xl text-center lg:text-4xl lg:text-left font-bold text-[#29b2fe]'>Freelancer market place</h2>
                        <div className='text-xl xl:text-3xl flex text-[#29b2fe] font-bold justify-center lg:justify-start'>
                            <TypeAnimation
                                sequence={[
                                    'Hire skilled worker',
                                    500,
                                    'Or get job on skill',
                                    500
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{ fontSize: '2em', display: 'inline-block' }}
                                repeat={Infinity}
                            />
                        </div>
                        <p className='font-bold text-lg lg:text-xl text-center lg:text-left'>
                            Forget the old rules. You can have the best people.<br></br>
                            Right now. Right here.
                        </p>
                        <div className='text-center lg:text-left'><button className='btn bg-[#29b2fe] text-white font-bold '>Get Started</button></div>
                    </div>
                </div>
                <div className='flex-1 hidden lg:flex justify-end'>
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/d2fef28e-2659-4e8e-b806-eedc9624584b/1UpiLIhUrY.json"
                        style={{ height: '600px', width: '600px' }}
                    >
                    </Player>
                </div>
            </div>
        </div>
    );
};

export default Banner;