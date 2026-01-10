import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader";

const MyProject = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: decorators, isLoading: decoratorLoading } = useQuery({
    queryKey: ["decorators", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorator/${user?.email}`);
      return res.data;
    },
  });
  const {
    data: booking = [],
    isLoading: bookingLoading,
    refetch,
  } = useQuery({
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
            title: `${status}`,
            text: "Your status is update successfully.",
            timer: 2000,
          });
        }
      });
  };

  const handleDecoratorWordStatus = () => {
    axiosSecure
      .patch(`/updateDecoratorsWorkStatus/${decorators?._id}`, {
        status: "available",
      })
      .then((res) => console.log(res.data));
  };

  const sortedBooking = [...booking].sort(
    (a, b) => new Date(b.assignAt) - new Date(a.assignAt)
  );

  if (bookingLoading || decoratorLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="text-base-200">
      <div className="bg-primary  py-8 text-center text-2xl border-b border-white uppercase ">
        <h1>Assign Project</h1>
      </div>
    <title>StyelDecor - My Project</title>
      <div className="bg-primary p-8">
        {/* HEADER for XL+ */}
        <div className="hidden xl:flex bg-secondary text-base-200 justify-between mb-5 text-base-200 rounded-md py-8 text-sm xl:text-lg font-semibold">
          <div className="w-8 text-center">#</div>
          <div className="w-[220px] text-center">Service Name</div>
          <div className="w-[180px] text-center">Client Name</div>
          <div className="w-[220px] text-center">Client Email</div>
          <div className="w-[200px] text-center">Client Address</div>
          <div className="w-[140px] text-center">Booking Date</div>
          <div className="w-[280px] text-center">Action</div>
        </div>

        <div className="space-y-6 xl:space-y-4">
          {
            sortedBooking.length === 0 ?
             (
              <p className="md:text-4xl text-center mt-10 font-bold uppercase">
                No Project Assigned Yet
              </p>
             ) : (
              sortedBooking.map((d, i) => (
            <div
              key={d._id}
              className="flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between hover:bg-secondary hover: bg-base-100 rounded-lg shadow p-3"
            >
              {/* # */}
              <div className="flex justify-between xl:w-8 px-1 py-1 font-semibold ">
                <span className="xl:hidden">#{i + 1}</span>
                <span className="hidden xl:block text-center">{i + 1}</span>
              </div>

              {/* Service Name */}
              <div className="flex justify-between xl:w-[220px] px-1 py-1 ">
                <span className="xl:hidden font-semibold">Service Name </span>
                <span>{d.serviceName}</span>
              </div>

              {/* Client Name */}
              <div className="flex justify-between xl:w-[180px] px-1 py-1 ">
                <span className="xl:hidden font-semibold">Client Name </span>
                <span>{d.userName}</span>
              </div>

              {/* Client Email */}
              <div className="flex justify-between xl:w-[220px] px-1 py-1 ">
                <span className="xl:hidden font-semibold">Client Email </span>
                <span>{d.userEmail}</span>
              </div>

              {/* Client Address */}
              <div className="flex justify-between xl:w-[200px] px-1 py-1 ">
                <span className="xl:hidden font-semibold">Address </span>
                <span className="xl:pr-25">
                  {d.location} {d.bookingDistrict}
                </span>
              </div>

              {/* Booking Date */}
              <div className="flex justify-between xl:w-[140px] px-1 py-1 ">
                <span className="xl:hidden font-semibold">Booking Date </span>
                <span className="xl:mr-25">{d.bookingDate}</span>
              </div>

              <div className="flex flex-col xl:flex-row gap-2 py-5 px-1 justify-center xl:mr-16">
                {d.decoratorStatus === "decorator Assigned" && (
                  <button
                    onClick={() => handleDecoratorStatus("In Progress", d._id)}
                    className="btn hover:bg-base-100  bg-secondary text-base-200 px-5 border-none text-xl btn-sm xl:btn-sm w-full"
                  >
                    Accept
                  </button>
                )}
                {d.decoratorStatus === "In Progress" && (
                  <button
                    onClick={() => handleDecoratorStatus("Planning Phase", d._id)}
                    className="btn hover:bg-base-100  bg-secondary text-base-200 px-5 border-none text-xl btn-sm xl:btn-sm w-full"
                  >
                    Planning Phase
                  </button>
                )}

                {d.decoratorStatus === "Planning Phase" && (
                  <button
                    onClick={() =>
                      handleDecoratorStatus("On the Way to Venue", d._id)
                    }
                    className="btn hover:bg-base-100  bg-secondary text-base-200 px-5 border-none text-xl btn-sm xl:btn-sm w-full"
                  >
                    On the Way
                  </button>
                )}

                {d.decoratorStatus === "On the Way to Venue" && (
                  <button
                    onClick={() =>
                      handleDecoratorStatus("Setup in Progress", d._id)
                    }
                    className="btn hover:bg-base-100  bg-secondary text-base-200 btn-sm xl:btn-sm w-full"
                  >
                    Setup in Progress
                  </button>
                )}

                {d.decoratorStatus === "Setup in Progress" && (
                  <button
                    onClick={() =>
                      handleDecoratorStatus("Working", d._id)
                    }
                    className="btn hover:bg-base-100  bg-secondary text-base-200 px-5 border-none text-xl btn-sm xl:btn-sm w-full"
                  >
                    Working
                  </button>
                )}

                {d.decoratorStatus === "Working" && (
                  <button
                    onClick={() => {
                      handleDecoratorStatus("completed", d._id);
                      handleDecoratorWordStatus();
                    }}
                    className="btn hover:bg-base-100  bg-secondary text-base-200 px-4 border-none text-xl btn-sm xl:btn-sm w-full"
                  >
                    Complete
                  </button>
                )}

                {d.decoratorStatus === "completed" && (
                  <button className="btn btn-success  cursor-not-allowed btn-sm xl:btn-sm w-full">
                    Completed
                  </button>
                )}
              </div>
              
            </div>
          ))
            )
          }
        </div>
      </div>
    </div>
  );
};

export default MyProject;
