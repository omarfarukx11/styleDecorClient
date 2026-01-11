import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Button from "../../../../utility/Button";
import { motion } from "framer-motion"; // Added animation import

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
            background: "#1a1a1a",
            color: "#ffffff",
            timer: 2000,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-primary min-h-[clac(100vh-90px)]">
      <div className="py-8 text-lg lg:text-2xl text-center bg-primary text-base-200 border-b border-white">
        <h1 className="font-bold uppercase tracking-widest">Create new decorators</h1>
      </div>
      <title>StyleDecor - Add New Decorator</title>

      <div className="xl:p-8 p-4 bg-primary">
        
        {/* --- SMALL DEVICE: DIV CARD SYSTEM --- */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="xl:hidden space-y-4"
        >
          {user.length === 0 ? (
            <div className="text-center py-10 text-xl text-base-200 font-bold bg-base-100 rounded-lg">
              No Users Available
            </div>
          ) : (
            user.map((u, i) => (
              <motion.div 
                key={u._id} 
                variants={item}
                className="bg-base-100 p-5 rounded-xl border border-white/10 shadow-lg flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="bg-secondary text-base-200 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="text-right flex-1 ml-4">
                    <h3 className="text-base-200 font-bold text-lg leading-tight">{u.displayName}</h3>
                    <p className="text-base-200/60 text-xs italic truncate">{u.email}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleMakeDecorator(u)}
                    className="transform active:scale-95 transition-transform"
                  >
                    <Button>Make Decorator</Button>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* --- LARGE DEVICE: TABLE SYSTEM --- */}
        <div className="hidden xl:block overflow-x-auto w-full rounded-lg">
          <table className="table w-full border-separate border-spacing-y-3">
            <thead className="bg-secondary text-base-200">
              <tr className="xl:text-xl text-xs">
                <th className="rounded-l-lg py-5">SL</th>
                <th>Name</th>
                <th>Email</th>
                <th className="rounded-r-lg text-center">Action</th>
              </tr>
            </thead>

            <motion.tbody
              variants={container}
              initial="hidden"
              animate="show"
            >
              {user.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-2xl text-base-200 font-bold bg-base-100 rounded-lg"
                  >
                    No Users Available
                  </td>
                </tr>
              ) : (
                user.map((u, i) => (
                  <motion.tr
                    key={u._id}
                    variants={item}
                    className="bg-base-100 text-base-200 hover:bg-secondary hover:text-base-200 text-sm transition-all duration-300 shadow-md group"
                  >
                    <td className="font-bold rounded-l-lg">{i + 1}</td>
                    <td className="font-semibold sm:text-lg text-[10px]">{u.displayName}</td>
                    <td className="italic sm:text-lg text-[10px]">{u.email}</td>
                    <td className="rounded-r-lg text-center">
                      <button
                        onClick={() => handleMakeDecorator(u)}
                      >
                        <Button>Make Decorator</Button>
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AddNewDecorators;