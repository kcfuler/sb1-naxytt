import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';

interface PostProps {
  post: {
    username: string;
    description: string;
    videoUrl: string;
    likes: number;
    comments: number;
    shares: number;
  };
  isVisible: boolean;
}

function VideoPost({ post, isVisible }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(error => console.log('Autoplay failed:', error));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isVisible]);

  return (
    <div className="relative h-screen w-full bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={post.videoUrl}
        loop
        playsInline
        muted
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="text-white">
          <h2 className="font-bold text-lg">{post.username}</h2>
          <p className="text-sm">{post.description}</p>
        </div>
      </div>

      <div className="absolute right-4 bottom-20 flex flex-col gap-4 text-white">
        <button 
          onClick={() => setIsLiked(!isLiked)} 
          className="flex flex-col items-center"
        >
          <FaHeart className={`text-3xl ${isLiked ? 'text-red-500' : ''}`} />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button className="flex flex-col items-center">
          <FaComment className="text-3xl" />
          <span className="text-sm">{post.comments}</span>
        </button>
        <button className="flex flex-col items-center">
          <FaShare className="text-3xl" />
          <span className="text-sm">{post.shares}</span>
        </button>
      </div>
    </div>
  );
}

export default VideoPost;