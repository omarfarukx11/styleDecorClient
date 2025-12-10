import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';



const AdminRoute = ({children}) => {
    const { loading } = useAuth()
    const {role , roleLoading} = useRole()

    if(loading || roleLoading) {
        return <p>Loading</p>
    }
    if(role !== "admin") {
        return <Forbidden></Forbidden>
    }
    return children
};

export default AdminRoute;