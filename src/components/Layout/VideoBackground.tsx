import React, { useRef, useEffect, useState } from 'react';
import './VideoBackground.css';

const VideoBackground: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        console.log('🎯 VideoBackground component mounted');
        const video = videoRef.current;
        if (video) {
            // Handle video loading
            const handleLoadedData = () => {
                console.log('🎥 Video loaded successfully');
                setVideoLoaded(true);
            };

            const handleError = (e: Event) => {
                console.error('❌ Video failed to load:', e);
                setVideoError(true);
            };

            const handleCanPlay = () => {
                console.log('🎬 Video can start playing');
                // Try to play the video
                video.play().catch(error => {
                    console.warn('⚠️ Autoplay blocked by browser:', error);
                    // Fallback: show animated background
                    setVideoError(true);
                });
            };

            // Add event listeners
            video.addEventListener('loadeddata', handleLoadedData);
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);
            
            // Ensure smooth looping
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.play().catch(() => setVideoError(true));
            });

            // Cleanup
            return () => {
                video.removeEventListener('loadeddata', handleLoadedData);
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('error', handleError);
            };
        }
    }, []);

    return (
        <div className="video-background">
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
                <div className="debug-info">
                    <p>🎯 VideoBackground Component Loaded</p>
                    <p>Video loaded: {videoLoaded ? '✅' : '⏳'}</p>
                    <p>Video error: {videoError ? '❌' : '✅'}</p>
                    <p>Video file path: /videos/bg.mp4</p>
                </div>
            )}

            {/* Video background - only show if loaded successfully */}
            {!videoError && (
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={`background-video ${videoLoaded ? 'loaded' : 'loading'}`}
                    preload="metadata"
                    poster=""
                >
                    <source src="/videos/bg.mp4" type="video/mp4" />
                    <source src="data:video/mp4;base64," type="video/mp4" />
                </video>
            )}
            
            {/* Always show animated background as fallback/overlay */}
            <div className={`animated-background ${videoError || !videoLoaded ? 'primary' : 'secondary'}`}>
                <div className="gradient-animation" />
            </div>
            
            <div className="overlay"></div>
        </div>
    );
};

export default VideoBackground;