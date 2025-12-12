
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
          {
            booking.map((d, i) => (
              <tr key={d._id} className="hover">
                <td>{i + 1}</td>
                <td>{d.serviceName}</td>
                <td>{d.userName}</td>
                <td>{d.userEmail}</td>
                <td>
                  {d.location} {d.bookingDistrict}
                </td>
                <td>{d.bookingDate}</td>
                <td>
                  {d.decoratorStatus === "decorator Assigned" && (
                    <button
                      onClick={() =>
                        handleDecoratorStatus("In Progress", d._id)
                      }
                      className="btn btn-primary text-white"
                    >
                      Accept
                    </button>
                  )}

                  {d.decoratorStatus === "In Progress" && (
                    <button
                      onClick={() =>
                        handleDecoratorStatus("Materials Purchased", d._id)
                      }
                      className="btn btn-primary text-white"
                    >
                      Materials Purchased
                    </button>
                  )}
                  {d.decoratorStatus === "Materials Purchased" && (
                    <button
                      onClick={() =>
                        handleDecoratorStatus("Rider On The Way", d._id)
                      }
                      className="btn btn-primary text-white"
                    >
                      Rider On The Way
                    </button>
                  )}
                  {d.decoratorStatus === "Rider On The Way" && (
                    <button
                      onClick={() =>
                        handleDecoratorStatus("Decorator Reached", d._id)
                      }
                      className="btn btn-primary text-white"
                    >
                      Decorator Reached
                    </button>
                  )}
                  {d.decoratorStatus === "Decorator Reached" && (
                    <button
                      onClick={() =>
                      {
                        handleDecoratorStatus("completed", d._id),
                        handleDecoratorWordStatus()
                      }

                      }
                      className="btn btn-primary text-white"
                    >
                      Complete
                    </button>
                  )}
                  {d.decoratorStatus === "completed" && (
                    <button className="btn btn-primary cursor-not-allowed text-white">
                      completed
                    </button>
                  )}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>


    </div>
  );
};

export default MyProject;

