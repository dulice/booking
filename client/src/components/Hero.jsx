import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import '@splidejs/react-splide/css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../context/Store';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsCaretDownFill } from 'react-icons/bs'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleSignout = () => {
    localStorage.removeItem('userInfo');
    navigate('/signin');
  }
  
  return (
      <div className='relative'>
        <div className="flex justify-between max-w-6xl mx-auto px-2 sm:px-6 lg-px-8 absolute z-10 text-white left-0 right-0 mt-3">
          <p className="font-['Pacifico'] text-2xl font-bold">Grace</p>
          <div>
            {userInfo ?
            <div>

                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full px-3 py-2">
                      <span className="sr-only">Open user menu</span>
                      {userInfo ?
                      <p className="px-3 py-2 rounded-full border border-white">{userInfo.name} <BsCaretDownFill /></p>
                      : <Link to='/signin' className='text-white font-bold'>Sign in</Link>
                      }
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/profile'
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item> 
                      {userInfo && userInfo.isAdmin && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/admin/createRoom'
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Post Room
                            </Link>
                          )}
                        </Menu.Item> 
                      )}                                         
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/signin'
                            onClick={handleSignout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
            </div>
            :
            <div>
              <Link to='/signup'>
                <button className="px-3 py-2 border bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80 rounded-sm">Register</button>
              </Link>
              <Link to='/signin'>
                <button className="ml-5 px-3 py-2 border bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80 rounded-sm">Sign in</button>
              </Link>
            </div>
            }
          </div>
        </div>
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
                      <SplideSlide key={index} style={{backgroundImage: `url(${image.original})`}} className="bg-no-repeat bg-center bg-cover">
                      </SplideSlide>                     
                  )
              })}
          </Splide>
        </div>
        <div className="inset-y-1/4 absolute left-6 right-6 sm:right-2/4 hero-text text-white">
            <h3 className='text-xl sm:text-3xl font-bold text-white mb-5'>Welcome To Hotel</h3>
            <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, provident. Dolorum qui est explicabo possimus, dignissimos, accusantium beatae illum recusandae soluta, veniam minus ea! Impedit id consectetur eaque accusantium hic?</p>
            <Link to='/rooms'>
              <button className='text-white rounded-full px-3 py-2 border border-white mt-5'>Book Now</button>
            </Link>
        </div>
        <form className='relative -top-28 max-w-5xl mx-auto '>
            <div className="grid grid-cols-12 gap-4 bg-blue-900 pl-5 pr-5 sm:pr-0 rounded-sm overflow-hidden">
                <div className="col-span-12 sm:col-span-3 my-3">
                    <label className="block text-white" htmlFor="checkin">Check in:</label>
                    <input className="focus:outline-white bg-blue-700 text-white rounded-md py-2 px-3 w-full" type="date" id='checkin' placeholder='check in date' />
                </div>
                <div className="col-span-12 sm:col-span-3 my-3">
                    <label className="block text-white" htmlFor="checkout">Check out:</label>
                    <input className="focus:outline-white bg-blue-700 text-white rounded-md py-2 px-3 w-full" type="date" id='checkout' placeholder='check in date' />
                </div>
                <div className="col-span-12 sm:col-span-3 my-3">
                    <label className="block text-white" htmlFor="person">Person:</label>
                    <input className="focus:outline-white bg-blue-700 text-white rounded-md py-2 px-3 w-full" type="number" id='person'/>
                </div>
                <div className="col-span-12 sm:col-span-3">
                  <Link to="/rooms">
                    <button className="bg-blue-500 w-full h-full mb-5 sm:mb-0 text-white">Search</button>
                  </Link>
                </div>
            </div>
        </form>
      </div>
  );
}
