import React, { useRef, useEffect } from 'react';
import './VideoBackground.css';

const VideoBackground: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Ensure smooth looping
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.play();
            });

            // Add subtle fade-in effect
            video.addEventListener('loadeddata', () => {
                video.style.opacity = '0.6';
            });
        }
    }, []);

    return (
        <div className="video-background">
            {/* Video background */}
            <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline
                className="background-video"
                preload="auto"
            >
                <source src="/videos/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Fallback animated background in case video fails to load */}
            <div className="animated-background">
                <div className="gradient-animation" />
            </div>
            
            <div className="overlay"></div>
        </div>
    );
};

export default VideoBackground;