import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { HeartOutlined, GiftOutlined, GlobalOutlined, TeamOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const Announcement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const messages = [
    { 
      text: 'URGENT: HELP REFUGEES IN CRISIS ZONES', 
      icon: <GlobalOutlined />
    },
    { 
      text: 'MATCHING DONATIONS THIS WEEK: YOUR IMPACT DOUBLED', 
      icon: <GiftOutlined />
    },
    { 
      text: 'NEW: SET UP RECURRING DONATIONS FOR CONTINUOUS IMPACT', 
      icon: <HeartOutlined />
    },
    { 
      text: '95% OF DONATIONS GO DIRECTLY TO THOSE IN NEED', 
      icon: <SafetyCertificateOutlined />
    },
    { 
      text: 'JOIN 50,000+ DONORS MAKING A DIFFERENCE TODAY', 
      icon: <TeamOutlined />
    }
  ];

  const handleType = (count) => {
    // Calculate current message index based on character count
    const totalChars = messages.reduce((acc, msg, idx) => {
      if (idx < currentIndex) return acc + msg.text.length;
      return acc;
    }, 0);
    
    const newIndex = messages.findIndex((msg, idx) => {
      const prevChars = messages.slice(0, idx).reduce((sum, m) => sum + m.text.length, 0);
      return count < prevChars + msg.text.length;
    });
    
    if (newIndex !== -1 && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2 text-center font-semibold text-md tracking-wide uppercase shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <span className="animate-pulse mr-2">{messages[currentIndex].icon}</span>
        <span className="mx-1">
          <Typewriter
            words={messages.map(msg => msg.text)}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={30}
            delaySpeed={2000}
            cursorColor="#FFFFFF"
            onType={handleType}
          />
        </span>
        <span className="animate-pulse ml-2">{messages[currentIndex].icon}</span>
      </div>
    </div>
  );
};

export default Announcement;