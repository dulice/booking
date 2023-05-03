import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";
import {
  CgHome,
  CgSmartHomeCooker,
  CgSmartHomeWashMachine,
} from "react-icons/cg";
import Reviews from "../components/Reviews";
import { BiDollarCircle } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import FsLightbox from "fslightbox-react";
import { roomFacilites } from "../data/roomFacilities";
import { Amount } from "../context/Amount";

const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, room: action.payload };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "BOOK_REQUEST":
      return { ...state, loading: true };

    case "BOOK_SUCCESS":
      return { ...state, loadingBook: false, book: action.payload };

    case "BOOK_FAIL":
      return { ...state, loadingBook: false, error: action.payload };

    default:
      return state;
  }
};

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(new Date());
  const [toggler, setToggler] = useState(false);
  const { setBookingDetails } = useContext(Amount);
  const [{ loading, error, room }, dispatch] = useReducer(Reducer, {
    loading: true,
    error: "",
    room: {},
  });
  const totalDay = checkout.getDate() - checkin.getDate();
  const totalPrice = totalDay === 0 ? room.price : totalDay * room.price;

  useEffect(() => {
    const fetchRooms = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        // console.log(data);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
        toast.error(error);
      }
    };
    fetchRooms();
  }, [id, dispatch, error]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "BOOK_REQUEST" });
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`);
        const findRoom = data.find((room) => room.bookRoom.roomId === id);
        dispatch({ type: "BOOK_SUCCESS", payload: findRoom });
      } catch (err) {
        dispatch({ type: "BOOK_FAIL", payload: err.response.data });
        toast.error(error);
      }
    };
    fetchData();
  }, [error, id]);

  const handleBook = (e) => {
    e.preventDefault();
    setBookingDetails({
      bookRoom: room,
      fromDate: checkin,
      toDate: checkout,
      amount: totalPrice,
    });
    navigate("/payment");
  };

  return (
    <div className="max-w-5xl mx-auto my-5 px-2">
      <Helmet>
        <title>Room Detail</title>
      </Helmet>
      <nav className="bg-grey-light rounded-md w-full my-5">
        <ol className="list-reset flex">
          <li>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li>
            <Link to="/rooms" className="text-blue-600 hover:text-blue-700">
              Rooms
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Details</li>
        </ol>
      </nav>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p className="font-bold text-2xl my-5">{room.name}</p>

          <button onClick={() => setToggler(!toggler)}>
            <div className="grid grid-rows-4 grid-flow-col gap-6">
              <img
                src={room.image[0]}
                alt=""
                className="row-span-2 rounded-md h-full"
              />
              <img
                src={room.image[1]}
                alt=""
                className="row-span-2 rounded-md h-full"
              />
              <img
                src={room.image[2]}
                alt=""
                className="row-span-4 col-span-3 rounded-md h-full"
              />
            </div>
          </button>
          <FsLightbox
            toggler={toggler}
            sources={[room.image[0], room.image[1], room.image[2]]}
          />
          <ul className="flex justify-between my-5">
            <li className="text-center">
              <CgHome className="text-2xl" />
              <p>Home</p>
            </li>
            <li className="text-center">
              <BiDollarCircle className="text-2xl" />
              <p>${room.price} per night</p>
            </li>
            <li className="text-center">
              <p className="font-bold">
                {room.area ? room.area : 110} m<sup>2</sup>
              </p>
              <p>Size</p>
            </li>
            <li className="text-center">
              <CgSmartHomeCooker className="text-2xl" />
              <p>Kitchen</p>
            </li>
            <li className="text-center">
              <CgSmartHomeWashMachine className="text-2xl" />
              <p>Washing Machine</p>
            </li>
          </ul>
          <p className="font-bold text-2xl">{room.name}</p>
          <p className="mb-5">{room.description}</p>
          <p className="font-bold">Most Popular Faciliites</p>
          <ul className="flex">
            {roomFacilites.map((el) => (
              <li key={el.id}>
                <el.icon className="text-green-600 text-2xl ml-5 mr-1" />
                <span>{el.name}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold text-2xl my-5">Availibility</p>
          <div className="border border-gray-300 p-5 rounded-md ">
            <p className="font-bold my-5">When would you like to stay?</p>
            <form onSubmit={handleBook} className="w-full">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-4">
                  <label htmlFor="check-in">Check-in-date: </label>
                  <DatePicker
                    minDate={new Date()}
                    onChange={setCheckin}
                    value={checkin}
                    className="border ml-3 border-white"
                  />
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <label htmlFor="check-out">Check-out-date: </label>
                  <DatePicker
                    minDate={checkin}
                    onChange={setCheckout}
                    value={checkout}
                    className="border ml-3 border-white"
                  />
                </div>
                <div className="col-span-12 sm:col-span-2">
                  {totalDay === 0 ? 1 : totalDay} x ${room.price} =
                  <span className="text-blue-500 font-bold">${totalPrice}</span>
                </div>
                <div className="col-span-12 sm:col-span-2">
                  <button
                    type="submit"
                    className="border border-white float-right ml-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Reviews />
        </div>
      )}
    </div>
  );
};

export default RoomDetail;
