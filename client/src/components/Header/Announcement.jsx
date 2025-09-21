import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Announcement = () => {
  return (
    <div className="w-full bg-[#ff3333] text-white py-2 text-center font-montserrat font-semibold text-lg tracking-wider uppercase  shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <span className="animate-pulse">✨</span>
        <span className="mx-3">
          <Typewriter
            words={[
              'FLASH SALE: 50% OFF LUXURY BRANDS',
              'FREE SHIPPING ON ORDERS OVER $75',
              'NEW LAUNCH: CRYSTAL GLOW SERUM',
              'VIP EXCLUSIVE: EARLY ACCESS TO HOLIDAY COLLECTION',
              'LIMITED TIME: GIFT WITH PURCHASE'
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={30}
            delaySpeed={1500}
            cursorColor="#D4B14A"
          />
        </span>
        <span className="animate-pulse">✨</span>
      </div>
    </div>
  );
};

export default Announcement;