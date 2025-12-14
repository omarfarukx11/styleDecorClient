import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';
import Loader from '../Components/Loader';



const DecoratorRoute = ({children}) => {
    const { loading } = useAuth()
    const {role , roleLoading} = useRole()

    if(loading || roleLoading) {
        return <Loader></Loader>
    }
    if(role !== "decorator") {
        return <Forbidden></Forbidden>
    }
    return children
};

export default DecoratorRoute;