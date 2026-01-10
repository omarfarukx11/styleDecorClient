import React from 'react';
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineChatAlt2, HiOutlineQuestionMarkCircle } from "react-icons/hi";

const HelpSupport = () => {
    const faqs = [
        { q: "How do I track my order?", a: "You can track your order via the tracking link sent to your email or through your dashboard." },
        { q: "What is your return policy?", a: "We offer a 30-day return policy on all decor items provided they are in original condition." },
        { q: "Do you offer interior design consultations?", a: "Yes! Contact our support team to book a virtual session with our stylists." }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <section className="bg-primary text-base-200 min-h-screen ">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-[1980px] mx-auto lg:px-20 px-5 w-full lg:pb-20 pb-5 "
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-20">
                    <h2 className="text-2xl lg:text-5xl font-black lg:pt-20 pt-5 tracking-tighter uppercase italic">
                        Help & <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">Support</span>
                    </h2>
                    <p className="text-xl md:text-3xl opacity-40 max-w-4xl leading-relaxed">
                        Expert assistance for your premium design journey.
                    </p>
                </motion.div>

  
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:mb-20 mb-5">
                    {[
                        { icon: <HiOutlineMail />, title: "Email Us", desc: "support@styledecor.com" },
                        { icon: <HiOutlineChatAlt2 />, title: "Live Chat", desc: "Mon-Fri, 9am - 6pm" },
                        { icon: <HiOutlineQuestionMarkCircle />, title: "Guides", desc: "Knowledge Base" }
                    ].map((card, i) => (
                        <motion.div 
                            key={i}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-secondary p-12 rounded-xl transition-all cursor-pointer"
                        >
                            <div className="text-4xl mb-6 text-info">{card.icon}</div>
                            <h4 className="text-2xl font-bold mb-3">{card.title}</h4>
                            <p className="text-xl opacity-50">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-[1400px]">
                    <motion.h3 variants={itemVariants} className="lg:text-5xl text-2xl font-black mb-5 lg:mb-8 uppercase tracking-widest text-base-200">
                        Common Inquiries
                    </motion.h3>
                    
                    <div className="lg:space-y-6 space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants}
                                className="collapse collapse-plus bg-secondary rounded-xl"
                            >
                                <input type="checkbox" className="peer" /> 
                                
                                <div className="collapse-title text-lg md:text-2xl font-bold py-8 px-10 peer-checked:text-cyan-400 transition-colors">
                                    {faq.q}
                                </div>
                                
                                <div className="collapse-content px-10"> 
                                    <div className="pb-8 text-xl md:text-2xl opacity-60 leading-relaxed max-w-5xl">
                                        {faq.a}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HelpSupport;