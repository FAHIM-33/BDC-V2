import Heading from '../../Components/Heading';
import img from '../../assets/pngwing.com.png'
import './featured.css'

const Featured = () => {
    return (
        <section className='my-12'>
            <Heading>Featured</Heading>
            <section className="card-container cont p-4  lg:p-0 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 lg:mt-12">
                <div className="card p-8 rounded-lg">
                    <figure>
                        <img src={img} className='w-16' alt="" />
                    </figure>
                    <h3 className="font-bold text-xl py-4">Get help By donations</h3>
                    <p className="text-lg text-mid">The Powerful Impact of Blood Donation</p>
                </div>

                <div className="card p-8 rounded-lg h-full">
                    <figure>
                    <img src={img} className='w-16' alt="" />
                    </figure>
                    <h3 className="font-bold text-xl py-4">Saving Lives</h3>
                    <p className="text-lg text-mid"> Benefits of Donating Blood Regularly</p>
                </div>

                <div className="card p-8 rounded-lg h-full">
                    <figure>
                    <img src={img} className='w-16' alt="" />
                    </figure>
                    <h3 className="font-bold text-xl py-4">Becoming a Hero</h3>
                    <p className="text-lg text-mid flex-grow">Wellness and Generosity: The Dual Rewards of Blood Donation</p>
                </div>
                <div>

                </div>

                <div className="card p-8 rounded-lg">
                    <figure>
                    <img src={img} className='w-16' alt="" />
                    </figure>
                    <h3 className="font-bold text-xl py-4">The Ripple Effect</h3>
                    <p className="text-lg text-mid">How Your Blood Donation Creates Positive Change</p>
                </div>

            </section>
        </section>
    );
};

export default Featured;