import React, { useContext, useEffect, useState } from "react";
import { Amount } from "../context/Amount";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { Visa, Mastercard, Jcb, Discover } from "react-pay-icons";
import { Store } from "../context/Store";

const Payment = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { bookingDetails } = useContext(Amount);
  const { bookRoom, fromDate, toDate, amount } = bookingDetails;
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientSecret = async (e) => {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/books/payment/create`, { amount });
      setClientSecret(data.clientSecret);
    };
    fetchClientSecret();
  }, [amount]);

  const handlePay = async (e) => {
    e.preventDefault();
    clientSecret && await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/books`,
          {
            bookRoom,
            fromDate,
            toDate,
            totalPrice: amount,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        navigate("/success");
        // console.log(result);
      })
      .catch((err) => console.warn(err));
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <p className="text-center text-xl my-3">Total Cost : $ {amount}</p>
        <div className="p-3 shadow-lg rounded-sm max-w-fit m-auto">
          <div className="flex gap-10">
            <p className="font-bold">Payment Details</p>
            <div className="flex gap-2">
              <Visa style={{ width: 40 }} />
              <Mastercard style={{ width: 40 }} />
              <Jcb style={{ width: 40 }} />
              <Discover style={{ width: 40 }} />
            </div>
          </div>
          <div className="my-7">
            <CardElement />
          </div>
          <button
            disabled={!stripe}
            onClick={handlePay}
            className="py-2 border bg-[#3bcf5b] hover:bg-[#3bcf5b]/90 active:bg-[#3bcf5b]/80 text-white rounded-sm w-full"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
