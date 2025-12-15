import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader';
import useRole from '../Hooks/useRole';

const PrivetRoute = ({children}) => {
    const {user , loading } = useAuth()
    const location = useLocation()
    const {roleLoading} = useRole()
    if(loading || roleLoading ) {
        return <Loader></Loader>
    }
    if(!user) {
        return <Navigate state={location.pathname} to={"/login"}></Navigate>
    }
    
    return children
};

export default PrivetRoute;