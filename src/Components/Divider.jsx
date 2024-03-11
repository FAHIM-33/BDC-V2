
import img from '../assets/pngwing.com.png'
const Divider = () => {
    return (
        <div className='flex items-center gap-2'>
            <div className='w-full h-[1px] bg-background'></div>
            <div className='text-lg my-2 text-high'>
                <img className='w-12' src={img} alt="" />
            </div>
            <div className='w-full h-[1px] bg-background'></div>
        </div>
    );
};

export default Divider;