
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader";

const MyProject = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {data : decorators } = useQuery({
    queryKey : ['decorators' , user?.email] ,
    queryFn : async () => {
      const res = await axiosSecure.get(`/decorator/${user?.email}`)
      return res.data
    }

  })
const { data: booking = [], isLoading , refetch } = useQuery({
  queryKey: ["booking", decorators?.email],
  enabled: !!decorators?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/booking/${decorators?.email}`);
    return res.data;
  },
});

const handleDecoratorStatus = (status, id) => {
    axiosSecure
      .patch(`/booking/${id}/status`, { decoratorStatus: status })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Booking Confirmed!",
            text: "Your service has been booked successfully.",
            timer: 2000,
          });
        }
      });
  };

  
const handleDecoratorWordStatus = () => { 
  console.log('hello world')
    axiosSecure.patch(`/updateDecoratorsWorkStatus/${decorators?._id}` , {status : "available"})
    .then(res => console.log(res.data))
 }

  if(isLoading) {
    return <Loader></Loader>
  }

  return (
    <div>
      <div className="bg-secondary text-primary py-8 text-center text-3xl">
          <h1>Assign Project</h1>
      </div>

<div className="bg-primary rounded-lg p-5">

  {/* HEADER for XL+ */}
  <div className="hidden xl:flex bg-secondary justify-between text-primary rounded-md py-3 text-sm xl:text-lg font-semibold">
    <div className="w-8 text-center">#</div>
    <div className="w-[220px] text-center">Service Name</div>
    <div className="w-[180px] text-center">Client Name</div>
    <div className="w-[220px] text-center">Client Email</div>
    <div className="w-[200px] text-center">Client Address</div>
    <div className="w-[140px] text-center">Booking Date</div>
    <div className="w-[280px] text-center">Action</div>
  </div>

  {/* BODY */}
  <div className="space-y-6 xl:space-y-4">
    {booking.map((d, i) => (
      <div
        key={d._id}
        className="flex flex-col xl:flex-row xl:items-center xl:justify-between bg-primary text-secondary rounded-lg shadow p-3"
      >
        {/* # */}
        <div className="flex justify-between xl:w-8 px-1 py-1 xl:mr-10 font-semibold border-b xl:border-b-0">
          <span className="xl:hidden">#{i + 1}</span>
          <span className="hidden xl:block text-center">{i + 1}</span>
        </div>

        {/* Service Name */}
        <div className="flex justify-between xl:w-[220px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Service Name :</span>
          <span>{d.serviceName}</span>
        </div>

        {/* Client Name */}
        <div className="flex justify-between xl:w-[180px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Client Name :</span>
          <span className="xl:pr-20">{d.userName}</span>
        </div>

        {/* Client Email */}
        <div className="flex justify-between xl:w-[220px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Client Email :</span>
          <span>{d.userEmail}</span>
        </div>

        {/* Client Address */}
        <div className="flex justify-between xl:w-[200px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Address :</span>
          <span className="2xl:pl-10">{d.location} {d.bookingDistrict}</span>
        </div>

        {/* Booking Date */}
        <div className="flex justify-between xl:w-[140px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Booking Date :</span>
          <span>{d.bookingDate}</span>
        </div>

      <div className="flex flex-col xl:flex-row gap-2 py-5 px-1 justify-center">
  {d.decoratorStatus === "decorator Assigned" && (
    <button
      onClick={() => handleDecoratorStatus("In Progress", d._id)}
      className="btn btn-primary text-white btn-sm xl:btn-sm w-full"
    >
      Accept
    </button>
  )}

  {d.decoratorStatus === "In Progress" && (
    <button
      onClick={() => handleDecoratorStatus("Materials Purchased", d._id)}
      className="btn btn-primary text-white btn-sm xl:btn-sm w-full"
    >
      Materials Purchased
    </button>
  )}

  {d.decoratorStatus === "Materials Purchased" && (
    <button
      onClick={() => handleDecoratorStatus("Rider On The Way", d._id)}
      className="btn btn-primary text-white btn-sm xl:btn-sm w-full"
    >
      Rider On The Way
    </button>
  )}

  {d.decoratorStatus === "Rider On The Way" && (
    <button
      onClick={() => handleDecoratorStatus("Decorator Reached", d._id)}
      className="btn btn-primary text-white btn-sm xl:btn-sm w-full"
    >
      Decorator Reached
    </button>
  )}

  {d.decoratorStatus === "Decorator Reached" && (
    <button
      onClick={() => {
        handleDecoratorStatus("completed", d._id);
        handleDecoratorWordStatus();
      }}
      className="btn btn-primary text-white btn-sm xl:btn-sm w-full"
    >
      Complete
    </button>
  )}

  {d.decoratorStatus === "completed" && (
    <button className="btn btn-success cursor-not-allowed btn-sm xl:btn-sm w-full">
      Completed
    </button>
  )}
</div>



      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default MyProject;

