import React, { useContext } from 'react'
import { Store } from '../context/Store'
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({children}) => {
    const { state } = useContext(Store);
    const { userInfo } = state;
  return (
    userInfo ? children : <Navigate to='/signIn' />
  )
}

export default ProtectRoute