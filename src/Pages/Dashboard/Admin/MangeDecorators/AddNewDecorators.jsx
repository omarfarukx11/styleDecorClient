import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddNewDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=user");
      return res.data;
    },
  });

  const handleMakeDecorator = async (user) => {
    try {
      await axiosSecure.patch(`/users/${user._id}`, {
        role: "decorator",
      });

      const updateInfo = {
        userId: user._id,
        name: user.displayName,
        email: user.email,
        specialties: "birthday, anniversary , corporate, meeting",
        rating: 4.7,
        image: user.photoURL,
        description: "Creative birthday party specialist",
        hourlyRate: 38,
        completedBookings: 25,
        earnings: 1200,
        division: "Dhaka",
        district: "Dhaka",
        phone: "+8801700000000",
        status: "available",
      };
      await axiosSecure.post("/decorators", updateInfo).then((res) => {
        if (res.data.acknowledged) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `${user.displayName} is now a Decorator`,
            timer: 2000,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="py-8 text-2xl text-center bg-primary text-white border-b border-white">
        <h1>
        Crete new decorators
      </h1>
      </div>
      <div className="xl:p-8 p-4 bg-primary h-screen ">
        <table className="table w-full ">
        <thead className="xl:text-xl text-[12px] ">
          <tr className="bg-secondary text-primary rounded-lg">
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="hover:bg-primary hover:text-white bg-base-100 text-secondary shadow-xl border-2 xl:text-xl text-[12px]">
          {user.length === 0 ? (
            <p>No Decorators Available</p>
          ) : (
            user.map((u, i) => (
              <tr key={u._id} className="hover">
                <td>{i + 1}</td>
                <td>{u.displayName}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    className="btn btn-primary text-secondary "
                    onClick={() => handleMakeDecorator(u)}
                  >
                    Make Decorator
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AddNewDecorators;
