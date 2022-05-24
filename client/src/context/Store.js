import { createContext, useReducer } from 'react';

export const Store = createContext();

const user = JSON.parse(localStorage.getItem('userInfo'));
const initialState = {
    userInfo: user ? user : null
}

const Reducer = (state, action) => {
    switch (action.type) {
        case "USER_SIGNIN":
            return { ...state, userInfo: action.payload};

        case "USER_SIGNOUT":
            return { ...state, userInfo: null};

        default:
            return state;
    }
}

export const StoreProvider = ({children}) => {
    const [{state}, dispatch] = useReducer(Reducer, initialState)
    const value = {state, dispatch}
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    )
}
