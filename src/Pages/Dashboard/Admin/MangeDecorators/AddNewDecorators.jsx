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
        name: user.displayName,
        email: user.email,
        specialties: "birthday, anniversary",
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
      await axiosSecure.post("/newDecorators", updateInfo).then((res) => {
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
        <h1>Crete new decorators</h1>
      </div>

      <div className="xl:p-8 p-4 bg-primary min-h-screen">

        <div className="overflow-x-auto w-full rounded-lg ">
          <table className="table w-full border-separate border-spacing-y-3">
            <thead className="bg-secondary text-primary">
              <tr className="xl:text-xl text-sm">
                <th className="rounded-l-lg py-5">SL</th>
                <th>Name</th>
                <th>Email</th>
                <th className="rounded-r-lg text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {user.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-2xl text-secondary font-bold bg-base-100 rounded-lg"
                  >
                    No Users Available
                  </td>
                </tr>
              ) : (
                user.map((u, i) => (
                  <tr
                    key={u._id}
                    className="bg-base-100 text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 shadow-md group"
                  >
                    <td className="font-bold rounded-l-lg">{i + 1}</td>
                    <td className="font-semibold">{u.displayName}</td>
                    <td className="italic">{u.email}</td>
                    <td className="rounded-r-lg text-center">
                      <button
                        onClick={() => handleMakeDecorator(u)}
                        className="btn  hover:bg-base-100 hover:text-secondary bg-secondary text-base-100 btn-xs sm:btn-sm md:btn-md lg:btn-lg rounded-full font-bold shadow-lg hover:shadow-primary/50 transform hover:scale-105 transition-all border-none"
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
    </div>
  );
};

export default AddNewDecorators;
