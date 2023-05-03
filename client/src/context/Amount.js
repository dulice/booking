import { createContext, useState } from "react";

export const Amount = createContext();
export const AmountProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    bookRoom: "",
    fromDate: "",
    toDate: "",
    amount: 0,
  });

  const value = { bookingDetails, setBookingDetails };
  return <Amount.Provider value={value}>{children}</Amount.Provider>;
};
