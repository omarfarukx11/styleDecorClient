import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../Components/Loader';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const ManageDecorators = () => {

  const axiosSecure = useAxiosSecure()
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading , refetch } = useQuery({
    queryKey: ["allBooking", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allDecorators?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });
  const allDecorator = data?.result || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);


  const handleServiceDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deleteDecorators/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Decorator has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };




  if(isLoading){
    return <Loader></Loader>
  }

  return (
   <div>
      <h2 className="text-5xl font-bold mb-8 text-center">Manage Decorators</h2>
        
        <div className='flex justify-end items-center py-10'>
          <Link to={'/dashboard/add-new-decorator'} className='btn btn-primary'>Add New Decorators</Link>
        </div>
        <div className='flex justify-end items-center'>
          <h1 className='text-2xl mb-2 font-bold'>{allDecorator.length} of {total} Decorators</h1>
        </div>

        <table className="table w-full ">
            <thead className="text-xl">
              <tr className="bg-primary text-primary-content">
                <th>SL</th>
                <th>Decorator</th>
                <th>specialties</th>
                <th>District</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-base-300 border-2 text-xl">
              {allDecorator.length === 0 ? (
                <p>No Decorators Available</p>
              ) : (
                allDecorator.map((d, i) => (
                  <tr key={d._id} className="hover">
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.specialties}</td>
                    <td>{d.district}</td>
                    <td>{d.status}</td>
                    <td>
                      <button 
                      onClick={() => { handleServiceDelete(d._id) }}
                        className="btn btn-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>



        {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="btn btn-outline btn-sm disabled:opacity-40"
          >
            « Prev
          </button>
          {[...Array(Math.min(5, totalPages)).keys()]
            .map((n) => n + 1)
            .map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`btn btn-sm ${
                  page === num
                    ? "btn-primary"
                    : "btn-outline btn-ghost"
                }`}
              >
                {num}
              </button>
            ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-outline btn-sm disabled:opacity-40"
          >
            Next »
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageDecorators;
