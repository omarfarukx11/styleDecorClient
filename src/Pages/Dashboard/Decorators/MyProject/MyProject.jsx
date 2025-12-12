import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";


const MyProject = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const [status , setStatus] = useState('')

    const {data} = useQuery({
        queryKey: ['user' , user],
        queryFn : async () => { 
            const res = await axiosSecure.get(`/user/${user.email}`)
            return res.data
         }
    })
  
  const { data : decoratorProject =  [] , refetch } = useQuery({
    queryKey: ["bookings", data?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorator/bookings?decoratorId=${data?._id}`
      )
    return res.data;
    },
  });

  const handleDecoratorStatus = (status , id) => { 
    axiosSecure.patch(`/booking/${id}` ,{decoratorStatus  : status} )
    .then(res => {
        refetch()
        console.log(res.data)
    })
   }


  return (
    <div>
        <table className="table w-full ">
        <thead className="text-xl">
          <tr className="bg-primary text-primary-content">
            <th>SL</th>
            <th>Service Name</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Client Address</th>
            <th>Booking Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="bg-base-300 border-2 text-xl">
          {decoratorProject.length === 0 ? (
            <p>No Decorators Available</p>
          ) : (
            decoratorProject.map((d, i) => (
              <tr key={d._id} className="hover">
                <td>{i + 1}</td>
                <td>{d.serviceName}</td>
                <td>{d.userName}</td>
                <td>{d.userEmail}</td>
                <td>{d.location}{' '}{d.bookingDistrict}</td>
                <td>{d.bookingDate}</td>
                <td>
                  {
                    d.decoratorStatus === "decorator Assigned" && 
                    <button onClick={() => {
                    handleDecoratorStatus(status , d._id) ,
                    setStatus('In Progress') }}
                    className="btn btn-primary text-white"
                  >
                    Accept
                  </button>
                  }
                  {
                      d.decoratorStatus === "In Progress" && 
                    <button onClick={() => {
                    handleDecoratorStatus(status , d._id) ,
                    setStatus('Materials Purchased') }}
                    className="btn btn-primary text-white"
                  >
                    In Progress
                  </button>
                  }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyProject;
