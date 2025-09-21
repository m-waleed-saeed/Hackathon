import React, { useRef } from "react";
import { HeartOutlined, TeamOutlined, SafetyCertificateOutlined, GlobalOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import { Card, Button, theme } from "antd";

const { useToken } = theme;

const DonationCard = () => {
    const { token } = useToken();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const features = [
        {
            icon: <HeartOutlined />,
            title: "Direct Impact",
            description: "100% of your donation goes directly to those in need with no administrative fees",
            cta: "Donate now",
            flair: "❤️ Direct",
            gradient: "from-[#00927c] to-[#00c853]"
        },
        {
            icon: <TeamOutlined />,
            title: "Community Support",
            description: "Join thousands making a difference in communities around the world",
            cta: "See impact",
            flair: "🤝 Community",
            gradient: "from-[#0288d1] to-[#00c853]"
        },
        {
            icon: <SafetyCertificateOutlined />,
            title: "Transparent Process",
            description: "Track exactly how your donation is used with our transparent reporting system",
            cta: "View reports",
            flair: "🔍 Transparent",
            gradient: "from-[#00927c] to-[#0288d1]"
        },
        {
            icon: <GlobalOutlined />,
            title: "Global Reach",
            description: "Support causes in over 50 countries with our international partner network",
            cta: "Our reach",
            flair: "🌎 Global",
            gradient: "from-[#fbc02d] to-[#00927c]"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 40, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                mass: 0.5
            }
        }
    };

    return (
        <div
            ref={ref}
            className="relative py-24 bg-gradient-to-br from-[#f7fdfc] via-[#f0faf8] to-[#e5f6f3] overflow-hidden isolate"
            style={{ fontFamily: token.fontFamily }}
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/soft-circle-scales.png')] opacity-[0.03] z-[-1]"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#00927c] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00c853] opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ letterSpacing: "0.4em", opacity: 0 }}
                        animate={isInView ? { letterSpacing: "0.15em", opacity: 1 } : {}}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[#00927c] font-medium tracking-widest text-sm uppercase mb-4 inline-block"
                    >
                        Making a Difference Together
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d3436] mb-6 leading-tight">
                        Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00927c] to-[#00c853]">Choose Us</span>
                    </h2>
                    <p className="text-lg text-[#636e72] max-w-2xl mx-auto mb-8">
                        We ensure your contributions create maximum impact through transparency, efficiency, and global reach.
                    </p>
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100px" } : {}}
                            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="h-1 bg-gradient-to-r from-[#00927c] to-[#00c853] rounded-full"
                        ></motion.div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : {}}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{
                                y: -8,
                                transition: { type: "spring", stiffness: 400, damping: 17 }
                            }}
                            className="group relative h-full"
                        >
                            {/* Hover effect background */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 via-transparent from-transparent to-[#00927c]/5"></div>
                            
                            {/* Main card */}
                            <Card 
                                className="relative h-full bg-white border-0 rounded-2xl p-6 transition-all duration-300 group-hover:shadow-xl overflow-hidden"
                                bodyStyle={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                {/* Gradient accent bar */}
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                                
                                {/* Flair badge */}
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="absolute top-6 right-6 text-xs font-semibold bg-gradient-to-r from-[#00927c]/10 to-[#00c853]/10 text-[#00927c] px-3 py-1.5 rounded-full backdrop-blur-sm"
                                >
                                    {feature.flair}
                                </motion.span>

                                {/* Icon container */}
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.05 }}
                                    className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white text-xl shadow-md mt-2`}
                                >
                                    {feature.icon}
                                </motion.div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold text-[#2d3436] mb-3 leading-tight">{feature.title}</h3>
                                    <p className="text-[#636e72] leading-relaxed mb-6 flex-grow">{feature.description}</p>
                                    
                                    <Button 
                                        type="primary" 
                                        className="w-fit flex items-center text-sm font-medium bg-gradient-to-r from-[#00927c] to-[#00c853] border-0 text-white shadow-md hover:shadow-lg transition-shadow"
                                        size="large"
                                    >
                                        {feature.cta}
                                        <ArrowRightOutlined className="ml-2 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 }}
                    className="text-center mt-16 pt-12 border-t border-[#e8e8e8]"
                >
                    <p className="text-[#636e72] mb-6">Ready to make a difference today?</p>
                    <Button 
                        type="primary" 
                        size="large"
                        className="bg-gradient-to-r from-[#00927c] to-[#00c853] border-0 text-white px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        Start Donating Now
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default DonationCard;