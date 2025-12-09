import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const [searchParams] = useSearchParams()
    const axiosSecure = useAxiosSecure()
    const sessionId = searchParams.get('session_id')

    useEffect(() => { 
       if(sessionId) {
         axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
            console.log(res.data)
        })
       }
     },[sessionId , axiosSecure])



    return (
        <div>
            <h1>hello from payment history</h1>
        </div>
    );
};

export default PaymentHistory;