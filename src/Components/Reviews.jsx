import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming you use TanStack Query
import useAxiosSecure from '../Hooks/useAxiosSecure'; // Your Axios hook
import Marquee from "react-fast-marquee"; // The marquee library
import { FaStar } from 'react-icons/fa'; // For star icons
import Title from '../utility/Title'; // Your custom Title component
import BigTitile from '../utility/BigTitile';

const Reviews = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch reviews using TanStack Query
    const { data: reviews = [], isLoading, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="loading loading-spinner loading-lg text-secondary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-error p-8">
                Error loading reviews: {error.message}
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center text-base-200 p-8 bg-primary">
                No reviews available yet. Be the first to rate us!
            </div>
        );
    }

    return (
        <section className="bg-primary text-base-200 lg:pb-20 pb-5 ">
           
            <div className='text-center'><BigTitile>What Our Clients Say</BigTitile> </div>

            <Marquee
                gradient={true}
                gradientColor={[
                    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').split(',')[0]),
                    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').split(',')[1]),
                    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').split(',')[2])
                ]}
                gradientWidth={100} 
                pauseOnHover={true}
                className="py-4 w-full overflow-hidden"
            >
                {reviews.map((review, index) => (
                    <div 
                        key={review._id || index} 
                        className="card w-80 min-h-[250px] bg-secondary  shadow-sm mx-4 p-6 flex flex-col justify-between border border-white/10"
                    >
                        <div className="flex items-center mb-4">
                            <div className="avatar mr-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary">
                                    <img 
                                        src={review.userPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                                        alt={review.userName || "Anonymous"} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{review.userName || "Anonymous User"}</h3>
                                <p className="text-sm text-base-200/70">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <p className="text-sm mb-4 grow">{review.feedback}</p>

                        <div className="flex items-center">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar 
                                        key={i} 
                                        className={i < review.rating ? 'text-orange-400' : 'text-gray-900'} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default Reviews;