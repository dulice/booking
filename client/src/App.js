import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "./admin/CreateRoom";
import { ToastContainer } from "react-toastify";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  return (
    <div>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectRoute>
              <Success />
            </ProtectRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectRoute>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectRoute>
          }
        />
        <Route path="/admin/createRoom" element={<CreateRoom />} />
      </Routes>
    </div>
  );
}

export default App;
