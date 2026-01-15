import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';
import introVideo from '../../assets/intro.mp4';

export const IntroPage = () => {
     const navigate = useNavigate();
     const videoRef = useRef(null);

     const handleVideoEnd = () => {
          navigate('/login');
     };

     const handleSkip = () => {
          navigate('/login');
     };

     useEffect(() => {
          // Ensure video plays automatically on load
          if (videoRef.current) {
               videoRef.current.play().catch(error => {
                    console.log("Auto-play was prevented. Click anywhere to play.", error);
               });
          }
     }, []);

     return (
          <div className="intro-container">
               <video
                    ref={videoRef}
                    className="intro-video"
                    onEnded={handleVideoEnd}
                    autoPlay
                    muted
                    playsInline
               >
                    <source src={introVideo} type="video/mp4" />
                    Your browser does not support the video tag.
               </video>
               <button className="skip-button" onClick={handleSkip}>
                    Skip
               </button>
          </div>
     );
};
