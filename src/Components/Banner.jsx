import { Player } from '@lottiefiles/react-lottie-player';

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Banner */}
            <div className="flex justify-center">
                <div className='flex-1 flex lg:justify-start justify-center items-center'>
                    <div className='space-y-5 lg:px-4 xl:px-0'>
                        <h2 className='text-4xl text-center lg:text-5xl lg:text-left font-bold text-[#29b2fe]' style={{ lineHeight: '1.2' }}>
                            Freelancer market place<br />
                            Hire or get job
                        </h2>
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