import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import '@splidejs/react-splide/css';


const images = [
  {
    original: 'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
  },
  {
    original: 'https://cdn2.hubspot.net/hubfs/439788/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg',
  },
  {
    original: 'https://www.hotelscombined.com/himg/75/c8/84/revato-275450-12292942-924181.jpg',
  },
  {
    original: 'https://assets.tivolihotels.com/image/upload/q_auto,f_auto,c_limit,w_1378/media/minor/tivoli/images/brand_level/footer/1920x1000/thr_aboutus1_1920x1000.jpg',
    
  },
];

export default function Hero() {
  return (
      <div>
          <div className='h-screen hero-image'>
          <Splide 
            options = {{
                rewind : true,
                gap    : '1rem',
                autoplay : 'play',
                height: '90vh',
                type: 'loop',
                pagination: false,
                arrows: false,
            }}
            className="">
                {images.map((image,index) => {
                    return (
                        <SplideSlide key={index}>
                            <img src={image.original} alt=""/>
                        </SplideSlide>
                        

                    )
                })}
            </Splide>
          </div>
            <div className="absolute inset-y-1/3 inset-x-1/4 hero-text">
                <h3 className='text-3xl font-bold text-white mb-5'>Welcome To Hotel</h3>
                <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, provident. Dolorum qui est explicabo possimus, dignissimos, accusantium beatae illum recusandae soluta, veniam minus ea! Impedit id consectetur eaque accusantium hic?</p>
                <button className='text-white rounded-full px-3 py-2 border border-white mt-5'>Book Now</button>
            </div>
            <form className='relative -top-28 max-w-5xl mx-auto '>
                <div className="grid grid-cols-12 gap-4 bg-blue-900 pl-5 rounded-sm overflow-hidden">
                    <div className="col-span-3 my-3">
                        <label className="block text-white" htmlFor="checkin">Check in:</label>
                        <input className="focus:outline-white bg-blue-700 text-white rounded-md py-2 px-3 w-full" type="date" id='checkin' placeholder='check in date' />
                    </div>
                    <div className="col-span-3 my-3">
                        <label className="block text-white" htmlFor="checkout">Check out:</label>
                        <input className="focus:outline-white bg-blue-700 text-white rounded-md py-2 px-3 w-full" type="date" id='checkout' placeholder='check in date' />
                    </div>
                    <div className="col-span-3 my-3">
                        <label className="block text-white" htmlFor="person">Person:</label>
                        <input className="focus:outline-white bg-blue-700 text-white rounded-md py-2 px-3 w-full" type="number" id='person'/>
                    </div>
                    <div className="col-span-3">
                        <button className="bg-blue-500 w-full h-full text-white">Search</button>
                    </div>
                </div>
            </form>
      </div>
  );
}
