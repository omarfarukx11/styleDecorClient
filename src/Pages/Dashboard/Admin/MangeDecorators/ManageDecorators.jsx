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
     <div className="text-3xl font-bold py-8 text-primary bg-secondary text-center">
       <h2 >Manage Decorators</h2>
     </div>
        
    <div className='p-8'>
      <div className='flex justify-end items-center py-10'>
          <Link to={'/dashboard/add-new-decorator'} className='btn btn-secondary text-primary'>Add New Decorators</Link>
        </div>
        <div className='flex justify-end items-center '>
          <h1 className='text-2xl mb-2 text-secondary font-bold'>{allDecorator.length} of {total} Decorators</h1>
        </div>

<div className="bg-primary rounded-lg p-10">

  {/* HEADER for XL+ */}
  <div className="hidden xl:flex bg-secondary xl:justify-between text-primary rounded-md py-4 text-sm xl:text-lg font-semibold">
    <div className="w-10 text-center xl:ml-10">SL</div>
    <div className="w-[200px] text-center">Decorator</div>
    <div className="w-[200px] text-center ">Specialties</div>
    <div className="w-[140px] text-center">District</div>
    <div className="w-[120px] text-center">Status</div>
    <div className="w-[140px] text-center xl:mr-16">Action</div>
  </div>

  {/* BODY */}
  <div className="space-y-5 xl:space-x-2">
    {allDecorator.length === 0 ? (
      <div className="text-center text-lg text-gray-500">No Decorators Available</div>
    ) : (
      allDecorator.map((d, i) => (
        <div
          key={d._id}
          className="flex flex-col xl:flex-row xl:items-center xl:justify-between bg-primary text-secondary rounded-lg shadow-xl p-2"
        >
          {/* SL */}
          <div className="flex justify-between xl:w-10 px-2 py-2 xl:ml-10 font-semibold border-b xl:border-b-0">
            <span className="xl:hidden">SL :</span>
            <span className="hidden xl:block text-center">{i + 1}</span>
          </div>

          {/* Decorator */}
          <div className="flex justify-between xl:w-[200px] px-2 py-2 border-b xl:border-b-0">
            <span className="xl:hidden font-semibold">Decorator :</span>
            <span className='xl:ml-10'>{d.name}</span>
          </div>

          {/* Specialties */}
          <div className="flex justify-between xl:w-[200px] px-2 py-2 border-b xl:border-b-0">
            <span className="xl:hidden font-semibold">Specialties :</span>
            <span>{d.specialties}</span>
          </div>

          {/* District */}
          <div className="flex justify-between xl:w-[140px] px-2 py-2 border-b xl:border-b-0">
            <span className="xl:hidden font-semibold">District :</span>
            <span>{d.district}</span>
          </div>

          {/* Status */}
          <div className="flex justify-between xl:w-[120px] px-2 py-2 border-b xl:border-b-0">
            <span className="xl:hidden font-semibold">Status :</span>
            <span className="px-2 py-1 rounded-xl text-center w-full xl:w-auto bg-green-500 text-white">
              {d.status}
            </span>
          </div>

          {/* Action */}
          <div className="flex flex-col xl:flex-row gap-2 xl:w-[140px] px-2 py-2 justify-center">
            <button
              onClick={() => handleServiceDelete(d._id)}
              className="btn btn-error btn-xs xl:btn-sm text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>

        {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="btn btn-secondary mt-1 text-primary btn-sm disabled:opacity-40"
          >
            « Prev
          </button>
          {[...Array(Math.min(5, totalPages)).keys()]
            .map((n) => n + 1)
            .map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`btn btn-secondary text-neutral-content ${
                  page === num
                    ? "btn-secondary text-primary"
                    : "btn-outline btn-ghost"
                }`}
              >
                {num}
              </button>
            ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-secondary mt-1 text-primary btn-sm disabled:opacity-40"
          >
            Next »
          </button>
        </div>
      )}
    </div>



    </div>


  );
};

export default ManageDecorators;
