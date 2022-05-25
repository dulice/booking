import React, { useContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import  { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Store } from '../context/Store';
import Rating from './Rating';

const Reducer = (state, action) => {
  switch(action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, reviews: action.payload};

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
}

const Reviews = () => {
  const { id } = useParams();
  const [{loading, error, reviews}, dispatch] = useReducer(Reducer, {
    loading: true,
    error: '',
    reviews: []
  })
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchReview = async () => {
      dispatch({type: "FETCH_REQUEST"});
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);
        // console.log(data.reviews);
        dispatch({type: "FETCH_SUCCESS", payload: data.reviews});
      } catch (err) {
        dispatch({type: "FETCH_FAIL", payload: err.response.data});
        toast.error(error ? error : err.message);
      }
    }
    fetchReview();
  },[dispatch, error, id]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/rooms/${id}/review`, {
        rating,
        comment
      }, {
        headers: {
          authorization: `Bearer ${userInfo.token} `
        }
      });
      toast.success("Thank for your review!");
      setTimeout(() => {       
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="my-20">
        <p className="text-3xl mb-5">Reviews</p>
        {loading && <div>Loading...</div>}
        {reviews.length < 1 ? <p className='text-red-600'>There is no reviews yet</p>
        : reviews.map(rev => (
          <div key={rev._id} className="mb-3">
            <strong>{rev.name}</strong><span className='text-gray-600'>{'   '}( {moment(rev.createdAt).toNow()} )</span>
            <Rating rating={rev.rating} className="text-red-600"/>
            <p>{rev.comment}</p>
          </div>
        ))
        }
        
        <p className="text-3xl mt-5 mb-3">Write Your Reviews</p>
        <p className="font-bold">Rating: </p>
        <form onSubmit={handleSubmit}>
            <select 
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className='p-2 rounded-tl-md rounded-tr-md sm:text-sm w-full border border-violet-500 outline-violet-500 my-3' name="" id="">
                <option value="0">Select...</option>
                <option value="1">1- Poor</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very Good</option>
                <option value="5">5- Excellent</option>
            </select>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5" placeholder="Your Comment" className='p-2 rounded-md sm:text-sm w-full border border-violet-500 outline-violet-500 my-3' required></textarea>
            <button 
                type='submit'
                className='border border-white float-right ml-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80'>Submit</button>
        </form>
    </div>
  )
}

export default Reviews